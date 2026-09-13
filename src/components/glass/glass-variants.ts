import { cn } from "@/lib/utils";

/**
 * The Glass Design System's public vocabulary. Components pick a level, a surface kind
 * and a radius; the actual blur / opacity / border / shadow values live in
 * `src/styles/globals.css` (plan.md §10, Rule 4).
 */

/** Translucency level, thinnest (1) to most opaque (modal). */
export type GlassLevel = "1" | "2" | "3" | "floating" | "modal";

/**
 * `blur` applies backdrop-filter — use it for a surface sitting directly on the
 * wallpaper. `solid` is the same fill without blur — use it for anything nested inside
 * another glass surface, where a second backdrop-filter only costs GPU time.
 */
export type GlassSurface = "blur" | "solid";

export type GlassRadius = "sm" | "md" | "lg" | "full";

export interface GlassOptions {
  level?: GlassLevel;
  surface?: GlassSurface;
  radius?: GlassRadius;
  interactive?: boolean;
}

const levelClass: Record<GlassLevel, string> = {
  "1": "glass-1",
  "2": "glass-2",
  "3": "glass-3",
  floating: "glass-floating",
  modal: "glass-modal",
};

const surfaceClass: Record<GlassSurface, string> = {
  blur: "glass",
  solid: "glass-solid",
};

const radiusClass: Record<GlassRadius, string> = {
  sm: "rounded-glass-sm",
  md: "rounded-glass",
  lg: "rounded-glass-lg",
  full: "rounded-full",
};

export function glassClasses({
  level = "2",
  surface = "blur",
  radius = "md",
  interactive = false,
}: GlassOptions = {}) {
  return cn(
    surfaceClass[surface],
    levelClass[level],
    radiusClass[radius],
    interactive && "glass-interactive",
  );
}
