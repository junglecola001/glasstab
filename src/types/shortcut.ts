/** A saved website shown on a desktop (plan.md §6). */
export interface Shortcut {
  id: string;
  title: string;
  url: string;
  icon?: string;
  order: number;
}
