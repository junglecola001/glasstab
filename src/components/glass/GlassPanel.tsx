import * as React from "react";

import { cn } from "@/lib/utils";
import { glassClasses, type GlassOptions } from "./glass-variants";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement>, GlassOptions {
  /** Apply the standard content padding. */
  padded?: boolean;
}

/**
 * A larger grouping surface than GlassCard — section containers, settings pages,
 * dialog bodies.
 */
export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(function GlassPanel(
  {
    className,
    level = "2",
    surface = "blur",
    radius = "lg",
    interactive = false,
    padded = true,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        glassClasses({ level, surface, radius, interactive }),
        padded && "p-5",
        className,
      )}
      {...props}
    />
  );
});
