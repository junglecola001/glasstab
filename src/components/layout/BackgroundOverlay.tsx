/**
 * Sits between the wallpaper and the glass UI so text stays readable on any
 * background (plan.md §20): a flat scrim, a vertical scrim that deepens where the
 * navigation bar and the desktop sit, and a whisper of grain so large blurred
 * surfaces don't look like flat plastic.
 */
export function BackgroundOverlay() {
  return (
    <>
      <div className="wallpaper-overlay" aria-hidden="true" />
      <div className="wallpaper-grain" aria-hidden="true" />
    </>
  );
}
