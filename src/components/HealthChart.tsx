import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { mockHealthMetrics } from "@/data/mockData";

interface HealthChartProps {
  metric: "bp" | "heartRate" | "bloodSugar" | "oxygen";
  title: string;
}

const chartConfig: Record<string, { dataKeys: { key: string; color: string; name: string }[]; domain?: [number, number] }> = {
  bp: {
    dataKeys: [
      { key: "systolic", color: "hsl(0, 72%, 51%)", name: "Systolic" },
      { key: "diastolic", color: "hsl(210, 80%, 55%)", name: "Diastolic" },
    ],
  },
  heartRate: {
    dataKeys: [{ key: "heartRate", color: "hsl(0, 72%, 51%)", name: "Heart Rate" }],
    domain: [60, 110],
  },
  bloodSugar: {
    dataKeys: [{ key: "bloodSugar", color: "hsl(38, 92%, 50%)", name: "Blood Sugar" }],
    domain: [80, 220],
  },
  oxygen: {
    dataKeys: [{ key: "oxygen", color: "hsl(168, 60%, 38%)", name: "SpO2" }],
    domain: [88, 100],
  },
};

export default function HealthChart({ metric, title }: HealthChartProps) {
  const config = chartConfig[metric];

  return (
    <div className="card-healthcare">
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={mockHealthMetrics}>
          <defs>
            {config.dataKeys.map((dk) => (
              <linearGradient key={dk.key} id={`fill-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dk.color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(200, 10%, 45%)" />
          <YAxis tick={{ fontSize: 11 }} stroke="hsl(200, 10%, 45%)" domain={config.domain} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(200, 15%, 89%)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          {config.dataKeys.map((dk) => (
            <Area
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              stroke={dk.color}
              strokeWidth={2}
              fill={`url(#fill-${dk.key})`}
              name={dk.name}
              dot={{ r: 3, fill: dk.color }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
