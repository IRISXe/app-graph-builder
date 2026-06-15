import { MousePointerClick } from "lucide-react";

import { Card } from "@/components/ui/card";

export function EmptyInspectorState() {
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-3 rounded-full bg-muted p-3">
        <MousePointerClick className="size-5 text-muted-foreground" />
      </div>

      <h3 className="text-sm font-medium">No node selected</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Select a service node from the canvas to inspect and edit its
        configuration.
      </p>
    </Card>
  );
}