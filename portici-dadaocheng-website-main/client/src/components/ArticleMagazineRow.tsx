import { useState } from "react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalizedHref } from "@/contexts/LangContext";
import { useUiDict } from "@/i18n/useUiDict";
import { articlePathSegment } from "@/sanity/articlePath";
import { excerptPreview, type ArticlePreview } from "@/components/ArticlePreviewCard";

/**
 * Media slot for the magazine row.
 *
 * Loading order:
 *   1. /videos/{slug}.mp4  — silent, looping, autoplay <video> (decorative)
 *   2. Sanity mainImage     — fallback on video `onError` or missing slug
 *   3. Neutral placeholder  — when neither is available
 */
function ArticleMagazineMedia({
  slug,
  imageUrl,
  title,
}: {
  slug: string;
  imageUrl?: string;
  title: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const hasSlug = slug.trim().length > 0;
  const videoSrc = hasSlug && !videoFailed ? `/videos/${slug}.mp4` : null;

  if (videoSrc) {
    return (
      <video
        key={videoSrc}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        className="h-full w-full object-cover"
        aria-hidden
      />
    );
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }

  return <div className="h-full w-full bg-muted" aria-hidden />;
}

/**
 * One zig-zag magazine row.
 * Desktop (md+): two 50% columns, alternating media side based on `index` parity.
 * Mobile: single column, media on top, text below.
 */
export function ArticleMagazineRow({
  article,
  index,
}: {
  article: ArticlePreview;
  index: number;
}) {
  const localizedHref = useLocalizedHref();
  const t = useUiDict();

  const slug = articlePathSegment(article);
  const imageUrl = article.mainImage?.asset?.url;
  const title = article.title?.trim() ? article.title : t.common.untitled;
  const excerpt = excerptPreview(article.excerpt);
  const href = localizedHref(`/articoli/${slug}`);

  const reverse = index % 2 === 1;

  return (
    <article className="group/row border-t border-border/70 py-12 first:border-t-0 first:pt-0 md:py-20">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-24">
        <Link
          href={href}
          aria-label={title}
          className={`block overflow-hidden ${reverse ? "md:order-2" : "md:order-1"}`}
        >
          <div className="aspect-[4/3] overflow-hidden bg-muted md:aspect-[5/4]">
            <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover/row:scale-[1.02]">
              <ArticleMagazineMedia slug={slug} imageUrl={imageUrl} title={title} />
            </div>
          </div>
        </Link>

        <div className={`md:px-2 lg:px-6 ${reverse ? "md:order-1" : "md:order-2"}`}>
          {article.category ? (
            <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground [font-family:var(--font-mono)]">
              {article.category}
            </span>
          ) : null}
          <h2 className="mb-5 text-2xl font-medium leading-[1.15] text-foreground md:text-3xl lg:text-[2.1rem] [font-family:var(--font-display)]">
            <Link href={href} className="transition-colors hover:text-foreground/80">
              {title}
            </Link>
          </h2>
          {excerpt ? (
            <p className="mb-8 max-w-prose text-[15px] leading-relaxed text-muted-foreground [font-family:var(--font-body)]">
              {excerpt}
            </p>
          ) : null}
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground/80 [font-family:var(--font-mono)] transition-colors hover:text-foreground"
          >
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-foreground/80 after:transition-transform after:duration-300 group-hover/row:after:origin-left group-hover/row:after:scale-x-100">
              {t.common.read_more}
            </span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ArticleMagazineRowSkeleton({ index = 0 }: { index?: number }) {
  const reverse = index % 2 === 1;
  return (
    <article className="border-t border-border/70 py-12 first:border-t-0 first:pt-0 md:py-20">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-24">
        <div
          className={`aspect-[4/3] overflow-hidden bg-muted md:aspect-[5/4] ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <Skeleton className="h-full w-full rounded-none" />
        </div>
        <div className={`md:px-2 lg:px-6 ${reverse ? "md:order-1" : "md:order-2"}`}>
          <Skeleton className="mb-4 h-3 w-24 rounded-sm" />
          <Skeleton className="mb-3 h-7 w-full rounded-sm" />
          <Skeleton className="mb-6 h-7 w-3/4 rounded-sm" />
          <Skeleton className="mb-2 h-4 w-full rounded-sm" />
          <Skeleton className="mb-2 h-4 w-full rounded-sm" />
          <Skeleton className="mb-8 h-4 w-2/3 rounded-sm" />
          <Skeleton className="h-3 w-28 rounded-sm" />
        </div>
      </div>
    </article>
  );
}
