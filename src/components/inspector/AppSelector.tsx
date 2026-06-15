import { AlertCircle, Server } from "lucide-react";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApps } from "@/hooks/useApps";
import { useUIStore } from "@/store/uiStore";

export function AppSelector() {
  const selectedAppId = useUIStore((state) => state.selectedAppId);
  const simulateError = useUIStore((state) => state.simulateError);
  const setSelectedAppId = useUIStore((state) => state.setSelectedAppId);
  const setSimulateError = useUIStore((state) => state.setSimulateError);

  const { data: apps, isLoading, isError, refetch } = useApps(simulateError);

  useEffect(() => {
    if (!selectedAppId && apps?.[0]) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Applications</h2>
          <p className="text-xs text-muted-foreground">
            Select an app to load graph
          </p>
        </div>

        <Badge variant="secondary">{apps?.length ?? 0}</Badge>
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-2">
        <span className="text-xs text-muted-foreground">Simulate API error</span>
        <Button
          variant={simulateError ? "destructive" : "outline"}
          size="sm"
          onClick={() => setSimulateError(!simulateError)}
        >
          {simulateError ? "On" : "Off"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : null}

      {isError ? (
        <Card className="space-y-3 border-destructive/40 p-3">
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            Unable to load apps
          </div>
          <Button size="sm" variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        </Card>
      ) : null}

      {!isLoading && !isError ? (
        <div className="space-y-2">
          {apps?.map((app) => {
            const isSelected = app.id === selectedAppId;

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => setSelectedAppId(app.id)}
                className={`w-full rounded-xl border p-3 text-left transition hover:bg-muted ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-muted p-2">
                    <Server className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{app.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {app.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}