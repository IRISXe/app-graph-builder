import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUIStore } from "@/store/uiStore";
import type { ServiceNode, UpdateServiceNodeData } from "@/types/graph";

import { SidePanel } from "./SidePanel";

type MobilePanelProps = {
  selectedNode: ServiceNode | null;
  onUpdateNodeData: UpdateServiceNodeData;
};

export function MobilePanel({
  selectedNode,
  onUpdateNodeData,
}: MobilePanelProps) {
  const isMobilePanelOpen = useUIStore((state) => state.isMobilePanelOpen);
  const setMobilePanelOpen = useUIStore((state) => state.setMobilePanelOpen);

  return (
    <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
      <SheetContent side="right" className="w-[340px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Workspace panel</SheetTitle>
        </SheetHeader>

        <SidePanel
          selectedNode={selectedNode}
          onUpdateNodeData={onUpdateNodeData}
        />
      </SheetContent>
    </Sheet>
  );
}