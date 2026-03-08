import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { client } from "../SanityClient";

const categories = ["Tutti", "Rituali", "Cibo", "Spazio", "Filosofia"];

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
          `*[_type == "article"]{ _id, category, title, excerpt, readTime, color }`
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
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Articoli
          </p>
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.15,
            }}
          >
            Letture che cambiano
            <br />
            <em className="text-[#A67C52] not-italic">come vedi il mondo.</em>
          </h1>
          <p
            className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Ogni articolo segue il metodo 同中求異 — trovare le differenze nell'unità.
            Non informazioni, ma trasformazioni.
          </p>
          <div className="w-10 h-0.5 bg-[#A67C52] mt-8" />
        </div>
      </section>

      {/* Category filter */}
      <section className="py-8 bg-[oklch(96.5%_0.006_85)] border-b border-[oklch(88%_0.010_80)]">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide rounded-sm transition-colors ${
                  cat === "Tutti"
                    ? "bg-[#a2482b] text-[#F5F3EE]"
                    : "bg-[oklch(89.5%_0.025_80)] text-[oklch(40%_0.005_60)] hover:bg-[#a2482b] hover:text-[#F5F3EE]"
                }`}
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-sm overflow-hidden shadow-[0_2px_12px_oklch(0%_0_0/0.06)] animate-pulse"
                >
                  <div className="h-1.5 bg-[oklch(88%_0.010_80)]" />
                  <div className="p-7 flex flex-col flex-1 gap-3">
                    <div className="h-3 w-16 bg-[oklch(88%_0.010_80)] rounded" />
                    <div className="h-5 w-full bg-[oklch(88%_0.010_80)] rounded" />
                    <div className="h-4 w-full bg-[oklch(88%_0.010_80)] rounded" />
                    <div className="h-4 w-3/4 bg-[oklch(88%_0.010_80)] rounded mt-2" />
                    <div className="h-3 w-20 bg-[oklch(88%_0.010_80)] rounded mt-5" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/articoli/${article._id}`}
                  className="group bg-white rounded-sm overflow-hidden shadow-[0_2px_12px_oklch(0%_0_0/0.06)] hover:shadow-[0_4px_24px_oklch(0%_0_0/0.10)] transition-shadow flex flex-col"
                >
                  <div className="h-1.5" style={{ backgroundColor: article.color ?? "#A67C52" }} />
                  <div className="p-7 flex flex-col flex-1">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase mb-4"
                      style={{ fontFamily: 'var(--font-ui)', color: article.color ?? "#A67C52" }}
                    >
                      {article.category ?? "Articolo"}
                    </span>
                    <h3
                      className="text-[oklch(27.5%_0.000_0)] mb-3 group-hover:text-[#A67C52] transition-colors"
                      style={{ fontFamily: 'var(--font-ui)', fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 }}
                    >
                      {article.title ?? ""}
                    </h3>
                    <p
                      className="text-[17px] text-[oklch(50%_0.005_60)] leading-[1.75] flex-1"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                    >
                      {article.excerpt ?? ""}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="text-xs text-[oklch(60%_0.005_60)]"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {article.readTime ? `${article.readTime} di lettura` : "—"}
                      </span>
                      <ArrowRight size={14} className="text-[#A67C52] opacity-0 group-hover:opacity-100 transition-opacity" />
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
