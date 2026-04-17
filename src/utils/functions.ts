import type { Admin, Appointment, Doctor, Patient } from "./types";
import {
  mockAdmins,
  mockAppointments,
  mockDoctors,
  mockPatients,
} from "./mocks";

export async function getDoctors(): Promise<Doctor[]> {
  return mockDoctors;
}

export async function getPatients(): Promise<Patient[]> {
  return mockPatients;
}

export async function getAdmins(): Promise<Admin[]> {
  return mockAdmins;
}

export async function getAppointments(): Promise<Appointment[]> {
  return mockAppointments;
}
