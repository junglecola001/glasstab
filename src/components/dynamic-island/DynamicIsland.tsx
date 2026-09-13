import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useClock } from "@/hooks/useClock";
import { quickFade, springSoft } from "@/lib/motion";
import { formatClock, formatLongDate, isDaytime } from "@/lib/time";
import { useSettingsStore } from "@/store/settingsStore";
import { useUiStore } from "@/store/uiStore";
import { useActiveWorkspace } from "@/store/workspaceStore";

const COLLAPSED_RADIUS = 999;
const EXPANDED_RADIUS = 28;

/**
 * Global status centre (plan.md §12, §13). For now it carries the clock, the date and
 * the current desktop; Phase 5 feeds it the focus timer and now-playing state through
 * the same store hook.
 */
export function DynamicIsland() {
  const now = useClock(1000);
  const expanded = useUiStore((state) => state.islandExpanded);
  const toggleExpanded = useUiStore((state) => state.toggleIslandExpanded);
  const use24HourClock = useSettingsStore((state) => state.settings.use24HourClock);
  const showSeconds = useSettingsStore((state) => state.settings.showSeconds);
  const workspace = useActiveWorkspace();

  const time = formatClock(now, use24HourClock, showSeconds);
  const daytime = isDaytime(now);
  const DayIcon = daytime ? Sun : Moon;

  return (
    <motion.div
      layout
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse status" : "Expand status"}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      animate={{ borderRadius: expanded ? EXPANDED_RADIUS : COLLAPSED_RADIUS }}
      transition={springSoft}
      className="glass glass-floating shrink-0 cursor-pointer select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={quickFade}
            className="flex w-[288px] flex-col items-center gap-2 px-6 pb-5 pt-4 text-center"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground))]">
              {workspace.name}
            </span>
            <span className="font-display text-[40px] font-semibold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
              {time}
            </span>
            <span className="text-[13px] text-[hsl(var(--muted-foreground))]">
              {formatLongDate(now)}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={quickFade}
            className="flex h-11 items-center gap-2.5 px-4"
          >
            <span className="text-[15px] font-semibold leading-none tracking-[-0.01em] [font-variant-numeric:tabular-nums]">
              {time}
            </span>
            <DayIcon className="size-4 text-[hsl(var(--muted-foreground))]" aria-hidden="true" />
            <span className="sr-only">{daytime ? "Daytime" : "Night"}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
