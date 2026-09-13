import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(function Slider({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center py-1.5 data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[hsl(var(--foreground)/0.14)]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[hsl(var(--accent))]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-4 rounded-full border border-[hsl(var(--foreground)/0.08)] bg-white shadow-[0_2px_6px_rgb(0_0_0/0.28)] outline-none transition-transform duration-150 ease-out-soft hover:scale-110 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-0 active:scale-105" />
    </SliderPrimitive.Root>
  );
});
