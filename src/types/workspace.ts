import type { Shortcut } from "./shortcut";
import type { WidgetInstance } from "./widget";

/** A single desktop: its own widgets and shortcuts (plan.md §4, §7). */
export interface Workspace {
  id: string;
  name: string;
  icon?: string;
  categoryId?: string;
  order: number;
  widgets: WidgetInstance[];
  shortcuts: Shortcut[];
}

/** A grouping for workspaces, e.g. Work / Study / Music / Dev (plan.md §4, §8). */
export interface Category {
  id: string;
  name: string;
  icon?: string;
  order: number;
}
