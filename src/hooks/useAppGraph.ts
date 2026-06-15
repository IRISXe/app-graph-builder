import { useQuery } from "@tanstack/react-query";

import { getAppGraph } from "@/lib/mockApi";

export function useAppGraph(appId: string | null, simulateError: boolean) {
  return useQuery({
    queryKey: ["app-graph", appId, simulateError],
    queryFn: () => getAppGraph(appId ?? "", { simulateError }),
    enabled: Boolean(appId),
  });
}