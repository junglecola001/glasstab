import { motion } from "framer-motion";

import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspaceStore";

/**
 * Desktop switcher across the top (plan.md §8, §15). Workspaces come from the store;
 * the selected indicator is a single shared element so switching slides rather than
 * blinks. Creating, renaming and reordering desktops arrives in Phase 3.
 */
export function CategoryBar() {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const activeWorkspaceId = useWorkspaceStore((state) => state.activeWorkspaceId);
  const setActiveWorkspace = useWorkspaceStore((state) => state.setActiveWorkspace);

  return (
    <nav
      aria-label="Desktops"
      className="glass glass-floating glass-pill no-scrollbar flex max-w-full items-center gap-0.5 overflow-x-auto p-1.5"
    >
      {workspaces.map((workspace) => {
        const active = workspace.id === activeWorkspaceId;

        return (
          <button
            key={workspace.id}
            type="button"
            onClick={() => setActiveWorkspace(workspace.id)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative isolate flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium outline-none transition-colors duration-200 ease-out-soft focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
              active
                ? "text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
            )}
          >
            {active ? (
              <motion.span
                layoutId="desktop-indicator"
                className="glass-solid glass-3 absolute inset-0 -z-10 rounded-full"
                transition={springSoft}
              />
            ) : null}
            <span aria-hidden="true" className="text-[12px] leading-none">
              {workspace.icon}
            </span>
            <span className="whitespace-nowrap">{workspace.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
