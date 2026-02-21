import { RiskLevel } from "@/data/types";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  showScore?: boolean;
}

export default function RiskBadge({ level, score, showScore = false }: RiskBadgeProps) {
  return (
    <span className={cn(
      level === "low" && "badge-risk-low",
      level === "medium" && "badge-risk-medium",
      level === "high" && "badge-risk-high",
    )}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
      {showScore && score !== undefined && ` (${score})`}
    </span>
  );
}
