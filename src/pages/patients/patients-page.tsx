import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

import { PatientModal } from "./components/patient-modal"
import { usePatients } from "./hooks/use-patients"
import { createPatient } from "../../utils/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

type CreatePatientFormValues = {
  firstName: string
  lastName: string
}

const inputClassName = cn(
  "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm shadow-xs transition-colors",
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
)

export function PatientsPage() {
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()
  const createPatientMutation = useMutation({
    mutationFn: async (data: CreatePatientFormValues) =>
      await createPatient(data),
    onSuccess: async () => {
      setOpen(false)
      toast.success("Paciente criado com sucesso")
      await queryClient.refetchQueries({ queryKey: ["patients"] })
    },
  })

  const { register, handleSubmit } = useForm<CreatePatientFormValues>({
    defaultValues: { firstName: "", lastName: "" },
  })

  const onSubmit = async (data: CreatePatientFormValues) => {
    await createPatientMutation.mutateAsync(data)
  }

  const { data: patientsData, isLoading } = usePatients()
  const patients = patientsData?.map((patient) => ({
    id: patient.id,
    ...patient.user,
  }))

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Voltar ao dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Pacientes
          </h1>
          <p className="mt-1 text-muted-foreground">
            Listagem a partir dos mocks (TanStack Query).
          </p>
        </div>
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
                <label
                  htmlFor="patient-first-name"
                  className="text-sm font-medium"
                >
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
                <label
                  htmlFor="patient-last-name"
                  className="text-sm font-medium"
                >
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
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="mt-2 h-3 w-48 rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          : (patients ?? []).map((patient) => (
              <PatientModal
                key={`${patient.firstName}-${patient.lastName}`}
                patient={patient}
              />
            ))}
      </div>
    </div>
  )
}
