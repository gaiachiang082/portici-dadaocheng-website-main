import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * SmoothImage
 * ──────────────────────────────────────────────────────────────────────
 * Drop-in replacement for a plain <img> that fades its contents in
 * once the bitmap is actually decoded.
 *
 * Before load:  opacity-0 — the parent's background (typically the
 *               site's `bg-muted` paper tone) shows through as a soft
 *               earth-coloured placeholder.
 * After load:   opacity-100 with `transition-opacity duration-700
 *               ease-in-out` for a slow, editorial fade.
 *
 * It also covers two subtle browser cases:
 *
 *   1. **Cache hit**: if the image was already in the cache when the
 *      component mounts, `onLoad` is never fired. We check
 *      `img.complete && img.naturalWidth > 0` in a `useEffect` and
 *      flip to loaded immediately, avoiding a permanent blank frame.
 *
 *   2. **onError**: treated the same as "done loading" so the element
 *      doesn't stay invisible when the asset 404s — the caller can
 *      still own the error UX via `onError`.
 *
 * All other <img> props pass through untouched, so you can keep using
 * loading="lazy", decoding="async", data-parallax, alt, etc. as before.
 */
export function SmoothImage({
  className = "",
  onLoad,
  onError,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [rest.src, rest.srcSet]);

  return (
    <img
      ref={ref}
      {...rest}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true);
        onError?.(e);
      }}
      className={`transition-opacity duration-700 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}

export default SmoothImage;
