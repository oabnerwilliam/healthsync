import { useQuery } from "@tanstack/react-query"

import { getPatients } from "@/utils/functions"
import type { PatientResponse } from "../../../utils/types"

export function usePatients() {
  return useQuery<PatientResponse[]>({
    queryKey: ["patients"],
    queryFn: getPatients,
  })
}
