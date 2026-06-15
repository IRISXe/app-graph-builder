import { GraphWorkspace } from "@/components/graph/GraphWorkspace";
import { LeftRail } from "@/components/layout/LeftRail";
import { TopBar } from "@/components/layout/TopBar";

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <LeftRail />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <GraphWorkspace />
      </div>
    </div>
  );
}