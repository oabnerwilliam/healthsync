import type { LucideIcon } from "lucide-react"
import {
  Activity,
  BarChart3,
  HeartPulse,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { Link } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useDashboard } from "./hooks/use-dashboard"

const cardInteractive =
  "cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.99]"

export function DashboardPage() {
  const { totalPatients, totalAppointments, isLoading } = useDashboard()

  const kpiCards: Array<{
    title: string
    description: string
    value: string
    delta: string
    icon: LucideIcon
    to?: string
  }> = [
    {
      title: "Pacientes ativos",
      description: "Últimos 30 dias",
      value: isLoading ? "—" : String(totalPatients),
      delta: "+12% vs. mês anterior",
      icon: HeartPulse,
      to: "/dashboard/patients",
    },
    {
      title: "Consultas agendadas",
      description: "Esta semana",
      value: isLoading ? "—" : String(totalAppointments),
      delta: "+4% vs. semana anterior",
      icon: Activity,
    },
    {
      title: "Taxa de adesão",
      description: "Planos de cuidado",
      value: "87%",
      delta: "+2,1 p.p.",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Visão geral simulada — aqui entrarão gráficos e indicadores em tempo
          real.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map(({ title, description, value, delta, icon: Icon, to }) => {
          const card = (
            <Card className={cardInteractive}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-medium">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <Icon className="size-5 shrink-0 text-primary" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tabular-nums tracking-tight">
                  {value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{delta}</p>
              </CardContent>
            </Card>
          )

          return to ? (
            <Link
              key={title}
              to={to}
              className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {card}
            </Link>
          ) : (
            <div key={title}>{card}</div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className={cardInteractive}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChart className="size-5 text-primary" aria-hidden />
              <CardTitle className="text-base font-medium">
                Tendência de consultas
              </CardTitle>
            </div>
            <CardDescription>
              Volume diário (placeholder para gráfico de linhas)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="flex h-48 items-end justify-between gap-2 rounded-md border border-dashed border-border bg-muted/30 px-4 pb-4 pt-8"
              role="img"
              aria-label="Área reservada para gráfico de linhas"
            >
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="w-full max-w-8 rounded-sm bg-primary/30"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={cardInteractive}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChart className="size-5 text-primary" aria-hidden />
              <CardTitle className="text-base font-medium">
                Distribuição por especialidade
              </CardTitle>
            </div>
            <CardDescription>
              Placeholder para gráfico de pizza ou rosca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="flex h-48 items-center justify-center rounded-md border border-dashed border-border bg-muted/30"
              role="img"
              aria-label="Área reservada para gráfico circular"
            >
              <BarChart3 className="size-16 text-primary" aria-hidden />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
