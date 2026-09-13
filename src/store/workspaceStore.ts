import { create } from "zustand";

import type { Category, Workspace } from "@/types";

/**
 * Seed data for the shell. Everything here is real store data — components read it,
 * they never hardcode it (plan.md Rule 6). Phase 3 turns this into CRUD and Phase 9
 * persists it.
 */
const seedCategories: Category[] = [
  { id: "cat-general", name: "General", icon: "🏠", order: 0 },
  { id: "cat-work", name: "Work", icon: "💼", order: 1 },
  { id: "cat-study", name: "Study", icon: "📚", order: 2 },
  { id: "cat-music", name: "Music", icon: "🎵", order: 3 },
  { id: "cat-dev", name: "Dev", icon: "⌨️", order: 4 },
];

const seedWorkspaces: Workspace[] = [
  { id: "ws-home", name: "Home", icon: "🏠", categoryId: "cat-general", order: 0, widgets: [], shortcuts: [] },
  { id: "ws-work", name: "Work", icon: "💼", categoryId: "cat-work", order: 1, widgets: [], shortcuts: [] },
  { id: "ws-study", name: "Study", icon: "📚", categoryId: "cat-study", order: 2, widgets: [], shortcuts: [] },
  { id: "ws-music", name: "Music", icon: "🎵", categoryId: "cat-music", order: 3, widgets: [], shortcuts: [] },
  { id: "ws-dev", name: "Dev", icon: "⌨️", categoryId: "cat-dev", order: 4, widgets: [], shortcuts: [] },
];

interface WorkspaceState {
  categories: Category[];
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  categories: seedCategories,
  workspaces: seedWorkspaces,
  activeWorkspaceId: seedWorkspaces[0].id,
  setActiveWorkspace: (id) => set({ activeWorkspaceId: id }),
}));

export function selectActiveWorkspace(state: WorkspaceState): Workspace {
  return state.workspaces.find((workspace) => workspace.id === state.activeWorkspaceId) ?? state.workspaces[0];
}

export function useActiveWorkspace(): Workspace {
  return useWorkspaceStore(selectActiveWorkspace);
}
