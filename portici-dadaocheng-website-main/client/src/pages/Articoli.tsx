import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { client } from "../SanityClient";

/** Rubriche editoriali (solo etichette, senza filtro). */
const RUBRIC_LABELS = ["Rituali", "Cibo", "Spazio", "Filosofia"] as const;

interface Article {
  _id: string;
  category?: string;
  title?: string;
  excerpt?: string;
  readTime?: string;
  color?: string;
}

export default function Articoli() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch<Article[]>(
          `*[_type == "article"]{ _id, category, "title": title.it, excerpt, readTime, color }`
        );
        setArticles(data ?? []);
      } catch (err) {
        console.error("Articoli fetch error:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-28 px-6 md:px-10 bg-foreground">
        <div className="container max-w-3xl mx-auto flex flex-col gap-10">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Articoli
          </p>
          <h1
            className="font-bold text-[var(--on-dark)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            Letture che cambiano
            <br />
            <em className="text-secondary not-italic">come vedi il mondo.</em>
          </h1>
          <p
            className="text-lg text-[oklch(68%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Ogni articolo segue il metodo 同中求異 — trovare le differenze nell'unità.
            Non informazioni, ma trasformazioni.
          </p>
          <div className="w-10 h-0.5 bg-secondary" />
        </div>
      </section>

      {/* Rubriche — etichette editoriali (nessun filtro) */}
      <section className="py-12 px-6 md:px-10 bg-background">
        <div className="container mx-auto">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Rubriche
          </p>
          <p
            className="text-base text-[oklch(40%_0.005_60)] leading-[1.85] max-w-3xl"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            I testi si distinguono per tono e materia. Rubriche di riferimento:{" "}
            {RUBRIC_LABELS.map((label, i) => (
              <span key={label}>
                {i > 0 && <span className="text-secondary"> · </span>}
                <span
                  className="font-medium text-[oklch(27.5%_0.000_0)]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {label}
                </span>
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-24 px-6 md:px-10 bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
                >
                  <div className="h-1.5 bg-[oklch(88%_0.010_80)]" />
                  <div className="p-8 flex flex-col flex-1 gap-6">
                    <div className="h-3 w-16 bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-5 w-full bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-4 w-full bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-4 w-3/4 bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-3 w-20 bg-[oklch(88%_0.010_80)] rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/articoli/${article._id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
                >
                  <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: article.color ?? "var(--secondary)" }} />
                  <div className="p-8 flex flex-col flex-1 gap-6">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase text-gray-500"
                      style={{ fontFamily: 'var(--font-ui)', color: article.color ?? "var(--secondary)" }}
                    >
                      {article.category ?? "Articolo"}
                    </span>
                    <h3
                      className="text-gray-900 font-bold group-hover:text-secondary transition-colors"
                      style={{ fontFamily: 'var(--font-ui)', fontSize: "1.125rem", lineHeight: 1.35 }}
                    >
                      {article.title ?? ""}
                    </h3>
                    <p
                      className="text-base text-gray-500 leading-[1.75] flex-1"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                    >
                      {article.excerpt ?? ""}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {article.readTime ? `${article.readTime} di lettura` : "—"}
                      </span>
                      <ArrowRight size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
