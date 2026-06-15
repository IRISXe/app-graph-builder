import { Separator } from "@/components/ui/separator";
import { AppSelector } from "@/components/inspector/AppSelector";
import { EmptyInspectorState } from "@/components/inspector/EmptyInspectorState";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import type { ServiceNode, UpdateServiceNodeData } from "@/types/graph";

type SidePanelProps = {
  selectedNode: ServiceNode | null;
  onUpdateNodeData: UpdateServiceNodeData;
};

export function SidePanel({
  selectedNode,
  onUpdateNodeData,
}: SidePanelProps) {
  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-background">
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Workspace</h2>
        <p className="text-xs text-muted-foreground">
          Manage apps and selected service nodes
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <AppSelector />

        <Separator />

        <section className="space-y-3">
          <div>
            <h2 className="text-sm font-semibold">Node Inspector</h2>
            <p className="text-xs text-muted-foreground">
              Edit selected node configuration
            </p>
          </div>

          {selectedNode ? (
            <NodeInspector
              selectedNode={selectedNode}
              onUpdateNodeData={onUpdateNodeData}
            />
          ) : (
            <EmptyInspectorState />
          )}
        </section>
      </div>
    </aside>
  );
}