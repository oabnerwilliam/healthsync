import type { AppointmentResponse } from "./types"
import type { PatientResponse } from "./types"

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`)
  }
  return response.json()
}

export const getPatients = async (): Promise<PatientResponse[]> => {
  try {
    const data = await request<PatientResponse[]>("/patients", {
      method: "GET",
    })
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const createPatient = async (patient: {
  firstName: string
  lastName: string
}) => {
  try {
    const data = await request("/patients", {
      method: "POST",
      body: JSON.stringify(patient),
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const deletePatient = async (id: string) => {
  try {
    const data = await request(`/patients/${id}`, {
      method: "DELETE",
    })
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getAppointments = async (): Promise<AppointmentResponse[]> => {
  try {
    return request<AppointmentResponse[]>("/appointments", {
      method: "GET",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
