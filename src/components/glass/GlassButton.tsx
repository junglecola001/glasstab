import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { glassClasses, type GlassOptions } from "./glass-variants";

export interface GlassButtonProps extends ButtonProps, GlassOptions {}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
  {
    className,
    level = "1",
    surface = "blur",
    radius = "md",
    interactive = true,
    variant = "ghost",
    ...props
  },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      className={cn(glassClasses({ level, surface, radius, interactive }), className)}
      {...props}
    />
  );
});
