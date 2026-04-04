import { useState, useEffect } from "react";
import { client } from "../SanityClient";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  ARTICLES_LIST_QUERY,
  ArticleCard,
  ArticleCardSkeleton,
  type ArticlePreview,
} from "@/components/ArticlePreviewCard";

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
        const data = await client.fetch<ArticlePreview[]>(ARTICLES_LIST_QUERY);
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
