import { useState } from "react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPatient } from "../../../utils/functions"
import { toast } from "sonner"
import { cn } from "../../../lib/utils"

export const inputClassName = cn(
  "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
)

type CreatePatientFormValues = {
  firstName: string
  lastName: string
}

export const CreatePatientModal = () => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm<CreatePatientFormValues>({
    defaultValues: { firstName: "", lastName: "" },
  })

  const queryClient = useQueryClient()

  const createPatientMutation = useMutation({
    mutationFn: async (data: CreatePatientFormValues) =>
      await createPatient(data),
    onSuccess: async () => {
      setOpen(false)
      toast.success("Paciente criado com sucesso")
      reset()
      await queryClient.refetchQueries({ queryKey: ["patients"] })
    },
  })

  const onSubmit = async (data: CreatePatientFormValues) => {
    await createPatientMutation.mutateAsync(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-6 cursor-pointer">Criar paciente</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar paciente</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 pt-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="patient-first-name" className="text-sm font-medium">
              Primeiro nome
            </label>
            <input
              id="patient-first-name"
              type="text"
              autoComplete="given-name"
              className={inputClassName}
              {...register("firstName")}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="patient-last-name" className="text-sm font-medium">
              Sobrenome
            </label>
            <input
              id="patient-last-name"
              type="text"
              autoComplete="family-name"
              className={inputClassName}
              {...register("lastName")}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="cursor-pointer">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
