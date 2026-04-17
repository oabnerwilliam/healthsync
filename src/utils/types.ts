export interface User {
  firstName: string;
  lastName: string;
}

export interface Doctor extends User {}

export interface Patient extends User {}

export interface Admin extends User {}

export type Appointment = {
  doctor: Doctor;
  patient: Patient;
  date: Date;
};
