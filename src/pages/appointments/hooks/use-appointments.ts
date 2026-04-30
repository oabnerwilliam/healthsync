import { useQuery } from "@tanstack/react-query"

import { getAppointments } from "@/utils/functions"
import type { AppointmentResponse } from "../../../utils/types"

export function useAppointments() {
  return useQuery<AppointmentResponse[]>({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  })
}
