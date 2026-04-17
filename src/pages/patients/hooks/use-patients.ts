import { useQuery } from "@tanstack/react-query"

import { getPatients } from "@/utils/functions"

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  })
}
