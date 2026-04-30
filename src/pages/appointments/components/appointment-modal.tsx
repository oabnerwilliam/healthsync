import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AppointmentCard } from "./appointment-card"
import type { User } from "../../../utils/types"

function personName(p: { firstName: string; lastName: string }) {
  return `${p.firstName} ${p.lastName}`
}

type AppointmentModalProps = {
  appointment: {
    doctor: User
    patient: User
    date: string
  }
}

export function AppointmentModal({ appointment }: AppointmentModalProps) {
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
    <Dialog>
      <DialogTrigger asChild>
        <AppointmentCard appointment={appointment} />
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
            <p className="text-xs font-medium text-muted-foreground">
              Paciente
            </p>
            <p className="mt-1">{patientName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Data e hora
            </p>
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
