import { useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Edge,
  type NodeMouseHandler,
  type NodeTypes,
  type OnEdgesChange,
  type OnNodesChange,
  type ReactFlowInstance,
} from "@xyflow/react";
import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUIStore } from "@/store/uiStore";
import type { ServiceNode } from "@/types/graph";

import { ServiceNodeCard } from "./ServiceNode";

const nodeTypes = {
  service: ServiceNodeCard,
} satisfies NodeTypes;

type GraphCanvasProps = {
  nodes: ServiceNode[];
  edges: Edge[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onNodesChange: OnNodesChange<ServiceNode>;
  onEdgesChange: OnEdgesChange<Edge>;
};

export function GraphCanvas({
  nodes,
  edges,
  isLoading,
  isError,
  onRetry,
  onNodesChange,
  onEdgesChange,
}: GraphCanvasProps) {
  const selectedNodeId = useUIStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useUIStore((state) => state.setSelectedNodeId);
  const fitViewRequestId = useUIStore((state) => state.fitViewRequestId);

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance<ServiceNode, Edge> | null>(null);

  useEffect(() => {
    if (!reactFlowInstance) {
      return;
    }

    void reactFlowInstance.fitView({
      padding: 0.25,
      duration: 400,
    });
  }, [fitViewRequestId, reactFlowInstance]);

  const handleNodeClick: NodeMouseHandler<ServiceNode> = (_, node) => {
    setSelectedNodeId(node.id);
  };

  return (
    <div className="relative h-full w-full bg-zinc-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={() => setSelectedNodeId(null)}
        onNodesDelete={(deletedNodes) => {
          const deletedSelectedNode = deletedNodes.some(
            (node) => node.id === selectedNodeId,
          );

          if (deletedSelectedNode) {
            setSelectedNodeId(null);
          }
        }}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        deleteKeyCode={["Backspace", "Delete"]}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            strokeWidth: 2,
          },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="rgba(255,255,255,0.22)"
        />

        <Controls position="bottom-left" />
      </ReactFlow>

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
          <Card className="flex items-center gap-3 px-5 py-4">
            <Loader2 className="size-4 animate-spin" />
            <div>
              <p className="text-sm font-medium">Loading graph</p>
              <p className="text-xs text-muted-foreground">
                Fetching selected app services...
              </p>
            </div>
          </Card>
        </div>
      ) : null}

      {isError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm">
          <Card className="w-[320px] space-y-4 border-destructive/40 p-5 text-center">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-5 text-destructive" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">Unable to load graph</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                The mock API returned an error. Turn off simulate error or
                retry.
              </p>
            </div>

            <Button size="sm" onClick={onRetry}>
              Retry
            </Button>
          </Card>
        </div>
      ) : null}
    </div>
  );
}