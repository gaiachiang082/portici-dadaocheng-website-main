import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export interface ArticlePreview {
  _id: string;
  title: { it: string; en?: string };
  category?: string;
  mainImage?: { asset?: { url?: string } };
  excerpt?: string;
}

/** Same projection as the /articoli list; full list ordered by creation date. */
export const ARTICLES_LIST_QUERY = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  title,
  category,
  mainImage { asset->{ url } },
  "excerpt": pt::text(content_it)
}`;

/** Latest three articles; same fields as {@link ARTICLES_LIST_QUERY}. */
export const ARTICLES_LATEST_THREE_QUERY = `*[_type == "article"] | order(_createdAt desc) [0...3] {
  _id,
  title,
  category,
  mainImage { asset->{ url } },
  "excerpt": pt::text(content_it)
}`;

export function excerptPreview(raw: string | null | undefined, max = 180): string {
  const s = (raw ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trimEnd()}…`;
}

export function ArticleCardSkeleton() {
  return (
    <article className="border border-border bg-background transition-all duration-300 group/card">
      <div className="aspect-[3/2] overflow-hidden bg-muted">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="p-5">
        <Skeleton className="mb-2 h-3 w-24 rounded-sm" />
        <Skeleton className="mb-2 h-5 w-full rounded-sm" />
        <Skeleton className="mb-2 h-5 w-4/5 rounded-sm" />
        <Skeleton className="mb-1 h-[14px] w-full rounded-sm" />
        <Skeleton className="mb-1 h-[14px] w-full rounded-sm" />
        <Skeleton className="mb-4 h-[14px] w-2/3 rounded-sm" />
        <Skeleton className="h-3 w-28 rounded-sm" />
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: ArticlePreview }) {
  const imageUrl = article.mainImage?.asset?.url;
  const titleIt = article.title?.it ?? "Senza titolo";
  const excerpt = excerptPreview(article.excerpt);

  return (
    <article className="border border-border bg-background hover:-translate-y-1 transition-all duration-300 group/card">
      <div className="aspect-[3/2] overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={titleIt}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="p-5">
        {article.category ? (
          <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground [font-family:var(--font-mono)]">
            {article.category}
          </span>
        ) : null}
        <h2 className="mb-2 line-clamp-2 text-[1.05rem] font-medium text-foreground [font-family:var(--font-display)]">
          {titleIt}
        </h2>
        {excerpt ? (
          <p className="mb-4 line-clamp-3 text-[14px] leading-relaxed text-muted-foreground [font-family:var(--font-body)]">
            {excerpt}
          </p>
        ) : (
          <div className="mb-4" aria-hidden />
        )}
        <Link
          href={`/articoli/${article._id}`}
          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] text-foreground/70 [font-family:var(--font-mono)] hover:text-foreground"
        >
          Leggi
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
