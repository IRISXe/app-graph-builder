import type { AppSummary } from "@/types/app";
import type { AppGraph } from "@/types/graph";

const delay = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const apps: AppSummary[] = [
  {
    id: "supertokens-golang",
    name: "supertokens-golang",
    description: "Authentication service graph for Go services.",
  },
  {
    id: "supertokens-java",
    name: "supertokens-java",
    description: "Authentication service graph for Java services.",
  },
  {
    id: "supertokens-python",
    name: "supertokens-python",
    description: "Authentication service graph for Python services.",
  },
];

const graphs: Record<string, AppGraph> = {
  "supertokens-golang": {
    nodes: [
      {
        id: "auth-api",
        type: "service",
        position: { x: 120, y: 120 },
        data: {
          label: "Auth API",
          description: "Main authentication API service.",
          status: "healthy",
          configValue: 72,
          serviceType: "api",
        },
      },
      {
        id: "redis-cache",
        type: "service",
        position: { x: 480, y: 60 },
        data: {
          label: "Redis Cache",
          description: "Session and token cache layer.",
          status: "healthy",
          configValue: 44,
          serviceType: "cache",
        },
      },
      {
        id: "postgres-db",
        type: "service",
        position: { x: 480, y: 240 },
        data: {
          label: "Postgres DB",
          description: "Primary user and tenant data store.",
          status: "degraded",
          configValue: 61,
          serviceType: "database",
        },
      },
    ],
    edges: [
      {
        id: "auth-to-redis",
        source: "auth-api",
        target: "redis-cache",
        animated: true,
      },
      {
        id: "auth-to-postgres",
        source: "auth-api",
        target: "postgres-db",
      },
    ],
  },

  "supertokens-java": {
    nodes: [
      {
        id: "gateway",
        type: "service",
        position: { x: 100, y: 160 },
        data: {
          label: "API Gateway",
          description: "Routes traffic to Java auth services.",
          status: "healthy",
          configValue: 65,
          serviceType: "api",
        },
      },
      {
        id: "worker",
        type: "service",
        position: { x: 430, y: 80 },
        data: {
          label: "Token Worker",
          description: "Background token rotation worker.",
          status: "degraded",
          configValue: 38,
          serviceType: "worker",
        },
      },
      {
        id: "mysql",
        type: "service",
        position: { x: 430, y: 260 },
        data: {
          label: "MySQL DB",
          description: "Relational database for auth records.",
          status: "healthy",
          configValue: 80,
          serviceType: "database",
        },
      },
    ],
    edges: [
      {
        id: "gateway-to-worker",
        source: "gateway",
        target: "worker",
        animated: true,
      },
      {
        id: "gateway-to-mysql",
        source: "gateway",
        target: "mysql",
      },
    ],
  },

  "supertokens-python": {
    nodes: [
      {
        id: "python-api",
        type: "service",
        position: { x: 100, y: 100 },
        data: {
          label: "Python API",
          description: "Python authentication API service.",
          status: "healthy",
          configValue: 55,
          serviceType: "api",
        },
      },
      {
        id: "celery-worker",
        type: "service",
        position: { x: 420, y: 80 },
        data: {
          label: "Celery Worker",
          description: "Async background processing service.",
          status: "down",
          configValue: 20,
          serviceType: "worker",
        },
      },
      {
        id: "mongo-db",
        type: "service",
        position: { x: 420, y: 260 },
        data: {
          label: "Mongo DB",
          description: "Document database for application data.",
          status: "healthy",
          configValue: 69,
          serviceType: "database",
        },
      },
    ],
    edges: [
      {
        id: "api-to-worker",
        source: "python-api",
        target: "celery-worker",
        animated: true,
      },
      {
        id: "api-to-mongo",
        source: "python-api",
        target: "mongo-db",
      },
    ],
  },
};

type MockApiOptions = {
  simulateError?: boolean;
};

export async function getApps(options?: MockApiOptions): Promise<AppSummary[]> {
  await delay(700);

  if (options?.simulateError) {
    throw new Error("Failed to load apps.");
  }

  return apps;
}

export async function getAppGraph(
  appId: string,
  options?: MockApiOptions,
): Promise<AppGraph> {
  await delay(900);

  if (options?.simulateError) {
    throw new Error("Failed to load app graph.");
  }

  const graph = graphs[appId];

  if (!graph) {
    throw new Error("Graph not found.");
  }

  return structuredClone(graph);
}