import type { Edge, Node } from "@xyflow/react";

export type NodeStatus = "healthy" | "degraded" | "down";

export type ServiceType = "api" | "database" | "cache" | "worker";

export type ServiceNodeData = {
  label: string;
  description: string;
  status: NodeStatus;
  configValue: number;
  serviceType: ServiceType;
} & Record<string, unknown>;

export type ServiceNode = Node<ServiceNodeData, "service">;

export type AppGraph = {
  nodes: ServiceNode[];
  edges: Edge[];
};

export type UpdateServiceNodeData = (
  nodeId: string,
  data: Partial<ServiceNodeData>,
) => void;