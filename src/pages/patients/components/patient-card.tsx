import * as React from "react"
import { UserRound } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Patient } from "@/utils/types"

const patientCardInteractive =
  "cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]"

export type PatientCardProps = Omit<React.ComponentPropsWithoutRef<typeof Card>, "children"> & {
  patient: Patient
}

export const PatientCard = React.forwardRef<HTMLDivElement, PatientCardProps>(
  function PatientCard({ patient, className, ...props }, ref) {
    const fullName = `${patient.firstName} ${patient.lastName}`

    return (
      <Card
        ref={ref}
        className={cn(patientCardInteractive, className)}
        {...props}
      >
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">{fullName}</CardTitle>
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
    )
  },
)
PatientCard.displayName = "PatientCard"
