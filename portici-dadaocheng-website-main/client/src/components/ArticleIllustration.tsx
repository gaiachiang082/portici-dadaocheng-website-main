import { useState } from "react";

/**
 * ArticleIllustration
 * ──────────────────────────────────────────────────────────────────────
 * Decorative hand-drawn accent shown next to an article preview.
 *
 * Source:
 *   /public/illustrations/{slug}-illo.png  — loaded via plain <img src>.
 *   If the asset is missing we silently unmount (no broken-image icon,
 *   no console noise beyond the natural 404).
 *
 * Motion:
 *   Tagged with `data-parallax` so `GlobalScrollEffects` floats it on
 *   scroll with an offset different from the card content, giving a
 *   light "stuck on the page" feel.
 *
 * Layout:
 *   `absolute` positioning on md+ (magazine-style accent in a corner),
 *   hidden on mobile to keep dense list views readable. The wrapper
 *   itself is `pointer-events-none` so the image never eats clicks
 *   destined for the underlying link / card.
 */
export function ArticleIllustration({
  slug,
  title,
  /** Tailwind utility classes for positioning / sizing the wrapper. */
  className = "",
  parallax = 30,
}: {
  slug: string;
  title?: string;
  className?: string;
  parallax?: number;
}) {
  const [failed, setFailed] = useState(false);
  const safeSlug = slug.trim();
  if (!safeSlug || failed) return null;

  const src = `/illustrations/${safeSlug}-illo.png`;

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none hidden md:block absolute ${className}`}
    >
      <img
        src={src}
        alt={title ? `${title} — illustrazione` : ""}
        data-parallax={String(parallax)}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="block h-auto w-[clamp(80px,9vw,120px)] drop-shadow-[0_6px_14px_color-mix(in_srgb,var(--forest-deep)_18%,transparent)]"
      />
    </div>
  );
}

export default ArticleIllustration;
