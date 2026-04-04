import { useState, useEffect } from "react";
import { Link } from "wouter";
import { client } from "../SanityClient";
import { PageHeader } from "@/components/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface ArticlePreview {
  _id: string;
  title: { it: string; en?: string };
  category?: string;
  mainImage?: { asset?: { url?: string } };
  excerpt?: string;
}

const ARTICLES_QUERY = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  title,
  category,
  mainImage { asset->{ url } },
  "excerpt": pt::text(content_it)
}`;

function excerptPreview(raw: string | null | undefined, max = 180): string {
  const s = (raw ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trimEnd()}…`;
}

function ArticleCardSkeleton() {
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

function ArticleCard({ article }: { article: ArticlePreview }) {
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

export default function ArticoliPage() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch<ArticlePreview[]>(ARTICLES_QUERY);
        if (!cancelled) {
          setArticles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("ArticoliPage fetch error:", err);
        if (!cancelled) {
          setError("Impossibile caricare gli articoli.");
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  return (
    <main>
      <PageHeader eyebrow="LETTURE" title="Articoli e ricette">
        <p>Saggi, ricette e voci che attraversano confini.</p>
      </PageHeader>

      <section className="bg-background px-6 py-14 md:px-10 md:py-16">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground [font-family:var(--font-body)]">{error}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() => setRetryKey((k) => k + 1)}
              >
                Riprova
              </Button>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex justify-center py-16">
              <p className="text-center text-muted-foreground [font-family:var(--font-body)]">
                I primi articoli sono in arrivo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
