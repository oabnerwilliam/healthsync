export interface User {
  firstName: string
  lastName: string
  role: UserRole
}

export type UserRole = "DOCTOR" | "PATIENT" | "ADMIN"

export interface Doctor extends User {
  id: string
}

export interface Patient extends User {
  id: string
}

export interface Admin extends User {
  id: string
}

export interface PatientResponse {
  user: User
  id: string
}

export interface DoctorResponse {
  id: string
  user: User
}

export interface AppointmentResponse {
  id: string
  doctorId: string
  patientId: string
  date: string
  doctor: DoctorResponse
  patient: PatientResponse
}

export type Appointment = {
  doctor: Doctor
  patient: Patient
  date: string
}
