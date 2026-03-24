import { cn } from "@/lib/utils";

/** `ink` = mark as exported (dark on transparent). `paper` = inverted for dark backgrounds (nav hero, footer). */
export type BrandMarkTone = "ink" | "paper";

export type BrandMarkProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  tone?: BrandMarkTone;
};

const toneFilter: Record<BrandMarkTone, string | undefined> = {
  ink: undefined,
  paper: "brightness(0) invert(1)",
};

/**
 * Official brand mark from `/brand/logo-official.svg` (designer export — correct proportions).
 * Raster-in-SVG; color is controlled with `tone` + optional `style.filter`, not `text-*` classes.
 */
export function BrandMark({ className, tone = "ink", style, ...props }: BrandMarkProps) {
  const f = toneFilter[tone];
  return (
    <img
      src="/brand/logo-official.svg"
      alt=""
      role="presentation"
      aria-hidden
      decoding="async"
      className={cn("object-contain object-left shrink-0", className)}
      style={{ ...(f ? { filter: f } : {}), ...style }}
      {...props}
    />
  );
}
