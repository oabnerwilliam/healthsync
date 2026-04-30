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
import { deletePatient } from "../../../utils/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

type PatientModalProps = {
  patient: Patient
}

export function PatientModal({ patient }: PatientModalProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const fullName = `${patient.firstName} ${patient.lastName}`

  const deletePatientMutation = useMutation({
    mutationFn: async (id: string) => await deletePatient(id),
    onSuccess: async () => {
      setOpen(false)
      toast.success("Paciente excluído com sucesso")
      await queryClient.refetchQueries({ queryKey: ["patients"] })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={async () =>
              await deletePatientMutation.mutateAsync(patient.id)
            }
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
