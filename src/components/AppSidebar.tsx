import { Heart, Calendar, Activity, Users, Bell, ClipboardList, BarChart3, LogOut, Shield, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navItems = {
  patient: [
    { icon: Activity, label: "Dashboard", path: "/" },
    { icon: Heart, label: "My Vitals", path: "/vitals" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: ClipboardList, label: "Health Records", path: "/records" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ],
  doctor: [
    { icon: BarChart3, label: "Dashboard", path: "/" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ],
  healthworker: [
    { icon: Activity, label: "Dashboard", path: "/" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: Heart, label: "Enter Vitals", path: "/vitals" },
    { icon: Calendar, label: "Appointments", path: "/appointments" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ],
  admin: [
    { icon: BarChart3, label: "Dashboard", path: "/" },
    { icon: Users, label: "Users", path: "/patients" },
    { icon: Shield, label: "System", path: "/system" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ],
};

const roleLabels = {
  patient: "Patient Portal",
  doctor: "Doctor Dashboard",
  healthworker: "Field Worker",
  admin: "Admin Panel",
};

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;
  const items = navItems[user.role];

  return (
    <aside className="sidebar-gradient flex h-screen w-64 flex-col text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <Stethoscope className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-sidebar-foreground">CareConnect</h1>
          <p className="text-[10px] font-medium text-sidebar-foreground/60">{roleLabels[user.role]}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-[10px] text-sidebar-foreground/50 capitalize">{user.role}</p>
          </div>
          <button onClick={logout} className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
