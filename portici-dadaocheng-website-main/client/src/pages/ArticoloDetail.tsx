import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { client } from "../SanityClient";

/** Shape of `*[_type == "article" && _id == $id][0]{ ... }` including Italian block body from Sanity. */
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
        const data = await client.fetch<ArticleDetail | null>(
          `*[_type == "article" && _id == $id][0]{ _id, "title": title.it, "body": content_it, category, mainImage }`,
          { id }
        );
        setArticle(data ?? null);
      } catch (err) {
        console.error("ArticoloDetail fetch error:", err);
        setError("Impossibile caricare l'articolo.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <main>
        <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)] min-h-[50vh]">
          <div className="container max-w-3xl">
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-24 bg-[oklch(40%_0.005_60)] rounded" />
              <div className="h-12 w-3/4 bg-[oklch(40%_0.005_60)] rounded" />
              <div className="h-64 w-full bg-[oklch(40%_0.005_60)] rounded" />
              <div className="h-4 w-full bg-[oklch(40%_0.005_60)] rounded" />
              <div className="h-4 w-full bg-[oklch(40%_0.005_60)] rounded" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main>
        <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)] min-h-[50vh]">
          <div className="container max-w-3xl text-center">
            <p className="text-[oklch(72%_0.005_85)] mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              {error ?? "Articolo non trovato."}
            </p>
            <Link href="/articoli" className="inline-flex items-center gap-2 text-[#A67C52] hover:underline">
              <ArrowLeft size={18} />
              Torna agli articoli
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <Link
            href="/articoli"
            className="inline-flex items-center gap-2 text-[15px] text-[#A67C52] hover:underline mb-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            <ArrowLeft size={16} />
            Articoli
          </Link>
          {article.category && (
            <span
              className="block text-xs font-semibold tracking-[0.22em] uppercase text-[#A67C52] mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {article.category}
            </span>
          )}
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {article.title ?? "Senza titolo"}
          </h1>
          <div className="w-10 h-0.5 bg-[#A67C52]" />
        </div>
      </section>

      {/* Main image */}
      {article.mainImage?.asset?.url && (
        <section className="bg-[oklch(27.5%_0.000_0)] pb-12">
          <div className="container max-w-4xl">
            <img
              src={article.mainImage.asset.url}
              alt={article.title ?? ""}
              className="w-full aspect-[16/10] object-cover rounded-xl shadow-[0_4px_24px_oklch(0%_0_0/0.15)]"
            />
          </div>
        </section>
      )}

      {/* Body content */}
      <section className="py-16 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-2xl">
          <article
            className="prose prose-lg prose-neutral max-w-none
              prose-headings:font-[family-name:var(--font-display)] prose-headings:text-[oklch(27.5%_0.000_0)]
              prose-p:text-[oklch(35%_0.005_60)] prose-p:leading-[1.85] prose-p:font-[family-name:'Source_Serif_4',Georgia,serif]
              prose-a:text-[#A67C52] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[oklch(27.5%_0.000_0)]
              prose-blockquote:border-l-[#A67C52] prose-blockquote:italic prose-blockquote:text-[oklch(45%_0.005_60)]
              prose-hr:border-[oklch(88%_0.010_80)]
              prose-img:rounded-xl prose-img:shadow-md"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {article.body && <PortableText value={article.body} />}
          </article>
        </div>
      </section>
    </main>
  );
}
