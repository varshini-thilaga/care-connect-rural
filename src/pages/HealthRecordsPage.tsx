import { mockPrescriptions, mockPatients } from "@/data/mockData";
import { ClipboardList, Pill, FileText, AlertTriangle } from "lucide-react";

export default function HealthRecordsPage() {
  const patient = mockPatients[0]; // Current patient (Ramesh)
  const prescriptions = mockPrescriptions.filter((p) => p.patientId === "p1");

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Health Records</h1>
        <p className="text-sm text-muted-foreground">Your complete medical history</p>
      </div>

      {/* Patient Info Card */}
      <div className="card-healthcare">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-lg font-bold text-accent-foreground">
            {patient.avatar}
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">{patient.name}</h2>
            <p className="text-xs text-muted-foreground">{patient.age} years • {patient.gender} • ID: {patient.id.toUpperCase()}</p>
            <div className="flex gap-1.5 mt-1">
              {patient.conditions.map((c) => (
                <span key={c} className="text-[10px] font-medium bg-danger/10 text-danger px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="card-healthcare">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary" /> Active Prescriptions
        </h3>
        <div className="space-y-3">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{rx.medication}</p>
                <p className="text-xs text-muted-foreground">{rx.dosage}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                  {rx.startDate} → {rx.endDate} • {rx.prescribedBy}
                </p>
              </div>
              {rx.status === "expiring" && (
                <div className="flex items-center gap-1 badge-risk-medium">
                  <AlertTriangle className="h-3 w-3" /> Expiring
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Diagnosis History */}
      <div className="card-healthcare">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" /> Diagnosis History
        </h3>
        <div className="space-y-2">
          {[
            { date: "2025-12-10", diagnosis: "Type 2 Diabetes Mellitus", doctor: "Dr. Anjali Gupta" },
            { date: "2025-08-22", diagnosis: "Essential Hypertension - Stage 2", doctor: "Dr. Anjali Gupta" },
            { date: "2024-03-15", diagnosis: "Vitamin D Deficiency", doctor: "Dr. Ravi Mehta" },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{d.diagnosis}</p>
                <p className="text-[10px] text-muted-foreground">{d.date} • {d.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Reports */}
      <div className="card-healthcare">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" /> Lab Reports
        </h3>
        <div className="space-y-2">
          {[
            { date: "2026-02-10", name: "HbA1c Test", result: "7.2%", status: "Elevated" },
            { date: "2026-01-25", name: "Complete Blood Count", result: "Normal", status: "Normal" },
            { date: "2026-01-15", name: "Lipid Profile", result: "LDL: 142 mg/dL", status: "Elevated" },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.date} • Result: {r.result}</p>
              </div>
              <span className={r.status === "Normal" ? "badge-risk-low" : "badge-risk-medium"}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
