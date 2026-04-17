import { CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Appointment } from "@/utils/types"

const cardInteractive =
  "w-full cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.01] active:scale-[0.99]"

function formatDateTime(date: Date) {
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

function personName(p: { firstName: string; lastName: string }) {
  return `${p.firstName} ${p.lastName}`
}

type AppointmentModalProps = {
  appointment: Appointment
}

export function AppointmentModal({ appointment }: AppointmentModalProps) {
  const doctorName = personName(appointment.doctor)
  const patientName = personName(appointment.patient)
  const when = formatDateTime(appointment.date)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cardInteractive}>
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
              <p className="text-xs font-medium text-muted-foreground">Data e hora</p>
              <p className="text-sm tabular-nums">{when}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="gap-6 p-8 sm:max-w-md sm:p-10">
        <DialogHeader>
          <DialogTitle>Consulta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Médico</p>
            <p className="mt-1">{doctorName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Paciente</p>
            <p className="mt-1">{patientName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Data e hora</p>
            <p className="mt-1 tabular-nums">{when}</p>
          </div>
        </div>
        <div className="flex w-full flex-row justify-between gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
          <Button type="button" variant="default">
            Ver Mais
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
