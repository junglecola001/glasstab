import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** Grid footprint on the 12 column canvas (plan.md §16). */
export type WidgetSize = "1x1" | "2x1" | "2x2" | "3x2" | "4x2";

/** A widget placed on a workspace. `config` is owned by the widget itself. */
export interface WidgetInstance {
  id: string;
  type: string;
  size: WidgetSize;
  order: number;
  config: Record<string, unknown>;
}

export interface WidgetComponentProps {
  instance: WidgetInstance;
  updateConfig: (patch: Record<string, unknown>) => void;
}

/**
 * Registry entry for a widget type (plan.md §5). Adding a widget means adding one
 * definition — the grid and editor never change (Rule 5).
 */
export interface WidgetDefinition {
  type: string;
  name: string;
  description: string;
  icon: LucideIcon;
  defaultSize: WidgetSize;
  component: ComponentType<WidgetComponentProps>;
}
