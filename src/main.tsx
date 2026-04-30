import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { router } from "./router.tsx"
import "./index.css"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
        <Toaster richColors position="bottom-left" />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
