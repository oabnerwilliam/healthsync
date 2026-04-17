import { createBrowserRouter } from "react-router-dom"

import { RootLayout } from "@/layouts/root-layout"
import { AboutPage } from "@/pages/about/about-page"
import { DashboardLayout } from "@/pages/dashboard/dashboard-layout"
import { DashboardPage } from "@/pages/dashboard/dashboard-page"
import { HomePage } from "@/pages/home/home-page"
import { AppointmentsPage } from "@/pages/appointments/appointments-page"
import { PatientsPage } from "@/pages/patients/patients-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "patients", element: <PatientsPage /> },
          { path: "appointments", element: <AppointmentsPage /> },
        ],
      },
    ],
  },
])
