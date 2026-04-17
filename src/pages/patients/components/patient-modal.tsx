import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PatientCard } from "./patient-card"
import type { Patient } from "@/utils/types"

type PatientModalProps = {
  patient: Patient
}

export function PatientModal({ patient }: PatientModalProps) {
  const fullName = `${patient.firstName} ${patient.lastName}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PatientCard patient={patient} />
      </DialogTrigger>
      <DialogContent className="gap-6 p-8 sm:max-w-md sm:p-10">
        <DialogHeader>
          <DialogTitle>{fullName}</DialogTitle>
        </DialogHeader>
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
