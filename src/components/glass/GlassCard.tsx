import * as React from "react";

import { cn } from "@/lib/utils";
import { glassClasses, type GlassOptions } from "./glass-variants";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement>, GlassOptions {}

/**
 * The default container for every widget and panel. Owns background, blur, border,
 * shadow, hover and press feedback so no caller re-implements glass (plan.md §11).
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { className, level = "2", surface = "blur", radius = "md", interactive = false, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(glassClasses({ level, surface, radius, interactive }), className)}
      {...props}
    />
  );
});
