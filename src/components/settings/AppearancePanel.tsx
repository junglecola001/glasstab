import { Palette } from "lucide-react";
import type { ReactNode } from "react";

import {
  GlassButton,
  GlassDropdown,
  GlassDropdownContent,
  GlassDropdownItem,
  GlassDropdownLabel,
  GlassDropdownTrigger,
  GlassPopover,
  GlassPopoverContent,
  GlassPopoverTrigger,
} from "@/components/glass";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/store/settingsStore";
import { useUiStore } from "@/store/uiStore";
import type { ThemeMode, WallpaperId } from "@/types";

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const WALLPAPERS: { value: WallpaperId; label: string }[] = [
  { value: "aurora", label: "Aurora" },
  { value: "sunset", label: "Sunset" },
  { value: "graphite", label: "Graphite" },
];

const ACCENTS = ["#0a84ff", "#a855f7", "#ec4899", "#22c55e", "#f97316"];

/**
 * Live control surface for the Glass Design System. It exists so every token can be
 * judged on a real wallpaper instead of in a storybook; the full Settings page
 * (plan.md §26) replaces it in Phase 8.
 */
export function AppearancePanel() {
  const settings = useSettingsStore((state) => state.settings);
  const update = useSettingsStore((state) => state.update);
  const reset = useSettingsStore((state) => state.reset);
  const open = useUiStore((state) => state.appearancePanelOpen);
  const setOpen = useUiStore((state) => state.setAppearancePanelOpen);

  const activeWallpaper = WALLPAPERS.find((item) => item.value === settings.wallpaper);

  return (
    <GlassPopover open={open} onOpenChange={setOpen}>
      <GlassPopoverTrigger asChild>
        <GlassButton size="icon" radius="full" aria-label="Appearance" level="1">
          <Palette />
        </GlassButton>
      </GlassPopoverTrigger>

      <GlassPopoverContent className="no-scrollbar max-h-[min(78vh,620px)] w-[320px] overflow-y-auto p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold tracking-tight">Appearance</h2>
          <button
            type="button"
            onClick={reset}
            className="rounded-lg px-2 py-1 text-[12px] font-medium text-[hsl(var(--muted-foreground))] outline-none transition-colors hover:bg-[hsl(var(--foreground)/0.07)] hover:text-[hsl(var(--foreground))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            Reset
          </button>
        </div>

        <div className="mt-3.5 flex flex-col gap-3.5">
          <Field label="Theme">
            <div className="glass-solid glass-1 flex rounded-full p-0.5">
              {THEME_OPTIONS.map((option) => {
                const active = settings.theme === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => update({ theme: option.value })}
                    aria-pressed={active}
                    className={cn(
                      "flex-1 rounded-full px-2 py-1 text-[12px] font-medium outline-none transition-colors duration-200 ease-out-soft focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
                      active
                        ? "glass-solid glass-3 text-[hsl(var(--foreground))]"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Accent">
            <div className="flex items-center gap-2">
              {ACCENTS.map((color) => {
                const active = settings.accentColor.toLowerCase() === color;
                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Accent ${color}`}
                    aria-pressed={active}
                    onClick={() => update({ accentColor: color })}
                    style={{ backgroundColor: color }}
                    className={cn(
                      "size-6 rounded-full outline-none transition-transform duration-150 ease-out-soft hover:scale-110 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
                      active && "ring-2 ring-[hsl(var(--foreground)/0.45)] ring-offset-0",
                    )}
                  />
                );
              })}
            </div>
          </Field>

          <Field label="Wallpaper">
            <GlassDropdown>
              <GlassDropdownTrigger asChild>
                <button
                  type="button"
                  className="glass-solid glass-1 flex h-8 w-full items-center justify-between rounded-[10px] px-3 text-[13px] outline-none transition-colors hover:bg-[hsl(var(--foreground)/0.06)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                >
                  {activeWallpaper?.label ?? "Custom"}
                </button>
              </GlassDropdownTrigger>
              <GlassDropdownContent align="start">
                <GlassDropdownLabel>Wallpaper</GlassDropdownLabel>
                {WALLPAPERS.map((item) => (
                  <GlassDropdownItem
                    key={item.value}
                    onSelect={() => update({ wallpaper: item.value })}
                  >
                    {item.label}
                  </GlassDropdownItem>
                ))}
              </GlassDropdownContent>
            </GlassDropdown>
          </Field>

          <Separator className="my-0.5" />

          <SliderRow
            label="Blur"
            value={settings.blurAmount}
            min={0}
            max={48}
            step={1}
            format={(value) => `${Math.round(value)}px`}
            onChange={(value) => update({ blurAmount: value })}
          />
          <SliderRow
            label="Opacity"
            value={settings.glassOpacity}
            min={0.1}
            max={0.95}
            step={0.01}
            format={(value) => `${Math.round(value * 100)}%`}
            onChange={(value) => update({ glassOpacity: value })}
          />
          <SliderRow
            label="Border"
            value={settings.borderOpacity}
            min={0}
            max={1}
            step={0.02}
            format={(value) => `${Math.round(value * 100)}%`}
            onChange={(value) => update({ borderOpacity: value })}
          />
          <SliderRow
            label="Shadow"
            value={settings.shadowOpacity}
            min={0}
            max={0.6}
            step={0.01}
            format={(value) => `${Math.round((value / 0.6) * 100)}%`}
            onChange={(value) => update({ shadowOpacity: value })}
          />

          <Separator className="my-0.5" />

          <Field label="Clock">
            <div className="glass-solid glass-1 flex rounded-full p-0.5">
              {[
                { value: true, label: "24-hour" },
                { value: false, label: "12-hour" },
              ].map((option) => {
                const active = settings.use24HourClock === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => update({ use24HourClock: option.value })}
                    aria-pressed={active}
                    className={cn(
                      "flex-1 rounded-full px-2 py-1 text-[12px] font-medium outline-none transition-colors duration-200 ease-out-soft focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
                      active
                        ? "glass-solid glass-3 text-[hsl(var(--foreground))]"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </Field>

          <SwitchRow
            id="show-seconds"
            label="Show seconds"
            checked={settings.showSeconds}
            onChange={(checked) => update({ showSeconds: checked })}
          />
          <SwitchRow
            id="animations"
            label="Animations"
            checked={settings.animations}
            onChange={(checked) => update({ animations: checked })}
          />
        </div>
      </GlassPopoverContent>
    </GlassPopover>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <Label className="text-[12px] text-[hsl(var(--muted-foreground))]">{label}</Label>
        {hint ? (
          <span className="text-[11px] text-[hsl(var(--muted-foreground))]">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <Label className="text-[12px] text-[hsl(var(--muted-foreground))]">{label}</Label>
        <span className="text-[11px] tabular-nums text-[hsl(var(--muted-foreground))]">
          {format(value)}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([next]) => onChange(next ?? value)}
        aria-label={label}
      />
    </div>
  );
}

function SwitchRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-[12px]">
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
