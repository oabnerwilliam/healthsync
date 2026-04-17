import { useQuery } from "@tanstack/react-query"

import { getAppointments } from "@/utils/functions"

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  })
}
