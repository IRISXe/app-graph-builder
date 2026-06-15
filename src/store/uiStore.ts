import { create } from "zustand";

type InspectorTab = "config" | "runtime";

type UIState = {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  simulateError: boolean;
  fitViewRequestId: number;
  addNodeRequestId: number;

  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (open: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setSimulateError: (value: boolean) => void;
  requestFitView: () => void;
  requestAddNode: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  simulateError: false,
  fitViewRequestId: 0,
  addNodeRequestId: 0,

  setSelectedAppId: (appId) =>
    set({
      selectedAppId: appId,
      selectedNodeId: null,
    }),

  setSelectedNodeId: (nodeId) =>
    set({
      selectedNodeId: nodeId,
    }),

  setMobilePanelOpen: (open) =>
    set({
      isMobilePanelOpen: open,
    }),

  setActiveInspectorTab: (tab) =>
    set({
      activeInspectorTab: tab,
    }),

  setSimulateError: (value) =>
    set({
      simulateError: value,
    }),

  requestFitView: () =>
    set((state) => ({
      fitViewRequestId: state.fitViewRequestId + 1,
    })),

  requestAddNode: () =>
    set((state) => ({
      addNodeRequestId: state.addNodeRequestId + 1,
    })),
}));