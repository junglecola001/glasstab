import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { glassClasses } from "./glass-variants";

export const GlassDropdown = DropdownMenu;
export const GlassDropdownTrigger = DropdownMenuTrigger;
export const GlassDropdownGroup = DropdownMenuGroup;
export const GlassDropdownItem = DropdownMenuItem;
export const GlassDropdownCheckboxItem = DropdownMenuCheckboxItem;
export const GlassDropdownRadioGroup = DropdownMenuRadioGroup;
export const GlassDropdownRadioItem = DropdownMenuRadioItem;
export const GlassDropdownLabel = DropdownMenuLabel;
export const GlassDropdownSeparator = DropdownMenuSeparator;
export const GlassDropdownShortcut = DropdownMenuShortcut;
export const GlassDropdownSub = DropdownMenuSub;
export const GlassDropdownSubTrigger = DropdownMenuSubTrigger;

export const GlassDropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
>(function GlassDropdownContent({ className, ...props }, ref) {
  return (
    <DropdownMenuContent
      ref={ref}
      className={cn(glassClasses({ level: "floating", radius: "lg" }), className)}
      {...props}
    />
  );
});

export const GlassDropdownSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuSubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent>
>(function GlassDropdownSubContent({ className, ...props }, ref) {
  return (
    <DropdownMenuSubContent
      ref={ref}
      className={cn(glassClasses({ level: "floating", radius: "md" }), className)}
      {...props}
    />
  );
});
