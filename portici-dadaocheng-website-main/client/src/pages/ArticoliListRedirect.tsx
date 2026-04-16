import { useState, useEffect } from "react";
import { client } from "../SanityClient";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { type ArticlePreview } from "@/components/ArticlePreviewCard";
import {
  ArticleMagazineRow,
  ArticleMagazineRowSkeleton,
} from "@/components/ArticleMagazineRow";
import { ARTICLES_LIST_QUERY } from "@/sanity/articleQueries";
import { pickDict } from "@/i18n/dictionaries";
import { useUiDict } from "@/i18n/useUiDict";

export default function ArticoliPage() {
  const lang = useLang();
  const t = useUiDict();
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
        console.log("準備打 Sanity API，使用的 lang 變數是:", lang);
        console.log("Sanity Config:", {
          projectId: client.config().projectId,
          dataset: client.config().dataset,
        });
        const data = await client.fetch<ArticlePreview[]>(ARTICLES_LIST_QUERY, { lang });
        const list = Array.isArray(data) ? data : [];
        console.log("Sanity 回傳的文章列表:", list);
        if (!cancelled) {
          setArticles(list);
        }
      } catch (err) {
        console.error("ArticoliPage fetch error:", err);
        if (!cancelled) {
          setError(pickDict(lang).articoli.error);
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
  }, [retryKey, lang]);

  return (
    <main>
      <PageHeader eyebrow={t.articoli.eyebrow} title={t.articoli.title}>
        <p>{t.articoli.subtitle}</p>
      </PageHeader>

      <section className="bg-background px-6 py-14 md:px-10 md:py-20">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="flex flex-col">
              {Array.from({ length: 3 }, (_, i) => (
                <ArticleMagazineRowSkeleton key={i} index={i} />
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
                {t.articoli.empty}
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {articles.map((article, i) => (
                <ArticleMagazineRow key={article._id} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
