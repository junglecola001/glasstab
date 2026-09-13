import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppSettings } from "@/types";

export const defaultSettings: AppSettings = {
  theme: "system",
  accentColor: "#0a84ff",
  animations: true,

  blurAmount: 26,
  glassOpacity: 0.5,
  borderOpacity: 0.5,
  highlightOpacity: 0.5,
  shadowOpacity: 0.18,

  wallpaper: "aurora",
  wallpaperBlur: 0,
  wallpaperBrightness: 1,
  wallpaperSaturation: 1,
  overlayOpacity: 0.06,

  use24HourClock: true,
  showSeconds: false,

  searchEngine: "google",
  customSearchUrl: "",
};

interface SettingsState {
  settings: AppSettings;
  update: (patch: Partial<AppSettings>) => void;
  reset: () => void;
}

/**
 * Persisted to localStorage rather than IndexedDB because index.html has to read it
 * synchronously before first paint to avoid a theme flash. The wider workspace data
 * moves to IndexedDB in Phase 9.
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      update: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),
      reset: () => set({ settings: defaultSettings }),
    }),
    {
      name: "glasstab:settings",
      version: 1,
    },
  ),
);
