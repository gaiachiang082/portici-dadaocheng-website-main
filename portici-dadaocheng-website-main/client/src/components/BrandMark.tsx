import { cn } from "@/lib/utils";

type BrandMarkProps = React.SVGProps<SVGSVGElement> & {
  /** Accessible name when used alone as the brand control */
  title?: string;
};

/**
 * Portici mark — three-stroke arch (top dash, shallow arc, portal).
 * Strokes use `currentColor` → pair with `text-[var(--ink)]`, `text-[var(--paper)]`, etc.
 */
export function BrandMark({ className, title, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <line x1="26" y1="10" x2="38" y2="10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M 12 28 Q 32 19 52 28"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 18 88 L 18 46 A 14 14 0 0 1 46 46 L 46 88"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
