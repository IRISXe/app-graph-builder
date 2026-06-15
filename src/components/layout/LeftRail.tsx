import { Boxes, GitBranch, LayoutDashboard, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Apps",
    icon: Boxes,
  },
  {
    label: "Graph",
    icon: GitBranch,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export function LeftRail() {
  return (
    <aside className="hidden w-14 flex-col items-center border-r bg-background py-3 md:flex">
      <div className="mb-6 flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
        A
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            aria-label={item.label}
          >
            <item.icon className="size-4" />
          </Button>
        ))}
      </nav>
    </aside>
  );
}