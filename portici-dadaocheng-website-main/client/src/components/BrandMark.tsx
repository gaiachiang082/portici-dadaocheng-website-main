import { cn } from "@/lib/utils";

/** `ink` = mark as exported (dark on transparent). `paper` = inverted for dark backgrounds (nav hero, footer). */
export type BrandMarkTone = "ink" | "paper";

export type BrandMarkProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  tone?: BrandMarkTone;
  /** Thicker-looking strokes via stacked drop-shadows (raster mark; use on nav / hero). */
  emphasis?: boolean;
};

/** Simulate heavier line weight on embedded raster logo */
const EMPHASIS_INK =
  "drop-shadow(0 0 0.5px #494435) drop-shadow(0 0 0.5px #494435) drop-shadow(0 0 1px rgba(73,68,53,0.22))";
const EMPHASIS_PAPER =
  "drop-shadow(0 0 1px rgba(255,255,255,0.92)) drop-shadow(0 0 2px rgba(255,255,255,0.55))";

function buildFilter(tone: BrandMarkTone, emphasis: boolean): string | undefined {
  const parts: string[] = [];
  if (tone === "paper") parts.push("brightness(0) invert(1)");
  if (emphasis) parts.push(tone === "paper" ? EMPHASIS_PAPER : EMPHASIS_INK);
  return parts.length ? parts.join(" ") : undefined;
}

/**
 * Official brand mark from `/brand/logo-official.svg` (designer export — correct proportions).
 * Raster-in-SVG; color is controlled with `tone` + `emphasis`, not `text-*` classes.
 */
export function BrandMark({ className, tone = "ink", emphasis = false, style, ...props }: BrandMarkProps) {
  const filter = buildFilter(tone, emphasis);
  return (
    <img
      src="/brand/logo-official.svg"
      alt=""
      role="presentation"
      aria-hidden
      decoding="async"
      className={cn("object-contain object-left shrink-0", className)}
      style={{ ...(filter ? { filter } : {}), ...style }}
      {...props}
    />
  );
}
