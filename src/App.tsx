import { MotionConfig } from "framer-motion";

import { DynamicIsland } from "@/components/dynamic-island/DynamicIsland";
import { BackgroundOverlay } from "@/components/layout/BackgroundOverlay";
import { DesktopCanvas } from "@/components/layout/DesktopCanvas";
import { Greeting } from "@/components/layout/Greeting";
import { Wallpaper } from "@/components/layout/Wallpaper";
import { CategoryBar } from "@/components/navigation/CategoryBar";
import { AppearancePanel } from "@/components/settings/AppearancePanel";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { useSettingsStore } from "@/store/settingsStore";

/**
 * Layer order follows plan.md §20: wallpaper → background overlay → glass UI.
 * The shell renders navigation, the Dynamic Island, the greeting and the desktop
 * canvas; widgets arrive in Phase 4.
 */
export default function App() {
  useThemeEffect();

  const animations = useSettingsStore((state) => state.settings.animations);

  return (
    // "always" keeps opacity transitions but drops transform/layout animation, so the
    // in-app Animations switch and the OS reduce-motion setting behave the same way
    <MotionConfig reducedMotion={animations ? "never" : "always"}>
      <Wallpaper />
      <BackgroundOverlay />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <header className="flex items-center gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
          <div className="hidden flex-1 sm:block" />
          <CategoryBar />
          <div className="flex flex-1 justify-end">
            <AppearancePanel />
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col items-center px-6 pb-9 pt-8">
          <DynamicIsland />
          <div className="mt-[6vh] shrink-0">
            <Greeting />
          </div>
          <div className="mt-7 flex min-h-0 w-full flex-1">
            <DesktopCanvas />
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
