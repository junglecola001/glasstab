import * as React from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { glassClasses } from "./glass-variants";

export const GlassPopover = Popover;
export const GlassPopoverTrigger = PopoverTrigger;
export const GlassPopoverAnchor = PopoverAnchor;
export const GlassPopoverClose = PopoverClose;

export const GlassPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(function GlassPopoverContent({ className, ...props }, ref) {
  return (
    <PopoverContent
      ref={ref}
      className={cn(glassClasses({ level: "floating", radius: "lg" }), className)}
      {...props}
    />
  );
});
