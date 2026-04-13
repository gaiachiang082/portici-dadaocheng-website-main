import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { DEFAULT_DOCUMENT_DESCRIPTION, DEFAULT_DOCUMENT_TITLE, useDocumentSeo } from "@/hooks/useDocumentSeo";
import { useJsonLd } from "@/hooks/useJsonLd";
import { fetchArticleDetail, normalizeArticleRouteParam } from "@/sanity/articleDetailFetch";

/** Shape of article detail fetch (GROQ projections in `articleQueries.ts`). */
interface ArticleDetail {
  _id: string;
  slug?: string | null;
  title?: string;
  excerpt?: string | null;
  body?: PortableTextBlock[] | null;
  category?: string;
  mainImage?: {
    asset?: { url?: string };
  };
}

function excerptToMeta(raw: string | null | undefined): string {
  const t = (raw ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= 155) return t || DEFAULT_META_FALLBACK;
  return `${t.slice(0, 152).trimEnd()}…`;
}

const DEFAULT_META_FALLBACK =
  "Lettura da Portici DaDaocheng — cultura taiwanese, cibo e laboratorio a Bologna.";

export default function ArticoloDetail() {
  const lang = useLang();
  const localizedHref = useLocalizedHref();
  const params = useParams<{ slug: string }>();
  /** Raw segment from the router; `fetchArticleDetail` applies decode + lower + trim before GROQ. */
  const slugFromRoute = params?.slug ?? "";
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugFromRoute.trim()) {
      setLoading(false);
      return;
    }
    const fetchArticle = async () => {
      try {
        const data = await fetchArticleDetail<ArticleDetail>(slugFromRoute, lang);
        setArticle(data ?? null);
      } catch (err) {
        console.error("ArticoloDetail fetch error:", err);
        setError("Impossibile caricare l'articolo.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slugFromRoute, lang]);

  const canonicalSegment =
    article?.slug ?? normalizeArticleRouteParam(slugFromRoute);
  const canonicalPath =
    canonicalSegment.length > 0 ? localizedHref(`/articoli/${canonicalSegment}`) : undefined;

  const metaTitle = article?.title?.trim()
    ? `${article.title.trim()} | Portici DaDaocheng`
    : DEFAULT_DOCUMENT_TITLE;
  const metaDescription = article ? excerptToMeta(article.excerpt) : DEFAULT_DOCUMENT_DESCRIPTION;

  useDocumentSeo(metaTitle, metaDescription, canonicalPath);

  const articleJsonLd = useMemo(() => {
    if (!article?.title) return null;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = canonicalPath && origin ? `${origin}${canonicalPath}` : "";
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: excerptToMeta(article.excerpt),
      inLanguage: lang,
      url: url || undefined,
      isPartOf: {
        "@type": "WebSite",
        name: "Portici DaDaocheng",
        url: origin || undefined,
      },
      ...(article.mainImage?.asset?.url
        ? { image: article.mainImage.asset.url }
        : {}),
    };
  }, [article, canonicalPath, lang]);

  useJsonLd("jsonld-article-detail", articleJsonLd);

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
