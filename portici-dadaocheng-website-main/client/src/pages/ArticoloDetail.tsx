import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { ARTICLE_DETAIL_QUERY } from "@/sanity/articleQueries";
import { client } from "../SanityClient";

/** Shape of {@link ARTICLE_DETAIL_QUERY} result. */
interface ArticleDetail {
  _id: string;
  title?: string;
  /** Mapped from Sanity `content_it` (`array` of `block`). */
  body?: PortableTextBlock[] | null;
  category?: string;
  mainImage?: {
    asset?: { url?: string };
  };
}

export default function ArticoloDetail() {
  const lang = useLang();
  const localizedHref = useLocalizedHref();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchArticle = async () => {
      try {
        const data = await client.fetch<ArticleDetail | null>(ARTICLE_DETAIL_QUERY, { id, lang });
        setArticle(data ?? null);
      } catch (err) {
        console.error("ArticoloDetail fetch error:", err);
        setError("Impossibile caricare l'articolo.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id, lang]);

  if (loading) {
    return (
      <main>
        <section className="pt-32 pb-20 bg-forest min-h-[50vh]">
          <div className="container max-w-3xl">
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-24 bg-[color-mix(in_srgb,var(--paper)_20%,transparent)] rounded" />
              <div className="h-12 w-3/4 bg-[color-mix(in_srgb,var(--paper)_20%,transparent)] rounded" />
              <div className="h-64 w-full bg-[color-mix(in_srgb,var(--paper)_20%,transparent)] rounded" />
              <div className="h-4 w-full bg-[color-mix(in_srgb,var(--paper)_20%,transparent)] rounded" />
              <div className="h-4 w-full bg-[color-mix(in_srgb,var(--paper)_20%,transparent)] rounded" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main>
        <section className="pt-32 pb-20 bg-forest min-h-[50vh]">
          <div className="container max-w-3xl text-center">
            <p
              className="text-on-ink-muted mb-6"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              {error ?? "Articolo non trovato."}
            </p>
            <Link
              href={localizedHref("/magazine")}
              className="inline-flex items-center gap-2 text-on-ink-muted underline-offset-4 hover:text-on-ink hover:underline"
            >
              <ArrowLeft size={18} />
              Torna al Magazine
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-forest">
        <div className="container max-w-3xl">
          <Link
            href={localizedHref("/magazine")}
            className="inline-flex items-center gap-2 text-[15px] text-on-ink-muted underline-offset-4 hover:text-on-ink hover:underline mb-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            <ArrowLeft size={16} />
            Magazine
          </Link>
          {article.category && (
            <span
              className="block text-xs font-semibold tracking-[0.22em] uppercase text-on-ink-accent mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {article.category}
            </span>
          )}
          <h1
            className="font-medium text-on-ink mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {article.title ?? "Senza titolo"}
          </h1>
          <div className="w-10 h-0.5 bg-editorial-mark" />
        </div>
      </section>

      {/* Main image */}
      {article.mainImage?.asset?.url && (
        <section className="bg-forest pb-12">
          <div className="container max-w-4xl">
            <img
              src={article.mainImage.asset.url}
              alt={article.title ?? ""}
              className="w-full aspect-[16/10] object-cover rounded-xl shadow-[0_4px_28px_color-mix(in_srgb,var(--forest-deep)_55%,transparent)]"
            />
          </div>
        </section>
      )}

      {/* Body content */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl">
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-[family-name:var(--font-display)] prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:font-[family-name:'Source_Serif_4',Georgia,serif]
              prose-a:text-editorial-mark prose-a:no-underline hover:prose-a:underline prose-a:decoration-editorial-mark/45
              prose-strong:text-foreground
              prose-blockquote:border-editorial-mark prose-blockquote:border-l-2 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-hr:border-border
              prose-img:rounded-xl prose-img:shadow-sm"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {article.body && <PortableText value={article.body} />}
          </article>
        </div>
      </section>
    </main>
  );
}
