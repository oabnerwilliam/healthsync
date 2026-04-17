import type { Admin, Appointment, Doctor, Patient } from "./types";

export const mockDoctors: Doctor[] = [
  { firstName: "Ana", lastName: "Silva" },
  { firstName: "Carlos", lastName: "Mendes" },
];

export const mockPatients: Patient[] = [
  { firstName: "Beatriz", lastName: "Oliveira" },
  { firstName: "Diego", lastName: "Santos" },
  { firstName: "Fernanda", lastName: "Costa" },
];

export const mockAdmins: Admin[] = [
  { firstName: "Eduardo", lastName: "Lima" },
  { firstName: "Juliana", lastName: "Rocha" },
];

function appointmentsForPatient(
  patient: Patient,
  doctors: Doctor[],
  baseDates: Date[],
): Appointment[] {
  return doctors.map((doctor, index) => ({
    doctor,
    patient,
    date: baseDates[index]!,
  }));
}

export const mockAppointments: Appointment[] = [
  ...appointmentsForPatient(mockPatients[0]!, mockDoctors, [
    new Date("2026-04-18T09:00:00"),
    new Date("2026-04-22T14:30:00"),
  ]),
  ...appointmentsForPatient(mockPatients[1]!, mockDoctors, [
    new Date("2026-04-19T10:15:00"),
    new Date("2026-04-23T11:00:00"),
  ]),
  ...appointmentsForPatient(mockPatients[2]!, mockDoctors, [
    new Date("2026-04-20T08:45:00"),
    new Date("2026-04-24T16:00:00"),
  ]),
];
