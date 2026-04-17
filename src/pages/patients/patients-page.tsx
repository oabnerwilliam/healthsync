import { Link } from "react-router-dom"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import { PatientModal } from "./components/patient-modal"
import { usePatients } from "./hooks/use-patients"

export function PatientsPage() {
  const { data: patients, isPending } = usePatients()

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/dashboard"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          ← Voltar ao dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Pacientes</h1>
        <p className="mt-1 text-muted-foreground">
          Listagem a partir dos mocks (TanStack Query).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
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
          : patients?.map((patient) => (
              <PatientModal
                key={`${patient.firstName}-${patient.lastName}`}
                patient={patient}
              />
            ))}
      </div>
    </div>
  )
}
