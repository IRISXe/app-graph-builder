import { Activity, Cpu, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUIStore } from "@/store/uiStore";
import type {
  NodeStatus,
  ServiceNode,
  UpdateServiceNodeData,
} from "@/types/graph";

const statusLabels: Record<NodeStatus, string> = {
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

const statusStyles: Record<NodeStatus, string> = {
  healthy: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
  degraded: "border-amber-500/40 bg-amber-500/10 text-amber-600",
  down: "border-red-500/40 bg-red-500/10 text-red-600",
};

type NodeInspectorProps = {
  selectedNode: ServiceNode;
  onUpdateNodeData: UpdateServiceNodeData;
};

function clampConfigValue(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export function NodeInspector({
  selectedNode,
  onUpdateNodeData,
}: NodeInspectorProps) {
  const activeInspectorTab = useUIStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useUIStore(
    (state) => state.setActiveInspectorTab,
  );

  const configValue = selectedNode.data.configValue;

  const handleConfigValueChange = (value: number) => {
    onUpdateNodeData(selectedNode.id, {
      configValue: clampConfigValue(value),
    });
  };

  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Selected service</p>
          <h3 className="truncate text-sm font-semibold">
            {selectedNode.data.label}
          </h3>
        </div>

        <Badge
          className={statusStyles[selectedNode.data.status]}
          variant="outline"
        >
          {statusLabels[selectedNode.data.status]}
        </Badge>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={(value) =>
          setActiveInspectorTab(value as "config" | "runtime")
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="node-name" className="text-xs font-medium">
              Node name
            </label>
            <Input
              id="node-name"
              value={selectedNode.data.label}
              onChange={(event) =>
                onUpdateNodeData(selectedNode.id, {
                  label: event.target.value,
                })
              }
              placeholder="Enter node name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="node-description" className="text-xs font-medium">
              Description
            </label>
            <Textarea
              id="node-description"
              value={selectedNode.data.description}
              onChange={(event) =>
                onUpdateNodeData(selectedNode.id, {
                  description: event.target.value,
                })
              }
              placeholder="Describe this service"
              rows={4}
            />
          </div>

          <div className="space-y-3 rounded-xl border bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <label className="text-xs font-medium">Config value</label>
                <p className="text-xs text-muted-foreground">
                  Synced slider and numeric input
                </p>
              </div>

              <Input
                type="number"
                min={0}
                max={100}
                value={configValue}
                onChange={(event) =>
                  handleConfigValueChange(Number(event.target.value))
                }
                className="w-20 text-right"
              />
            </div>

            <Slider
              value={[configValue]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => handleConfigValueChange(value[0] ?? 0)}
            />
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="mt-4 space-y-3">
          <div className="rounded-xl border bg-muted/30 p-3">
            <div className="mb-3 flex items-center gap-2">
              <Activity className="size-4 text-muted-foreground" />
              <p className="text-xs font-medium">Runtime summary</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-background p-3">
                <p className="text-muted-foreground">Service type</p>
                <p className="mt-1 font-medium capitalize">
                  {selectedNode.data.serviceType}
                </p>
              </div>

              <div className="rounded-lg bg-background p-3">
                <p className="text-muted-foreground">Status</p>
                <p className="mt-1 font-medium">
                  {statusLabels[selectedNode.data.status]}
                </p>
              </div>

              <div className="rounded-lg bg-background p-3">
                <p className="text-muted-foreground">Config</p>
                <p className="mt-1 font-medium">{configValue}%</p>
              </div>

              <div className="rounded-lg bg-background p-3">
                <p className="text-muted-foreground">Node ID</p>
                <p className="mt-1 truncate font-medium">{selectedNode.id}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 rounded-xl border bg-blue-500/5 p-3 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>
              Runtime values are mocked for this assignment. Config edits are
              persisted into the ReactFlow node data.
            </p>
          </div>

          <div className="rounded-xl border bg-muted/30 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Cpu className="size-4 text-muted-foreground" />
              <p className="text-xs font-medium">Resource usage</p>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-background">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${configValue}%` }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}