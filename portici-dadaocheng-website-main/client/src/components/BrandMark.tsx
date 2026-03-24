import { cn } from "@/lib/utils";

type BrandMarkProps = React.SVGProps<SVGSVGElement> & {
  /** Accessible name when used alone as the brand control */
  title?: string;
};

/**
 * Portici mark — official proportions: short top bar, shallow wide arc, tall portal (flat/butt caps).
 * Strokes use `currentColor` → pair with `text-[var(--ink)]`, `text-[var(--paper)]`, etc.
 */
export function BrandMark({ className, title, ...props }: BrandMarkProps) {
  const sw = 3.25;
  return (
    <svg
      viewBox="0 0 56 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <line
        x1="22.5"
        y1="11"
        x2="33.5"
        y2="11"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="butt"
      />
      <path
        d="M 9 30 Q 28 23.5 47 30"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="butt"
        fill="none"
      />
      <path
        d="M 17.625 100 L 17.625 60.25 A 10.375 10.375 0 0 1 38.375 60.25 L 38.375 100"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
