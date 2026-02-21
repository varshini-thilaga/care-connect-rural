import { Users, AlertTriangle, Calendar, TrendingUp, Activity, Heart } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import RiskBadge from "@/components/RiskBadge";
import { mockPatients, mockAppointments, mockAlerts } from "@/data/mockData";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const riskDistribution = [
  { name: "Low", value: mockPatients.filter((p) => p.riskLevel === "low").length, color: "hsl(152, 60%, 40%)" },
  { name: "Medium", value: mockPatients.filter((p) => p.riskLevel === "medium").length, color: "hsl(38, 92%, 50%)" },
  { name: "High", value: mockPatients.filter((p) => p.riskLevel === "high").length, color: "hsl(0, 72%, 51%)" },
];

const weeklyLoad = [
  { day: "Mon", patients: 8 }, { day: "Tue", patients: 12 }, { day: "Wed", patients: 6 },
  { day: "Thu", patients: 10 }, { day: "Fri", patients: 14 }, { day: "Sat", patients: 4 },
];

export default function DoctorDashboard() {
  const todayAppts = mockAppointments.filter((a) => a.date === "2026-02-22");
  const highRisk = mockPatients.filter((p) => p.riskLevel === "high");
  const unreadAlerts = mockAlerts.filter((a) => !a.read);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Good morning, Dr. Gupta</h1>
        <p className="text-sm text-muted-foreground">You have {todayAppts.length} appointments today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={Users} label="Total Patients" value={mockPatients.length} />
        <MetricCard icon={AlertTriangle} label="High Risk" value={highRisk.length} status="danger" />
        <MetricCard icon={Calendar} label="Today's Appts" value={todayAppts.length} />
        <MetricCard icon={Activity} label="Unread Alerts" value={unreadAlerts.length} status={unreadAlerts.length > 0 ? "warning" : "normal"} />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-healthcare">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Patient Load</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(200, 10%, 45%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(200, 10%, 45%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 15%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="patients" fill="hsl(168, 60%, 38%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-healthcare">
          <h3 className="text-sm font-semibold text-foreground mb-4">Risk Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(200, 15%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {riskDistribution.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                <span className="text-xs text-muted-foreground">{r.name} ({r.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient List sorted by risk */}
      <div className="card-healthcare">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Patients by Risk Score</h3>
          <Link to="/patients" className="text-xs font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Patient</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Age</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Conditions</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Risk</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {[...mockPatients].sort((a, b) => b.riskScore - a.riskScore).map((patient) => (
                <tr key={patient.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{patient.avatar}</div>
                      <span className="font-medium text-foreground">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground">{patient.age}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map((c) => (
                        <span key={c} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2.5 px-3"><RiskBadge level={patient.riskLevel} score={patient.riskScore} showScore /></td>
                  <td className="py-2.5 px-3 text-muted-foreground">{patient.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
