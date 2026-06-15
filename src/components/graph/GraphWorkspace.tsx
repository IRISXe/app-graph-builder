import { useCallback, useEffect, useRef } from "react";
import { type Edge, useEdgesState, useNodesState } from "@xyflow/react";

import { MobilePanel } from "@/components/layout/MobilePanel";
import { SidePanel } from "@/components/layout/SidePanel";
import { useAppGraph } from "@/hooks/useAppGraph";
import { useUIStore } from "@/store/uiStore";
import type {
  ServiceNode,
  ServiceNodeData,
  UpdateServiceNodeData,
} from "@/types/graph";

import { GraphCanvas } from "./GraphCanvas";

export function GraphWorkspace() {
  const selectedAppId = useUIStore((state) => state.selectedAppId);
  const selectedNodeId = useUIStore((state) => state.selectedNodeId);
  const simulateError = useUIStore((state) => state.simulateError);
  const addNodeRequestId = useUIStore((state) => state.addNodeRequestId);
  const setSelectedNodeId = useUIStore((state) => state.setSelectedNodeId);
  const setMobilePanelOpen = useUIStore((state) => state.setMobilePanelOpen);

  const lastHandledAddNodeRequestId = useRef(0);

  const { data, isLoading, isError, refetch } = useAppGraph(
    selectedAppId,
    simulateError,
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const selectedNode =
    nodes.find((node) => node.id === selectedNodeId) ?? null;

  const handleUpdateNodeData: UpdateServiceNodeData = useCallback(
    (nodeId: string, updatedData: Partial<ServiceNodeData>) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) => {
          if (node.id !== nodeId) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }),
      );
    },
    [setNodes],
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setNodes(data.nodes);
    setEdges(data.edges);
    setSelectedNodeId(null);
  }, [data, setEdges, setNodes, setSelectedNodeId]);

  useEffect(() => {
    if (
      addNodeRequestId === 0 ||
      addNodeRequestId === lastHandledAddNodeRequestId.current ||
      isLoading ||
      isError
    ) {
      return;
    }

    lastHandledAddNodeRequestId.current = addNodeRequestId;

    const newNodeId = `service-${Date.now()}`;

    setNodes((currentNodes) => {
      const newNode: ServiceNode = {
        id: newNodeId,
        type: "service",
        position: {
          x: 180 + currentNodes.length * 40,
          y: 360 + currentNodes.length * 30,
        },
        data: {
          label: "New Service",
          description: "Newly added service node.",
          status: "healthy",
          configValue: 50,
          serviceType: "api",
        },
      };

      return [...currentNodes, newNode];
    });

    setSelectedNodeId(newNodeId);
    setMobilePanelOpen(true);
  }, [
    addNodeRequestId,
    isError,
    isLoading,
    setMobilePanelOpen,
    setNodes,
    setSelectedNodeId,
  ]);

  return (
    <>
      <main className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="relative min-h-0 overflow-hidden">
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => void refetch()}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          />
        </section>

        <section className="hidden min-h-0 border-l lg:block">
          <SidePanel
            selectedNode={selectedNode}
            onUpdateNodeData={handleUpdateNodeData}
          />
        </section>
      </main>

      <MobilePanel
        selectedNode={selectedNode}
        onUpdateNodeData={handleUpdateNodeData}
      />
    </>
  );
}