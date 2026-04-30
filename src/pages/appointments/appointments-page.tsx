import { Link } from "react-router-dom"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { AppointmentModal } from "./components/appointment-modal"
import { useAppointments } from "./hooks/use-appointments"

export function AppointmentsPage() {
  const { data: appointmentsData, isPending } = useAppointments()
  const appointments = appointmentsData?.map((appointment) => ({
    doctor: appointment.doctor.user,
    patient: appointment.patient.user,
    date: appointment.date,
  }))

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/dashboard"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Voltar ao dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Consultas
        </h1>
        <p className="mt-1 text-muted-foreground">
          Agendamentos a partir dos mocks (TanStack Query).
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="w-full animate-pulse">
                <CardHeader>
                  <div className="h-4 w-40 rounded bg-muted" />
                  <div className="mt-3 h-3 w-full max-w-md rounded bg-muted" />
                  <div className="mt-2 h-3 w-32 rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-48 rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          : appointments?.map((appointment) => (
              <AppointmentModal
                key={`${appointment.doctor.firstName}-${appointment.patient.firstName}-${appointment.date}`}
                appointment={appointment}
              />
            ))}
      </div>
    </div>
  )
}
