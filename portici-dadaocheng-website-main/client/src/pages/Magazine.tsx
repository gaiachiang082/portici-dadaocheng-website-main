import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { client } from "../SanityClient";

/** Rubriche editoriali (sommario statico). */
const RUBRIC_LABELS = ["Rituali", "Cibo", "Spazio", "Filosofia"] as const;

/** Copertina / issue — statico finché non esiste un documento Sanity dedicato. */
const MAGAZINE_ISSUE_LINE = "Numero · Primavera 2026";

interface Article {
  _id: string;
  _createdAt?: string;
  category?: string;
  title?: string;
  excerpt?: string;
  readTime?: string;
  color?: string;
  mainImage?: {
    asset?: { url?: string } | null;
  } | null;
}

function coverImageUrl(a: Article): string | undefined {
  const u = a.mainImage?.asset?.url;
  return typeof u === "string" && u.length > 0 ? u : undefined;
}

export default function Magazine() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch<Article[]>(
          `*[_type == "article"] | order(_createdAt desc) {
            _id,
            _createdAt,
            category,
            "title": title.it,
            excerpt,
            readTime,
            color,
            mainImage {
              asset->{ url }
            }
          }`
        );
        setArticles(data ?? []);
      } catch (err) {
        console.error("Magazine fetch error:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const featured = articles.length > 0 ? articles[0] : null;
  const indexArticles = articles.length > 1 ? articles.slice(1) : articles.length === 1 ? [] : articles;

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Magazine"
        meta={MAGAZINE_ISSUE_LINE}
        className="pb-16"
        titleClassName="text-[clamp(2.15rem,4.5vw,3.25rem)] leading-[1.12]"
        title={
          <>
            Incontri di lettura
            <br />
            <em className="text-[var(--riso-peach)] not-italic font-medium">tra culture.</em>
          </>
        }
      >
        <p>
          Ogni testo applica il metodo 同中求異: partiamo da una stessa domanda umana e osserviamo come culture diverse le
          rispondono. Non accumulo di notizie, ma spostamento dello sguardo.
        </p>
        <p className="text-page-header-dim">
          Scorrete il sommario, aprite un articolo, tornate quando volete: il numero resta aperto.
        </p>
      </PageHeader>

      {/* D: Copertina — articolo in evidenza */}
      {!loading && featured && (
        <section className="py-14 px-6 md:px-10 bg-background border-b border-border">
          <div className="container mx-auto max-w-5xl">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-6 [font-family:var(--font-mono)]">
              In copertina
            </p>
            <Link
              href={`/articoli/${featured._id}`}
              className="group grid gap-8 md:grid-cols-2 md:gap-12 items-center rounded-2xl border border-border bg-card p-6 md:p-10 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
                {coverImageUrl(featured) ? (
                  <img
                    src={coverImageUrl(featured)}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ backgroundColor: featured.color ?? "var(--secondary)" }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-4">
                {featured.category && (
                  <span
                    className="text-xs font-semibold tracking-[0.22em] uppercase text-secondary"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    {featured.category}
                  </span>
                )}
                <h2
                  className="text-foreground text-2xl md:text-[1.75rem] font-semibold leading-tight group-hover:text-secondary transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured.title ?? "Senza titolo"}
                </h2>
                {featured.excerpt && (
                  <p className="text-muted-foreground leading-relaxed line-clamp-4 [font-family:var(--font-body)]">
                    {featured.excerpt}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary mt-2"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  Leggi l&apos;articolo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* E: Sommario / rubriche */}
      <section className="py-12 px-6 md:px-10 bg-background">
        <div className="container mx-auto">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-4 [font-family:var(--font-mono)]">
            Sommario
          </p>
          <p className="text-base text-muted-foreground leading-[1.85] max-w-3xl [font-family:var(--font-body)]">
            Rubriche di riferimento:{" "}
            {RUBRIC_LABELS.map((label, i) => (
              <span key={label}>
                {i > 0 && <span className="text-secondary"> · </span>}
                <span className="font-medium text-foreground [font-family:var(--font-body)]">{label}</span>
              </span>
            ))}
            .
          </p>
        </div>
      </section>

      {/* F: Indice articoli */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="container mx-auto">
          {indexArticles.length > 0 && (
            <h2 className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-10 [font-family:var(--font-mono)]">
              Nel numero
            </h2>
          )}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
                >
                  <div className="h-40 bg-[oklch(88%_0.010_80)]" />
                  <div className="p-8 flex flex-col flex-1 gap-6">
                    <div className="h-3 w-16 bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-5 w-full bg-[oklch(88%_0.010_80)] rounded-xl" />
                    <div className="h-4 w-full bg-[oklch(88%_0.010_80)] rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <p className="text-muted-foreground [font-family:var(--font-body)]">
              Nessun articolo pubblicato al momento.
            </p>
          ) : indexArticles.length === 0 ? null : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {indexArticles.map((article) => {
                const img = coverImageUrl(article);
                return (
                  <Link
                    key={article._id}
                    href={`/articoli/${article._id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-muted shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="h-full w-full"
                          style={{ backgroundColor: article.color ?? "var(--secondary)" }}
                        />
                      )}
                    </div>
                    <div className="p-8 flex flex-col flex-1 gap-5">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase text-gray-500"
                        style={{
                          fontFamily: "var(--font-ui)",
                          color: article.color ?? "var(--secondary)",
                        }}
                      >
                        {article.category ?? "Articolo"}
                      </span>
                      <h3 className="text-foreground font-semibold text-[1.125rem] leading-snug group-hover:text-secondary transition-colors [font-family:var(--font-display)]">
                        {article.title ?? ""}
                      </h3>
                      <p className="text-base text-muted-foreground leading-[1.75] flex-1 line-clamp-3 [font-family:var(--font-body)]">
                        {article.excerpt ?? ""}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground [font-family:var(--font-mono)] tracking-wide">
                          {article.readTime ? `${article.readTime} di lettura` : "—"}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* G: Chiusura editoriale */}
      <section className="py-16 px-6 md:px-10 bg-muted border-t border-border">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-[15px] text-muted-foreground leading-relaxed [font-family:var(--font-body)]">
            Volete restare nel racconto: trovate la{" "}
            <Link href="/newsletter" className="text-secondary underline-offset-4 hover:underline">
              pagina newsletter
            </Link>
            , oppure il modulo nel piè di pagina — una mail al mese e niente pressione.
          </p>
        </div>
      </section>
    </main>
  );
}
