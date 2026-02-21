import { useState } from "react";
import { Heart, Droplets, Wind, Thermometer, Activity, Scale, Save, Wifi, WifiOff } from "lucide-react";

interface VitalEntry {
  systolic: string;
  diastolic: string;
  heartRate: string;
  bloodSugar: string;
  oxygen: string;
  temperature: string;
  weight: string;
}

const fields = [
  { key: "systolic" as const, label: "Systolic BP", unit: "mmHg", icon: Activity, placeholder: "120" },
  { key: "diastolic" as const, label: "Diastolic BP", unit: "mmHg", icon: Activity, placeholder: "80" },
  { key: "heartRate" as const, label: "Heart Rate", unit: "bpm", icon: Heart, placeholder: "72" },
  { key: "bloodSugar" as const, label: "Blood Sugar", unit: "mg/dL", icon: Droplets, placeholder: "100" },
  { key: "oxygen" as const, label: "Oxygen Level", unit: "%", icon: Wind, placeholder: "98" },
  { key: "temperature" as const, label: "Temperature", unit: "°F", icon: Thermometer, placeholder: "98.6" },
  { key: "weight" as const, label: "Weight", unit: "kg", icon: Scale, placeholder: "70" },
];

export default function VitalsEntryPage() {
  const [isOnline] = useState(navigator.onLine);
  const [values, setValues] = useState<VitalEntry>({
    systolic: "", diastolic: "", heartRate: "", bloodSugar: "", oxygen: "", temperature: "", weight: "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof VitalEntry, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    // In production: save to IndexedDB for offline, or POST to API
    const entry = { ...values, timestamp: new Date().toISOString(), synced: isOnline };
    const queue = JSON.parse(localStorage.getItem("vitals_queue") || "[]");
    queue.push(entry);
    localStorage.setItem("vitals_queue", JSON.stringify(queue));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Enter Vitals</h1>
          <p className="text-sm text-muted-foreground">Record patient health metrics</p>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${isOnline ? "badge-risk-low" : "badge-risk-medium"}`}>
          {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>

      {!isOnline && (
        <div className="flex items-center gap-2 rounded-xl border border-warning/20 bg-warning/5 p-3 text-xs text-muted-foreground">
          <WifiOff className="h-4 w-4 text-warning" />
          Data will be saved locally and synced when connection is restored.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className="card-healthcare">
            <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <field.icon className="h-3.5 w-3.5" /> {field.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <span className="text-xs text-muted-foreground shrink-0">{field.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="hero-gradient flex items-center gap-2 text-primary-foreground text-sm font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
      >
        <Save className="h-4 w-4" />
        {saved ? "✓ Saved Successfully" : "Save Vitals"}
      </button>
    </div>
  );
}
