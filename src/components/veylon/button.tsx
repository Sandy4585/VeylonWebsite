import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const veylonButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-500 text-navy-900 hover:bg-amber-600 focus-visible:ring-offset-slate-50",
        secondary:
          "bg-navy-900 text-white hover:bg-navy-700 focus-visible:ring-navy-500/40",
        ghost:
          "text-navy-900 hover:bg-navy-50 focus-visible:ring-navy-500/30",
        outline:
          "border border-navy-900 bg-transparent text-navy-900 hover:bg-navy-50 focus-visible:ring-navy-500/30",
      },
      size: {
        sm: "h-8 gap-1.5 rounded-md px-3 text-sm has-[>svg]:px-2.5",
        md: "h-10 gap-2 rounded-md px-4 text-sm has-[>svg]:px-3",
        lg: "h-11 gap-2 rounded-md px-6 text-base has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type VeylonButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof veylonButtonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: VeylonButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="veylon-button"
      className={cn(veylonButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, veylonButtonVariants };
