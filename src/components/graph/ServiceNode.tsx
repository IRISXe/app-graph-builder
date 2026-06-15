import { Box, Database, Server, Workflow, type LucideIcon } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import { Badge } from "@/components/ui/badge";
import type { ServiceNode, ServiceType } from "@/types/graph";

const serviceTypeMeta: Record<
  ServiceType,
  {
    label: string;
    icon: LucideIcon;
  }
> = {
  api: {
    label: "API",
    icon: Server,
  },
  database: {
    label: "Database",
    icon: Database,
  },
  cache: {
    label: "Cache",
    icon: Box,
  },
  worker: {
    label: "Worker",
    icon: Workflow,
  },
};

const statusStyles = {
  healthy: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  degraded: "border-amber-500/40 bg-amber-500/10 text-amber-500",
  down: "border-red-500/40 bg-red-500/10 text-red-500",
};

export function ServiceNodeCard({ data, selected }: NodeProps<ServiceNode>) {
  const meta = serviceTypeMeta[data.serviceType];
  const Icon = meta.icon;

  return (
    <div
      className={`min-w-[240px] rounded-2xl border bg-background p-4 shadow-xl transition ${
        selected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border/80"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-3 !border-2 !border-background !bg-primary"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <Icon className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{data.label}</p>
            <p className="text-xs text-muted-foreground">{meta.label}</p>
          </div>
        </div>

        <Badge className={statusStyles[data.status]} variant="outline">
          {data.status}
        </Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">
        {data.description}
      </p>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Config</span>
          <span className="font-medium">{data.configValue}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${data.configValue}%` }}
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-3 !border-2 !border-background !bg-primary"
      />
    </div>
  );
}