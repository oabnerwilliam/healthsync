import * as React from "react"
import { CalendarClock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { User } from "@/utils/types"

const appointmentCardInteractive =
  "w-full cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01] active:scale-[0.99]"

function personName(p: { firstName: string; lastName: string }) {
  return `${p.firstName} ${p.lastName}`
}

export type AppointmentCardProps = Omit<
  React.ComponentPropsWithoutRef<typeof Card>,
  "children"
> & {
  appointment: {
    doctor: User
    patient: User
    date: string
  }
}

export const AppointmentCard = React.forwardRef<
  HTMLDivElement,
  AppointmentCardProps
>(function AppointmentCard({ appointment, className, ...props }, ref) {
  const doctorName = personName({
    firstName: appointment.doctor.firstName,
    lastName: appointment.doctor.lastName,
  })
  const patientName = personName({
    firstName: appointment.patient.firstName,
    lastName: appointment.patient.lastName,
  })
  const when = new Date(appointment.date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  })

  return (
    <Card
      ref={ref}
      className={cn(appointmentCardInteractive, className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Médico</p>
          <CardTitle className="text-base font-medium">{doctorName}</CardTitle>
        </div>
        <CalendarClock className="size-5 shrink-0 text-primary" aria-hidden />
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Paciente</p>
          <p className="text-sm">{patientName}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Data e hora
          </p>
          <p className="text-sm tabular-nums">{when}</p>
        </div>
      </CardContent>
    </Card>
  )
})
AppointmentCard.displayName = "AppointmentCard"
