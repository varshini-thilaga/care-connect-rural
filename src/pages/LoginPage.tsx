import { Stethoscope, Heart, Users, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/data/types";

const roles: { role: UserRole; label: string; desc: string; icon: typeof Stethoscope; email: string }[] = [
  { role: "patient", label: "Patient", desc: "View vitals, appointments & records", icon: Heart, email: "patient@demo.com" },
  { role: "doctor", label: "Doctor", desc: "Manage patients & prescriptions", icon: Stethoscope, email: "doctor@demo.com" },
  { role: "healthworker", label: "Health Worker", desc: "Field visits & vital entry", icon: Users, email: "healthworker@demo.com" },
  { role: "admin", label: "Admin", desc: "System management & analytics", icon: Shield, email: "admin@demo.com" },
];

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl hero-gradient">
            <Stethoscope className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">CareConnect</h1>
          <p className="mt-1 text-sm text-muted-foreground">Rural Healthcare Platform</p>
        </div>

        {/* Role cards */}
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center mb-4">Select a role to continue</p>
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => login(r.role)}
              className="card-healthcare w-full flex items-center gap-4 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-lg group cursor-pointer"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <r.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground/60 font-mono">{r.email}</span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          Demo mode — click any role to sign in instantly
        </p>
      </div>
    </div>
  );
}
