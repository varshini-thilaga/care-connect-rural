export type UserRole = "patient" | "doctor" | "healthworker" | "admin";

export type RiskLevel = "low" | "medium" | "high";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "missed";
export type AppointmentType = "in-person" | "teleconsultation";

export type AlertSeverity = "low" | "medium" | "high";
export type AlertType = "vital" | "appointment" | "medication" | "emergency";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: UserRole;
  email: string;
  phone: string;
  conditions: string[];
  riskLevel: RiskLevel;
  riskScore: number;
  lastVisit: string;
  assignedDoctor: string;
  avatar: string;
}

export interface HealthMetric {
  date: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  bloodSugar: number;
  oxygen: number;
  temperature: number;
  weight: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  startDate: string;
  endDate: string;
  prescribedBy: string;
  status: "active" | "expiring" | "expired";
}
