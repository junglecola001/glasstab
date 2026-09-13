import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// exported so future surfaces can reuse the button shell without re-declaring variants
// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-medium outline-none transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out-soft focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.88)]",
        accent:
          "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:bg-[hsl(var(--accent)/0.88)]",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.7)]",
        outline:
          "border border-[hsl(var(--border))] hover:bg-[hsl(var(--foreground)/0.05)]",
        ghost: "hover:bg-[hsl(var(--foreground)/0.07)]",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.88)]",
      },
      size: {
        sm: "h-8 rounded-[10px] px-3 text-[13px]",
        md: "h-9 rounded-xl px-4 text-sm",
        lg: "h-11 rounded-2xl px-5 text-[15px]",
        icon: "size-9 rounded-xl",
        "icon-sm": "size-7 rounded-[10px] [&_svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = "button", asChild = false, ...props },
  ref,
) {
  const Comp: React.ElementType = asChild ? Slot : "button";

  return (
    <Comp ref={ref} type={asChild ? undefined : type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
});
