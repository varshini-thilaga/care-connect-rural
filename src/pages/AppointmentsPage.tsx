import { mockAppointments } from "@/data/mockData";
import { Calendar, Video, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles = {
  pending: "bg-warning/10 text-warning",
  confirmed: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
  missed: "bg-danger/10 text-danger",
};

export default function AppointmentsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Appointments</h1>
          <p className="text-sm text-muted-foreground">Manage your upcoming and past appointments</p>
        </div>
        <button className="hero-gradient text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          + Book Appointment
        </button>
      </div>

      <div className="space-y-3">
        {mockAppointments.map((appt) => (
          <div key={appt.id} className="card-healthcare flex items-center gap-4">
            {/* Date block */}
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <span className="text-lg font-bold leading-none">{appt.date.split("-")[2]}</span>
              <span className="text-[10px] font-medium">Feb</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{appt.reason}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {appt.time}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {appt.type === "teleconsultation" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                  {appt.type === "teleconsultation" ? "Video Call" : "In-Person"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {appt.doctorName} • {appt.patientName}
              </p>
            </div>

            {/* Status */}
            <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0", statusStyles[appt.status])}>
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
