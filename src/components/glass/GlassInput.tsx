import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { glassClasses, type GlassOptions } from "./glass-variants";

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Pick<GlassOptions, "level" | "radius"> {}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(function GlassInput(
  { className, level = "1", radius = "sm", ...props },
  ref,
) {
  return (
    <Input
      ref={ref}
      className={cn(
        glassClasses({ level, surface: "solid", radius }),
        "px-3 focus-visible:border-[hsl(var(--ring))] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring)/0.5)]",
        className,
      )}
      {...props}
    />
  );
});
