import { createBrowserRouter } from "react-router-dom"

import { RootLayout } from "@/layouts/root-layout"
import { AboutPage } from "@/pages/about-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { HomePage } from "@/pages/home-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
])
