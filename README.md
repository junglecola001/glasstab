# GlassTab

A macOS / Liquid Glass flavoured new tab page: multiple desktops, category navigation,
a Dynamic Island status centre and pluggable widgets.

> **Status:** Phase 1 — Glass Design System + minimal new tab shell. No widgets yet.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Radix UI (shadcn/ui style) · Framer Motion ·
Zustand · Lucide

## Layout

```
extension/            manifest.json — copied into dist/ at build time
src/
  components/
    glass/            GlassCard, GlassPanel, GlassButton, GlassInput, GlassDialog, …
    ui/               unstyled Radix primitives the glass layer builds on
    layout/           wallpaper, background overlay, greeting, desktop canvas
    navigation/       CategoryBar
    dynamic-island/   DynamicIsland
    settings/         AppearancePanel
  hooks/              theme/glass token sync, clock
  lib/                cn(), id, time and colour helpers
  store/              settingsStore, workspaceStore, uiStore
  styles/globals.css  the whole Glass Design System (single source of truth)
  types/              AppSettings, Workspace, Category, WidgetDefinition, Shortcut
```

## Commands

```bash
npm install
npm run dev        # plain browser dev server
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # typecheck + vite build → dist/ (loadable extension)
```

## Loading the extension

`npm run build` produces `dist/` containing `index.html` plus the MV3 `manifest.json`,
which is already listed in the GitHub Actions build artifact **glasstab-extension**.

1. Download the artifact and unzip it.
2. Open `chrome://extensions` (Edge: `edge://extensions`).
3. Enable **Developer mode**, choose **Load unpacked**, and select the `dist` folder.
4. Open a new tab.

## Design rules

See `plan.md`. The two that matter most while writing code:

- Every translucent surface comes from the Glass Design System — `backdrop-filter` is
  declared only in `src/styles/globals.css`, and components consume `glass-1 … glass-modal`.
- Workspace, category, widget and shortcut data comes from the stores, never from
  literals inside components.
