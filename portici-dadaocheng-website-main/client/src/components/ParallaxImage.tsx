import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  /** Image source. */
  src: string;
  alt: string;
  /** Extra classes on the overflow-clipping wrapper. */
  className?: string;
  /** Extra classes applied to the actual <img>. */
  imgClassName?: string;
  /**
   * Total pixel range of parallax movement. The image travels from
   * `+offset` when entering the viewport to `-offset` when leaving.
   * Keep this subtle — 40–80px reads as refined, anything larger
   * starts to feel gimmicky.
   */
  offset?: number;
  /** Optional overlay rendered above the image (e.g. gradient vignette). */
  overlay?: React.ReactNode;
  /** aspect-ratio sugar; e.g. "4 / 5". Combine with object-cover in imgClassName. */
  aspect?: string;
  /** Loading hint — defaults to "lazy" for non-critical images. */
  loading?: "eager" | "lazy";
  /**
   * Priority Hint for the fetch. Set to "high" on above-the-fold LCP
   * images so the browser schedules their download ahead of later
   * resources (React 19 lowercases to `fetchpriority` in the DOM).
   */
  fetchPriority?: "high" | "low" | "auto";
  /** Intrinsic width of the source asset — used with `height` to reserve
   *  aspect ratio before bitmap is decoded (prevents CLS). */
  width?: number;
  /** Intrinsic height of the source asset. Pair with `width`. */
  height?: number;
};

/**
 * ParallaxImage
 *
 * Couples an image's vertical position to scroll progress for a gentle
 * parallax effect. Uses framer-motion's `useScroll` against the wrapping
 * element so the effect is localised (no global scroll listener).
 *
 * Implementation notes:
 *   - Image is rendered ~8% taller than the wrapper and shifted by up to
 *     `offset` px, so the movement never exposes the background edge.
 *   - Wrapper clips via `overflow-hidden`.
 *   - `prefers-reduced-motion` disables the translation entirely.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  offset = 60,
  overlay,
  aspect,
  loading = "lazy",
  fetchPriority,
  width,
  height,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // From "image bottom hits viewport bottom" to "image top hits viewport top".
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [offset, -offset],
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        decoding={loading === "eager" ? "sync" : "async"}
        className={`absolute inset-0 h-[112%] w-full will-change-transform ${imgClassName ?? ""}`}
        style={{ y, top: "-6%" }}
      />
      {overlay}
    </div>
  );
}

export default ParallaxImage;
