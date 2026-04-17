import { useQuery } from "@tanstack/react-query"
import { parseAsString, useQueryState } from "nuqs"

import { Button } from "@/components/ui/button"

export function HomePage() {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""))

  const health = useQuery({
    queryKey: ["healthcheck"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150))
      return { ok: true as const }
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Healthsync</h1>
        <p className="mt-1 text-muted-foreground">
          Vite + React + Tailwind 4 + shadcn + React Router + TanStack Query + nuqs.
        </p>
      </div>

      <section className="space-y-2 rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h2 className="text-sm font-medium">TanStack Query</h2>
        <p className="text-sm text-muted-foreground">
          Status:{" "}
          {health.isPending
            ? "carregando…"
            : health.isError
              ? "erro"
              : health.data?.ok
                ? "ok"
                : "—"}
        </p>
        <Button type="button" variant="outline" size="sm" onClick={() => void health.refetch()}>
          Refetch
        </Button>
      </section>

      <section className="space-y-2 rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h2 className="text-sm font-medium">nuqs (URL)</h2>
        <p className="text-sm text-muted-foreground">
          Parâmetro <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">q</code>:{" "}
          <span className="font-mono">{q || "(vazio)"}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => void setQ("demo")}>
            Definir q=demo
          </Button>
          <Button type="button" size="sm" variant="secondary" onClick={() => void setQ(null)}>
            Limpar q
          </Button>
        </div>
      </section>
    </div>
  )
}
