import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { useLang, useLocalizedHref, wouterHrefToPublicPath } from "@/contexts/LangContext";
import { DEFAULT_DOCUMENT_DESCRIPTION, DEFAULT_DOCUMENT_TITLE, useDocumentSeo } from "@/hooks/useDocumentSeo";
import { useJsonLd } from "@/hooks/useJsonLd";
import { fetchArticleDetail, normalizeArticleRouteParam } from "@/sanity/articleDetailFetch";
import { useUiDict } from "@/i18n/useUiDict";
import { ArticleIllustration } from "@/components/ArticleIllustration";
import { SmoothImage } from "@/components/SmoothImage";

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
  const t = useUiDict();
  const backHref = localizedHref("/articoli");
  const backLabel = t.nav.articles;
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
    const pub = canonicalPath ? wouterHrefToPublicPath(canonicalPath) : "";
    const url = pub && origin ? `${origin}${pub}` : "";
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
              href={backHref}
              className="inline-flex items-center gap-2 text-on-ink-muted underline-offset-4 hover:text-on-ink hover:underline"
            >
              <ArrowLeft size={18} />
              {backLabel}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const heroBgUrl = article.mainImage?.asset?.url;
  const hasBody = Array.isArray(article.body) && article.body.length > 0;

  return (
    <main>
      {/* Hero — cover image layered behind the content, not a full-bleed
          standalone block. The `bg-forest` of the section is the soft
          earth-tone placeholder visible while the image loads. */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-forest overflow-hidden isolate">
        {heroBgUrl && (
          <>
            <SmoothImage
              src={heroBgUrl}
              alt=""
              aria-hidden
              decoding="async"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in srgb, var(--forest) 68%, transparent) 0%, color-mix(in srgb, var(--forest) 82%, transparent) 55%, var(--forest) 100%)",
              }}
            />
          </>
        )}
        <div className="container max-w-3xl relative">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[15px] text-on-ink-muted underline-offset-4 hover:text-on-ink hover:underline mb-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            <ArrowLeft size={16} />
            {backLabel}
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

      {/* Body content — single centered column; the hand-drawn illustration
          sits above the prose as a "chapter plate", letting the reader
          settle into the piece before the text begins. */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl mx-auto">
          {/* Chapter-plate illustration: centered above the body on every
              breakpoint. Graceful-degrades away if the asset is missing. */}
          <ArticleIllustration
            slug={canonicalSegment}
            title={article.title ?? undefined}
            parallax={30}
            className="flex justify-center w-full mt-2 mb-12 md:mb-16"
            imgClassName="w-[clamp(160px,25vw,280px)] rotate-[-2deg]"
          />

          <article
            className="prose prose-lg max-w-2xl mx-auto
              prose-headings:font-[family-name:var(--font-display)] prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:font-[family-name:'Source_Serif_4',Georgia,serif]
              prose-a:text-editorial-mark prose-a:no-underline hover:prose-a:underline prose-a:decoration-editorial-mark/45
              prose-strong:text-foreground
              prose-blockquote:border-editorial-mark prose-blockquote:border-l-2 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-hr:border-border
              prose-img:rounded-xl prose-img:shadow-sm"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {hasBody ? (
              <PortableText value={article.body as PortableTextBlock[]} />
            ) : article.excerpt ? (
              <p className="text-muted-foreground leading-[1.85]">{article.excerpt}</p>
            ) : (
              <p className="text-muted-foreground italic">
                {lang === "en"
                  ? "The full text for this article isn’t available yet."
                  : "Il testo completo di questo articolo non è ancora disponibile."}
              </p>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}
