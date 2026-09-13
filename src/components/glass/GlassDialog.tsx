import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { glassClasses } from "./glass-variants";

export const GlassDialog = Dialog;
export const GlassDialogTrigger = DialogTrigger;
export const GlassDialogClose = DialogClose;
export const GlassDialogTitle = DialogTitle;
export const GlassDialogDescription = DialogDescription;

export const GlassDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(function GlassDialogContent({ className, ...props }, ref) {
  return (
    <DialogContent
      ref={ref}
      className={cn(glassClasses({ level: "modal", radius: "lg" }), className)}
      {...props}
    />
  );
});

export const GlassDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function GlassDialogFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
});
