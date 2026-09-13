import * as React from "react";

import { cn } from "@/lib/utils";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  function Label({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={cn(
          "select-none text-[13px] font-medium text-[hsl(var(--foreground))] peer-disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );
  },
);
