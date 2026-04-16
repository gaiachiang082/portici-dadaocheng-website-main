import { useState } from "react";

/**
 * ArticleIllustration
 * ──────────────────────────────────────────────────────────────────────
 * Decorative hand-drawn accent shown next to an article.
 *
 * Source:
 *   /public/illustrations/{slug}-illo.png  — plain <img src>.
 *   If the asset is missing we silently unmount (no broken-image icon,
 *   no hidden layout box, just a natural network 404 in devtools).
 *
 * Motion:
 *   Tagged with `data-parallax` so `GlobalScrollEffects` floats it on
 *   scroll with its own offset, independent from the page's main
 *   content.
 *
 * Layout:
 *   Positioning is intentionally delegated to the caller via `className`
 *   — this component only concerns itself with the img pixels and its
 *   pointer/selection behaviour. Add e.g. `sticky top-32` or `absolute
 *   top-0 right-0` from the outside depending on the container.
 *
 * Accessibility:
 *   Purely decorative — wrapper is `aria-hidden`, `pointer-events-none`,
 *   `select-none`, so it never competes with real content for focus,
 *   clicks, or text selection.
 */
export function ArticleIllustration({
  slug,
  title,
  /** Tailwind utility classes applied to the wrapper (position, size, etc.). */
  className = "",
  parallax = 30,
  /** Tailwind utility classes applied to the <img> itself (size overrides, rotation…). */
  imgClassName = "w-[clamp(80px,9vw,120px)]",
}: {
  slug: string;
  title?: string;
  className?: string;
  parallax?: number;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const safeSlug = slug.trim();
  if (!safeSlug || failed) return null;

  const src = `/illustrations/${safeSlug}-illo.png`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
    >
      <img
        src={src}
        alt={title ? `${title} — illustrazione` : ""}
        data-parallax={String(parallax)}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`block h-auto drop-shadow-[0_6px_14px_color-mix(in_srgb,var(--forest-deep)_18%,transparent)] ${imgClassName}`}
      />
    </div>
  );
}

export default ArticleIllustration;
