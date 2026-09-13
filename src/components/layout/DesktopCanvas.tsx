import { AnimatePresence, motion } from "framer-motion";

import { GlassCard } from "@/components/glass";
import { fadeTransition } from "@/lib/motion";
import { useActiveWorkspace } from "@/store/workspaceStore";

/**
 * The widget canvas for the active desktop. Phase 4 mounts the widget grid here; for
 * now it renders the per-desktop empty state and the desktop switch animation from
 * plan.md §14 (outgoing: opacity and scale down, incoming: up).
 */
export function DesktopCanvas() {
  const workspace = useActiveWorkspace();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={workspace.id}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={fadeTransition}
        className="flex w-full max-w-[1200px] flex-1 items-center justify-center"
      >
        {workspace.widgets.length === 0 ? (
          <GlassCard
            level="1"
            radius="lg"
            className="w-full max-w-sm border-dashed px-6 py-8 text-center"
          >
            <p className="font-display text-[15px] font-semibold">{workspace.name}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              This desktop is empty. Widgets and shortcuts will live here.
            </p>
          </GlassCard>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
