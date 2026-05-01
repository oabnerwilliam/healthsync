import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Calendar } from "../../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { useCreateAppointment } from "../hooks/use-create-appointment"

export const CreateAppointmentModal = () => {
  const { form, patients, doctors, onSubmit, open, setOpen } =
    useCreateAppointment()
  const { handleSubmit, watch, setValue } = form

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-6 cursor-pointer">Criar consulta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar consulta</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 pt-2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="doctor-id" className="text-sm font-medium">
              Médico
            </label>
            <Select onValueChange={(value) => setValue("doctorId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um médico" />
              </SelectTrigger>
              <SelectContent>
                {doctors?.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.user.firstName} {doctor.user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="patient-id" className="text-sm font-medium">
              Paciente
            </label>
            <Select onValueChange={(value) => setValue("patientId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.user.firstName} {patient.user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="patient-id" className="text-sm font-medium">
              Data da consulta
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("date") ? (
                    new Date(watch("date")).toLocaleDateString("pt-BR")
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  onSelect={(day) => setValue("date", day?.toISOString() || "")}
                  selected={new Date(watch("date"))}
                  mode="single"
                  required
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
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
