import { mockPatients } from "@/data/mockData";
import RiskBadge from "@/components/RiskBadge";
import { Search, Filter } from "lucide-react";
import { useState } from "react";
import { RiskLevel } from "@/data/types";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");

  const filtered = mockPatients
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => riskFilter === "all" || p.riskLevel === riskFilter)
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Patients</h1>
        <p className="text-sm text-muted-foreground">{mockPatients.length} registered patients</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {(["all", "high", "medium", "low"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setRiskFilter(level)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                riskFilter === level ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {level === "all" ? "All" : level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((patient) => (
          <div key={patient.id} className="card-healthcare hover:border-primary/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                {patient.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{patient.name}</p>
                <p className="text-xs text-muted-foreground">{patient.age}y • {patient.gender}</p>
              </div>
              <RiskBadge level={patient.riskLevel} score={patient.riskScore} showScore />
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {patient.conditions.map((c) => (
                <span key={c} className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{c}</span>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground/60">Last visit: {patient.lastVisit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
