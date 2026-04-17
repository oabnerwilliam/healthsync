# Healthsync

Aplicação web para **organizar a operação em saúde** em um só lugar: indicadores no painel, cadastro de pacientes e agenda de consultas, com dados de exemplo (mocks) prontos para desenvolvimento e demonstração.

O objetivo é oferecer uma base clara para evoluir rumo a um produto real — integrações com API, autenticação e persistência podem ser acrescentadas sem redefinir a experiência do usuário.

## O que você encontra aqui

- **Início** — Apresentação do produto e atalho para o painel.
- **Dashboard** — Visão geral com indicadores (totais de pacientes e consultas, placeholders para gráficos). Os cards de pacientes e consultas levam às listagens.
- **Pacientes** (`/dashboard/patients`) — Lista em grade; cada card abre um **modal** com detalhes básicos (nome).
- **Consultas** (`/dashboard/appointments`) — Lista em coluna com médico, paciente e data/hora; cada item abre um **modal** com detalhes da consulta.
- **Sobre** — Página estática de exemplo.

Os dados vêm de **mocks** em TypeScript (`src/utils/mocks.ts`), carregados via funções assíncronas (`src/utils/functions.ts`) e **TanStack Query** nos hooks por página.

## Stack

| Área | Tecnologia |
|------|------------|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Roteamento | React Router 7 |
| Dados remotos (mock) | TanStack Query 5 |
| Componentes | shadcn/ui, Radix, Lucide |
| Build | Vite 8 |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior (recomendado)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm) (vem com o Node) ou [pnpm](https://pnpm.io/), se preferir

## Configuração e execução

Clone o repositório e instale as dependências na raiz do projeto:

```bash
npm install
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot reload (Vite). |
| `npm run build` | Verificação TypeScript (`tsc -b`) + build de produção. |
| `npm run preview` | Servir a pasta `dist` localmente após o build. |
| `npm run lint` | Executar o ESLint no projeto. |

Para desenvolver:

```bash
npm run dev
```

Abra o endereço indicado no terminal (em geral `http://localhost:5173`).

### Componentes shadcn (opcional)

Para adicionar componentes do [shadcn/ui](https://ui.shadcn.com/) com CLI, o `package.json` inclui um script de conveniência. Se usar **pnpm**:

```bash
pnpm run components
```

Com **npm**, o equivalente pode ser:

```bash
npx shadcn@latest add <componente>
```

## Estrutura do código (resumo)

```
src/
├── components/
│   └── ui/          # Componentes shadcn (Button, Card, Dialog, …)
├── layouts/         # Layout raiz (cabeçalho, navegação)
├── pages/           # Rotas por domínio (home, dashboard, patients, appointments, about)
├── utils/           # Tipos, mocks e funções de “API” simulada
├── main.tsx         # Entrada, providers (Query Client, nuqs, router)
└── router.tsx       # Definição de rotas
```

## Licença

Projeto privado — consulte os responsáveis pelo repositório para uso e distribuição.
