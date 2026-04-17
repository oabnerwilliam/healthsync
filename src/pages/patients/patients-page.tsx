import { UserRound } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { usePatients } from "./hooks/use-patients"

const cardInteractive =
  "cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]"

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
              <Card
                key={`${patient.firstName}-${patient.lastName}`}
                className={cardInteractive}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-medium">
                      {patient.firstName} {patient.lastName}
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
            ))}
      </div>
    </div>
  )
}
