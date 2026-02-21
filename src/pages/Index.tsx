import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "./PatientDashboard";
import DoctorDashboard from "./DoctorDashboard";

const Index = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "doctor":
    case "admin":
      return <DoctorDashboard />;
    case "patient":
      return <PatientDashboard />;
    case "healthworker":
      return <DoctorDashboard />;
    default:
      return <PatientDashboard />;
  }
};

export default Index;
