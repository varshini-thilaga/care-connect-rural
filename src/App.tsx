import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import LoginPage from "@/pages/LoginPage";
import Index from "./pages/Index";
import AppointmentsPage from "./pages/AppointmentsPage";
import AlertsPage from "./pages/AlertsPage";
import VitalsEntryPage from "./pages/VitalsEntryPage";
import PatientsPage from "./pages/PatientsPage";
import HealthRecordsPage from "./pages/HealthRecordsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginPage />;

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/vitals" element={<VitalsEntryPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/records" element={<HealthRecordsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
