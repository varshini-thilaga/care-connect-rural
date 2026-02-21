import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  status?: "normal" | "warning" | "danger";
  className?: string;
}

const statusColors = {
  normal: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export default function MetricCard({ icon: Icon, label, value, unit, status = "normal", className }: MetricCardProps) {
  return (
    <div className={cn("metric-card", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="stat-label">{label}</span>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", 
          status === "normal" ? "bg-accent text-accent-foreground" : 
          status === "warning" ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn("stat-value", statusColors[status])}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
