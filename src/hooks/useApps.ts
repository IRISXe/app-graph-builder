import { useQuery } from "@tanstack/react-query";

import { getApps } from "@/lib/mockApi";

export function useApps(simulateError: boolean) {
  return useQuery({
    queryKey: ["apps", simulateError],
    queryFn: () => getApps({ simulateError }),
  });
}