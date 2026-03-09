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
    <main className="bg-[oklch(96.5%_0.006_85)]">
      {/* Hero */}
      <section className="pt-32 pb-28 px-6 md:px-10 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl mx-auto flex flex-col gap-10">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Articoli
          </p>
          <h1
            className="font-bold text-[oklch(96.5%_0.006_85)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
            }}
          >
            Letture che cambiano
            <br />
            <em className="text-[#A67C52] not-italic">come vedi il mondo.</em>
          </h1>
          <p
            className="text-lg text-[oklch(68%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Ogni articolo segue il metodo 同中求異 — trovare le differenze nell'unità.
            Non informazioni, ma trasformazioni.
          </p>
          <div className="w-10 h-0.5 bg-[#A67C52]" />
        </div>
      </section>

      {/* Category filter */}
      <section className="py-12 px-6 md:px-10 bg-[oklch(96.5%_0.006_85)]">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-3 md:gap-4 px-6 py-4 md:px-8 md:py-5">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 text-sm font-semibold tracking-wide rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all ${
                  cat === "Tutti"
                    ? "bg-[#a2482b] text-[#F5F3EE]"
                    : "bg-white text-gray-500 hover:bg-[#a2482b] hover:text-[#F5F3EE] hover:border-transparent"
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
      <section className="py-24 px-6 md:px-10 bg-[oklch(96.5%_0.006_85)]">
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
                  <div className="h-1.5 rounded-t-2xl" style={{ backgroundColor: article.color ?? "#A67C52" }} />
                  <div className="p-8 flex flex-col flex-1 gap-6">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase text-gray-500"
                      style={{ fontFamily: 'var(--font-ui)', color: article.color ?? "#A67C52" }}
                    >
                      {article.category ?? "Articolo"}
                    </span>
                    <h3
                      className="text-gray-900 font-bold group-hover:text-[#A67C52] transition-colors"
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
