import { Heart, Droplets, Wind, Thermometer, Activity, Scale } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import HealthChart from "@/components/HealthChart";
import { mockHealthMetrics, mockAppointments, mockPrescriptions, mockAlerts } from "@/data/mockData";
import { Calendar, Bell, Pill, AlertTriangle } from "lucide-react";

export default function PatientDashboard() {
  const latest = mockHealthMetrics[mockHealthMetrics.length - 1];
  const upcomingAppts = mockAppointments.filter((a) => a.status === "confirmed" || a.status === "pending");
  const unreadAlerts = mockAlerts.filter((a) => !a.read && a.patientId === "p1");

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Welcome back, Ramesh</h1>
        <p className="text-sm text-muted-foreground">Here's your health overview for today</p>
      </div>

      {/* Alert Banner */}
      {unreadAlerts.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4">
          <AlertTriangle className="h-5 w-5 text-danger shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{unreadAlerts.length} new health alert{unreadAlerts.length > 1 ? "s" : ""}</p>
            <p className="text-xs text-muted-foreground">{unreadAlerts[0].message}</p>
          </div>
        </div>
      )}

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard icon={Activity} label="Blood Pressure" value={`${latest.systolic}/${latest.diastolic}`} unit="mmHg" status={latest.systolic > 140 ? "danger" : "normal"} />
        <MetricCard icon={Heart} label="Heart Rate" value={latest.heartRate} unit="bpm" status={latest.heartRate > 90 ? "warning" : "normal"} />
        <MetricCard icon={Droplets} label="Blood Sugar" value={latest.bloodSugar} unit="mg/dL" status={latest.bloodSugar > 180 ? "danger" : latest.bloodSugar > 140 ? "warning" : "normal"} />
        <MetricCard icon={Wind} label="Oxygen Level" value={latest.oxygen} unit="%" status={latest.oxygen < 95 ? "danger" : "normal"} />
        <MetricCard icon={Thermometer} label="Temperature" value={latest.temperature} unit="°F" status={latest.temperature > 99 ? "warning" : "normal"} />
        <MetricCard icon={Scale} label="Weight" value={latest.weight} unit="kg" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <HealthChart metric="bp" title="Blood Pressure Trend" />
        <HealthChart metric="bloodSugar" title="Blood Sugar Trend" />
        <HealthChart metric="heartRate" title="Heart Rate Trend" />
        <HealthChart metric="oxygen" title="Oxygen Level Trend" />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Upcoming Appointments */}
        <div className="card-healthcare">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Upcoming Appointments
          </h3>
          <div className="space-y-2">
            {upcomingAppts.slice(0, 3).map((appt) => (
              <div key={appt.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{appt.reason}</p>
                  <p className="text-xs text-muted-foreground">{appt.date} at {appt.time}</p>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-accent px-2 py-0.5 rounded-full">{appt.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Medications */}
        <div className="card-healthcare">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" /> Active Medications
          </h3>
          <div className="space-y-2">
            {mockPrescriptions.filter((p) => p.patientId === "p1").map((rx) => (
              <div key={rx.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{rx.medication}</p>
                  <p className="text-xs text-muted-foreground">{rx.dosage}</p>
                </div>
                <span className={`text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  rx.status === "expiring" ? "badge-risk-medium" : "badge-risk-low"
                }`}>
                  {rx.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
