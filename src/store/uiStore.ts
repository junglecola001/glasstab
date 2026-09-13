import { create } from "zustand";

interface UiState {
  /** Dynamic Island expanded/collapsed (plan.md §13). */
  islandExpanded: boolean;
  appearancePanelOpen: boolean;
  setIslandExpanded: (expanded: boolean) => void;
  toggleIslandExpanded: () => void;
  setAppearancePanelOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  islandExpanded: false,
  appearancePanelOpen: false,
  setIslandExpanded: (expanded) => set({ islandExpanded: expanded }),
  toggleIslandExpanded: () => set((state) => ({ islandExpanded: !state.islandExpanded })),
  setAppearancePanelOpen: (open) => set({ appearancePanelOpen: open }),
}));
