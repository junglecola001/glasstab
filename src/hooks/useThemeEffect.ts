import { useEffect } from "react";

import { hexToHslTriplet } from "@/lib/color";
import { useSettingsStore } from "@/store/settingsStore";

/**
 * Pushes settings onto <html> as CSS variables and data attributes. This is the only
 * bridge between the stores and the Glass Design System, which keeps the stylesheet
 * declarative: one slider in Appearance changes every glass surface at once.
 */
export function useThemeEffect() {
  const settings = useSettingsStore((state) => state.settings);
  const { theme } = settings;

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      root.classList.toggle("dark", dark);
      root.dataset.theme = dark ? "dark" : "light";
      root.style.setProperty("color-scheme", dark ? "dark" : "light");
    };

    applyTheme();

    if (theme !== "system") return;

    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--glass-blur-setting", `${settings.blurAmount}px`);
    root.style.setProperty("--glass-opacity-setting", String(settings.glassOpacity));
    root.style.setProperty("--glass-border-setting", String(settings.borderOpacity));
    root.style.setProperty("--glass-highlight-setting", String(settings.highlightOpacity));
    root.style.setProperty("--glass-shadow-setting", String(settings.shadowOpacity));

    root.style.setProperty("--wallpaper-blur", `${settings.wallpaperBlur}px`);
    root.style.setProperty("--wallpaper-brightness", String(settings.wallpaperBrightness));
    root.style.setProperty("--wallpaper-saturation", String(settings.wallpaperSaturation));
    root.style.setProperty("--overlay-setting", String(settings.overlayOpacity));

    const accent = hexToHslTriplet(settings.accentColor);
    if (accent) root.style.setProperty("--accent", accent);

    root.dataset.motion = settings.animations ? "on" : "off";
    root.dataset.wallpaper = settings.wallpaper;
  }, [settings]);
}
