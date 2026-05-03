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
import { inputClassName } from "../../patients/components/create-patient-modal"
import { Input } from "../../../components/ui/input"

function parseDateValue(iso: string): Date | null {
  if (!iso) return null
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? null : d
}

function timeFromDate(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

function toLocalRFC3339(d: Date): string {
  const p2 = (n: number) => String(n).padStart(2, "0")
  const y = d.getFullYear()
  const mo = p2(d.getMonth() + 1)
  const da = p2(d.getDate())
  const h = p2(d.getHours())
  const mi = p2(d.getMinutes())
  const s = p2(d.getSeconds())
  const offsetMins = -d.getTimezoneOffset()
  const sign = offsetMins >= 0 ? "+" : "-"
  const abs = Math.abs(offsetMins)
  const oh = p2(Math.floor(abs / 60))
  const om = p2(abs % 60)
  return `${y}-${mo}-${da}T${h}:${mi}:${s}${sign}${oh}:${om}`
}

export const CreateAppointmentModal = () => {
  const { form, patients, doctors, onSubmit, open, setOpen } =
    useCreateAppointment()
  const { handleSubmit, watch, setValue } = form
  const dateValue = watch("date")
  const selectedDate = parseDateValue(dateValue)

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
            <label
              htmlFor="appointment-datetime"
              className="text-sm font-medium"
            >
              Data e horário da consulta
            </label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      selectedDate.toLocaleDateString("pt-BR")
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    onSelect={(day) => {
                      if (!day) {
                        setValue("date", "")
                        return
                      }
                      const next = new Date(day)
                      const prev = selectedDate
                      if (prev) {
                        next.setHours(prev.getHours(), prev.getMinutes(), 0, 0)
                      } else {
                        next.setHours(9, 0, 0, 0)
                      }
                      setValue("date", toLocalRFC3339(next))
                    }}
                    selected={selectedDate ?? undefined}
                    mode="single"
                    required
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="appointment-datetime"
                type="time"
                className={inputClassName}
                disabled={!selectedDate}
                value={selectedDate ? timeFromDate(selectedDate) : ""}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(":").map(Number)
                  const base =
                    selectedDate ??
                    (() => {
                      const t = new Date()
                      t.setHours(0, 0, 0, 0)
                      return t
                    })()
                  const next = new Date(base)
                  next.setHours(h, m, 0, 0)
                  setValue("date", toLocalRFC3339(next))
                }}
              />
            </div>
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
