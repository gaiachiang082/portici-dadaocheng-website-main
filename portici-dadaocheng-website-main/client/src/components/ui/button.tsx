import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-medium uppercase tracking-[0.08em] transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/28 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [font-family:var(--font-mono)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary/90 hover:bg-primary/78",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive hover:bg-destructive/88 focus-visible:ring-destructive/22 dark:bg-destructive/58",
        outline:
          "border border-primary bg-transparent text-primary shadow-none hover:bg-muted/80 dark:border-primary dark:text-primary dark:hover:bg-muted/50",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent hover:bg-secondary/85",
        ghost: "border border-transparent hover:bg-muted/90 dark:hover:bg-muted/50",
        link: "border-0 text-primary underline-offset-4 hover:underline decoration-[color-mix(in_srgb,var(--editorial-mark)_70%,transparent)]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 text-[11px] has-[>svg]:px-2.5",
        lg: "h-10 px-6 text-sm has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // Opt *prominent* buttons into the global magnetic effect. We only tag
  // `size="lg"` here — that size is reserved for hero/page-level CTAs, where
  // magnetic draw reads as intentional. Smaller sizes, link/ghost/icon
  // variants stay neutral to avoid noisy jitter on dense toolbars or inside
  // form rows. Callers may still force the effect on/off via the
  // `data-magnetic` prop on individual buttons.
  const isMagneticEligible =
    size === "lg" && variant !== "link" && variant !== "ghost";
  const propsWithMagnet =
    isMagneticEligible && (props as Record<string, unknown>)["data-magnetic"] === undefined
      ? { "data-magnetic": "", "data-magnetic-strength": "0.3", ...props }
      : props;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...propsWithMagnet}
    />
  );
}

export { Button, buttonVariants };
