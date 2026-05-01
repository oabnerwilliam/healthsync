import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  createAppointment,
  getDoctors,
  getPatients,
} from "../../../utils/functions"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type CreateAppointmentFormValues = {
  doctorId: string
  patientId: string
  date: string
}

export const useCreateAppointment = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<CreateAppointmentFormValues>({
    defaultValues: { doctorId: "", patientId: "", date: "" },
  })

  const queryClient = useQueryClient()

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: CreateAppointmentFormValues) =>
      await createAppointment(data),
    onSuccess: async () => {
      setOpen(false)
      toast.success("Consulta criada com sucesso")
      form.reset()
      await queryClient.refetchQueries({ queryKey: ["appointments"] })
    },
  })

  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  })

  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  })

  const onSubmit = async (data: CreateAppointmentFormValues) => {
    await createAppointmentMutation.mutateAsync(data)
  }

  return {
    form,
    patients,
    doctors,
    onSubmit,
    open,
    setOpen,
  }
}
