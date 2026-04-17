import { useQuery } from "@tanstack/react-query";

import { getAppointments, getPatients } from "@/utils/functions";

export function useDashboard() {
  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const appointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const totalPatients = patientsQuery.data?.length ?? 0;
  const totalAppointments = appointmentsQuery.data?.length ?? 0;

  const isLoading =
    patientsQuery.isPending || appointmentsQuery.isPending;

  return {
    totalPatients,
    totalAppointments,
    isLoading,
  };
}
