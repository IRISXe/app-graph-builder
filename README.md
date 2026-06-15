# App Graph Builder

A responsive ReactFlow-based dashboard for visualizing and editing application service graphs.

This project was built as a frontend take-home assignment using React, TypeScript, ReactFlow, TanStack Query, Zustand, and shadcn/ui.

## Links
GitHub Repository: https://github.com/IRISXe/app-graph-builder
Live Demo: https://app-graph-builder-eight.vercel.app/

## Overview

App Graph Builder allows users to select an application, view its service architecture as an interactive graph, select individual service nodes, and edit node configuration from a side inspector panel.

The application uses mock API calls with simulated latency to demonstrate real-world data fetching, loading states, error states, caching, and refetching behavior without requiring a real backend.

## Features

### Layout

* Responsive dashboard layout
* Top navigation bar
* Left icon rail
* Right workspace panel
* Mobile slide-over drawer
* Dark dotted graph canvas

### ReactFlow Graph

* Interactive ReactFlow canvas
* Custom service node cards
* Minimum 3 nodes and 2 edges per graph
* Drag nodes
* Select nodes
* Delete selected node using Delete or Backspace
* Remove connected edges when a node is deleted
* Zoom and pan support
* Fit View button
* Dotted background
* Bonus Add Node action

### App Selector

* Loads applications from a mock API
* Select an app to load its graph
* Graph refetches when selected app changes
* Loading state while apps are loading
* Error state with retry option
* Simulated API error toggle

### Node Inspector

* Shows when a graph node is selected
* Status badge for node health
* Config and Runtime tabs
* Editable node name
* Editable description
* Synced slider and numeric input
* Inspector edits update ReactFlow node data immediately
* Runtime summary section

### State and Data

* TanStack Query for mock API/server-like state
* Zustand for minimal global UI state
* ReactFlow local state for nodes and edges
* Strict TypeScript types for apps, graph nodes, and node data

## Tech Stack

* React
* Vite
* TypeScript
* ReactFlow / xyflow
* TanStack Query
* Zustand
* shadcn/ui
* Tailwind CSS
* Lucide React icons
* ESLint

## Project Structure

```txt
src/
  app/
    App.tsx
    providers.tsx

  components/
    layout/
      AppShell.tsx
      TopBar.tsx
      LeftRail.tsx
      SidePanel.tsx
      MobilePanel.tsx

    graph/
      GraphWorkspace.tsx
      GraphCanvas.tsx
      ServiceNode.tsx

    inspector/
      AppSelector.tsx
      NodeInspector.tsx
      EmptyInspectorState.tsx

    ui/
      shadcn/ui components

  hooks/
    useApps.ts
    useAppGraph.ts

  lib/
    mockApi.ts
    utils.ts

  store/
    uiStore.ts

  types/
    app.ts
    graph.ts

  main.tsx
  index.css
```

## Setup Instructions

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit"
}
```

## Key Decisions

### TanStack Query for Mock API State

TanStack Query is used for server-like state such as the apps list and selected app graph. Even though the APIs are mocked, this approach demonstrates real-world API integration patterns such as loading states, error states, caching, retry behavior, and refetching when the selected app changes.

### Zustand for Minimal UI State

Zustand is used only for client-side UI state, including:

* selectedAppId
* selectedNodeId
* isMobilePanelOpen
* activeInspectorTab
* simulateError
* fitViewRequestId
* addNodeRequestId

Graph nodes and edges are intentionally not stored in Zustand because ReactFlow already provides dedicated state utilities for graph interactions.

### ReactFlow State for Graph Interactions

ReactFlow node and edge state is kept close to the graph workspace using ReactFlow utilities. This keeps graph updates predictable and avoids duplicating graph data across multiple stores.

### Derived Selected Node

The selected node is derived from selectedNodeId and the current nodes array. This avoids storing duplicated node data in Zustand and keeps the inspector in sync with the canvas.

### Mock API Layer

The mock API is placed in a separate `mockApi.ts` file. It simulates latency and error behavior using Promise-based functions. This keeps the data layer separated from UI components.

### Responsive Side Panel

On desktop, the workspace panel is displayed on the right side. On smaller screens, the same panel is reused inside a shadcn/ui Sheet component as a slide-over drawer. This avoids duplicating panel logic.

## Mock API Endpoints

The project simulates these endpoints:

```txt
GET /apps
GET /apps/:appId/graph
```

Implemented as:

```txt
getApps()
getAppGraph(appId)
```

The mock API returns in-memory data with simulated latency.

## Main User Flow

```txt
User opens the dashboard
↓
Apps are loaded from mock API
↓
First app is selected automatically
↓
Graph for selected app is loaded
↓
ReactFlow renders nodes and edges
↓
User clicks a service node
↓
Node inspector opens
↓
User edits node name, description, or config value
↓
Canvas node updates immediately
```

## Testing Checklist

Before submitting, the following checks were verified:

* App loads successfully
* Apps list loads from mock API
* Selecting another app changes the graph
* Loading states are shown
* Error states are shown using simulated API error
* Nodes can be dragged
* Nodes can be selected
* Node inspector appears when a node is selected
* Node name editing updates the canvas
* Description editing updates the node data
* Slider and numeric input stay synced
* Delete and Backspace remove selected nodes
* Connected edges are removed when deleting a node
* Fit View button works
* Add Node button creates a new service node
* Mobile drawer opens on smaller screens
* TypeScript check passes
* ESLint passes
* Production build passes

## Known Limitations

* Data is not persisted after page refresh.
* Mock API data is in-memory only.
* Runtime values are mocked.
* Newly added nodes are not automatically connected with edges.
* There is no real backend integration.
* Authentication is intentionally out of scope.
* Routes were not added because the assignment is implemented as a single-page graph builder workspace.

## Future Improvements

Given more time, the following improvements could be added:

* Persist graph edits to a backend or local storage
* Add edge creation between nodes
* Add node type switching from the inspector
* Add undo and redo support
* Add keyboard shortcut documentation
* Add unit tests for hooks and store logic
* Add route-based app graph URLs such as `/apps/:appId/graph`
* Add deployment to Vercel, Netlify, or Cloudflare Pages

## Assignment Status

The required assignment features are completed, including layout composition, ReactFlow interactions, service node inspector UI, TanStack Query mock API fetching, Zustand UI state management, responsive mobile drawer behavior, strict TypeScript setup, linting, and production build support.
