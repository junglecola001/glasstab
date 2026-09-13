/**
 * Converts a `#rgb` / `#rrggbb` value into the `"H S% L%"` triplet shape the theme
 * variables use (`--accent`), so an accent picked in settings can drive `hsl(var(--accent))`.
 */
export function hexToHslTriplet(hex: string): string | null {
  const value = hex.trim().replace(/^#/, "");

  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return null;

  const full =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (max !== min) {
    const delta = max - min;
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === r) hue = (g - b) / delta + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;

    hue /= 6;
  }

  return `${Math.round(hue * 360)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}
