import { UserRound } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Patient } from "@/utils/types"

const cardInteractive =
  "cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]"

type PatientModalProps = {
  patient: Patient
}

export function PatientModal({ patient }: PatientModalProps) {
  const fullName = `${patient.firstName} ${patient.lastName}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cardInteractive}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium">
                {fullName}
              </CardTitle>
              <CardDescription>Paciente ativo</CardDescription>
            </div>
            <UserRound className="size-5 shrink-0 text-primary" aria-hidden />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clique simulado — detalhes em breve.
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="gap-6 p-8 sm:max-w-md sm:p-10">
        <DialogHeader>
          <DialogTitle>{fullName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row w-full justify-between gap-2">
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
