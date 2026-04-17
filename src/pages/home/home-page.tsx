import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function HomePage() {
  return (
    <div className="mx-auto space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Healthsync
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Uma visão unificada da sua operação em saúde: acompanhe pacientes,
          consultas agendadas e indicadores em um só lugar. Menos planilhas
          espalhadas, mais clareza para decidir com tranquilidade.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Use o painel para ver números em tempo real com os dados de exemplo,
          explorar a lista de pacientes e revisar cada consulta com médico,
          paciente e horário — tudo pensado para crescer junto com o seu fluxo.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/dashboard">Ir para o dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
