export type ThemeMode = "system" | "light" | "dark";

export type SearchEngineId = "google" | "bing" | "duckduckgo" | "brave" | "custom";

export type WallpaperId = "aurora" | "sunset" | "graphite";

/**
 * User settings (plan.md §3). Every field that maps to a CSS variable is written onto
 * <html> by `useThemeEffect`, so changes apply without a reload.
 */
export interface AppSettings {
  theme: ThemeMode;
  accentColor: string;
  animations: boolean;

  /** Glass surface controls, in px / 0–1. */
  blurAmount: number;
  glassOpacity: number;
  borderOpacity: number;
  highlightOpacity: number;
  shadowOpacity: number;

  /** Wallpaper layer controls (plan.md §20). */
  wallpaper: WallpaperId;
  wallpaperBlur: number;
  wallpaperBrightness: number;
  wallpaperSaturation: number;
  overlayOpacity: number;

  /** Clock presentation. */
  use24HourClock: boolean;
  showSeconds: boolean;

  /** Search (plan.md §25). */
  searchEngine: SearchEngineId;
  customSearchUrl: string;
}
