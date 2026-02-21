import { mockAlerts } from "@/data/mockData";
import { Bell, AlertTriangle, Calendar, Pill, Siren } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons = {
  vital: AlertTriangle,
  appointment: Calendar,
  medication: Pill,
  emergency: Siren,
};

const severityStyles = {
  high: "border-l-danger bg-danger/5",
  medium: "border-l-warning bg-warning/5",
  low: "border-l-primary bg-accent/50",
};

export default function AlertsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" /> Alerts & Notifications
        </h1>
        <p className="text-sm text-muted-foreground">{mockAlerts.filter((a) => !a.read).length} unread alerts</p>
      </div>

      <div className="space-y-2">
        {mockAlerts.map((alert) => {
          const Icon = typeIcons[alert.type];
          return (
            <div key={alert.id} className={cn("card-healthcare border-l-4 flex items-start gap-3", severityStyles[alert.severity], !alert.read && "ring-1 ring-primary/10")}>
              <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                alert.severity === "high" ? "bg-danger/10 text-danger" :
                alert.severity === "medium" ? "bg-warning/10 text-warning" : "bg-accent text-accent-foreground"
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{alert.patientName}</p>
                  {!alert.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
