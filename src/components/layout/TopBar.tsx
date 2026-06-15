import { PanelRightOpen, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";

export function TopBar() {
  const setMobilePanelOpen = useUIStore((state) => state.setMobilePanelOpen);
  const requestFitView = useUIStore((state) => state.requestFitView);
  const requestAddNode = useUIStore((state) => state.requestAddNode);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div>
        <h1 className="text-sm font-semibold tracking-wide">
          App Graph Builder
        </h1>
        <p className="text-xs text-muted-foreground">
          Visual service architecture editor
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={requestFitView}>
          <RotateCcw className="mr-2 size-4" />
          Fit View
        </Button>

        <Button variant="default" size="sm" onClick={requestAddNode}>
          <Plus className="mr-2 size-4" />
          Add Node
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => setMobilePanelOpen(true)}
        >
          <PanelRightOpen className="mr-2 size-4" />
          Panel
        </Button>
      </div>
    </header>
  );
}