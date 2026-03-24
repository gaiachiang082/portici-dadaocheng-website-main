import { Link } from "wouter";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArchImage, ArchDecor } from "@/components/ArchFrame";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { client } from "@/SanityClient";

const IMG = {
  teaSettle:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/bglhzhpRWfrDXIyk.png",
};

/* ─────────────────────────────────────────────────────────────────
   SCROLL REVEAL WRAPPER
   ───────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.12);
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HOME ORIENTATION HERO — immediate clarity, no scroll gate
   ───────────────────────────────────────────────────────────────── */
function HomeOrientationHero() {
  return (
    <section className="pt-28 pb-14 md:pt-32 md:pb-16 px-6 md:px-10 bg-background border-b border-border">
      <div className="container max-w-3xl mx-auto">
        <p
          className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-5"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          Portici DaDaocheng
        </p>
        <h1
          className="font-medium text-foreground mb-5"
          style={{
            fontFamily: "'Spectral', Georgia, serif",
            fontSize: "clamp(1.85rem, 4.2vw, 2.65rem)",
            fontWeight: 500,
            lineHeight: 1.15,
          }}
        >
          Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.
        </h1>
        <p
          className="text-[17px] text-muted-foreground leading-[1.75] mb-10 max-w-2xl"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Laboratori a Bologna, letture sul Magazine, voci delle fondatrici: entrate dove preferite — questo è solo
          l&apos;ingresso.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10">
          <Link
            href="/eventi"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            <Calendar size={18} strokeWidth={2} aria-hidden />
            Eventi
          </Link>
          <Link
            href="/magazine"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shadow-sm"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            <BookOpen size={18} strokeWidth={2} aria-hidden />
            Magazine
          </Link>
        </div>

        <div
          className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          <Link href="/fondatrici" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">
            Fondatrici
          </Link>
          <Link href="/newsletter" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">
            Newsletter
          </Link>
          <Link href="/workshop" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">
            Workshop
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BRAND STORY STRIP — single manifesto / world-building layer
   ───────────────────────────────────────────────────────────────── */
function BrandStoryStrip() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-muted">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 120% 80% at 80% 50%, rgba(205,133,63,0.3) 0%, transparent 70%)",
        }}
      />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div
              className="relative mx-auto max-w-xl px-8 py-10 bg-card"
              style={{
                borderRadius: "52px 52px 28px 28px",
                border: "2px solid rgba(139,69,19,0.35)",
                boxShadow: "0 20px 40px rgba(44,62,80,0.25)",
              }}
            >
              <div
                className="absolute inset-x-6 -top-4 h-[60%] pointer-events-none"
                style={{
                  borderRadius: "60px 60px 30px 30px",
                  border: "2px solid rgba(139,69,19,0.35)",
                  borderBottom: "none",
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(205,133,63,0.16), transparent 70%)",
                }}
              />

              <p
                className="text-[14px] font-normal tracking-[0.22em] uppercase text-primary mb-4 relative z-10"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                La nostra filosofia
              </p>

              <p
                className="text-[18px] leading-[1.6] mb-5 italic relative z-10"
                style={{ fontFamily: "var(--font-body)", color: "#2C3E50" }}
              >
                &ldquo;Trovare le differenze nell&apos;unità. Il nostro metodo parte sempre dalla stessa domanda: come
                rispondono culture diverse allo stesso bisogno umano?&rdquo;
              </p>
              <p
                className="text-[18px] leading-[1.6] mb-6 relative z-10"
                style={{ fontFamily: "var(--font-body)", color: "#2C3E50" }}
              >
                Non per giudicare quale risposta sia migliore, ma per scoprire che la diversità stessa è la risposta più
                ricca che l&apos;umanità abbia mai prodotto.
              </p>
              <p
                className="text-right text-small text-primary relative z-10"
                style={{ fontFamily: "var(--font-small)" }}
              >
                同中求異
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-center justify-center">
              <div className="relative group" style={{ width: "280px" }}>
                <ArchImage
                  src={IMG.teaSettle}
                  alt="Cerimonia del tè — armonia"
                  aspectRatio="3/4"
                  borderColor="rgba(139,69,19,0.5)"
                />
                <div className="absolute -bottom-4 -right-4 -z-10">
                  <ArchDecor size="lg" color="#8B4513" opacity={0.15} />
                </div>
                <p
                  className="mt-4 text-center text-[13px] tracking-[0.18em] uppercase text-muted-foreground"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Il rito del tè
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED ARTICLES (from Sanity / Magazine index)
   ───────────────────────────────────────────────────────────────── */
interface ArticlePreview {
  _id: string;
  category?: string;
  title?: string;
  excerpt?: string;
  readTime?: string;
  color?: string;
}

function FeaturedArticlesSection() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch<ArticlePreview[]>(
          `*[_type == "article"] | order(_createdAt desc)[0...1]{ _id, category, "title": title.it, excerpt, readTime, color }`
        );
        setArticles(data ?? []);
      } catch (err) {
        console.error("Featured articles fetch error:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const accentColor = (color?: string) => color ?? "var(--secondary)";

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <Reveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-primary mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Magazine
            </p>
            <h2
              className="font-medium text-foreground"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.65rem", fontWeight: 500 }}
            >
              Dal numero
            </h2>
            <div className="w-10 h-0.5 bg-primary mt-4" />
          </div>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-2 text-[15px] text-primary hover:opacity-70 hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Vai al Magazine <ArrowRight size={14} />
          </Link>
        </Reveal>

        {loading ? (
          <div className="max-w-2xl">
            <div className="bg-card overflow-hidden rounded-2xl border border-border shadow-sm animate-pulse">
              <div className="h-1 bg-border" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-3 w-16 bg-border rounded" />
                <div className="h-5 w-full bg-border rounded" />
                <div className="h-4 w-full bg-border rounded" />
                <div className="h-4 w-3/4 bg-border rounded mt-2" />
                <div className="h-3 w-20 bg-border rounded mt-4" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-2xl">
            {articles.map((article, i) => (
              <Reveal key={article._id} delay={i * 80}>
                <Link
                  href={`/articoli/${article._id}`}
                  className="group bg-card overflow-hidden rounded-2xl border border-border shadow-sm flex flex-col transition-all duration-400 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-1" style={{ backgroundColor: accentColor(article.color) }} />
                  <div className="p-6 md:p-7 flex flex-col flex-1">
                    <span
                      className="text-[12px] font-semibold tracking-[0.18em] uppercase mb-4"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        color: accentColor(article.color),
                      }}
                    >
                      {article.category ?? "Articolo"}
                    </span>
                    <h3
                      className="text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        lineHeight: 1.35,
                      }}
                    >
                      {article.title ?? ""}
                    </h3>
                    <p
                      className="text-[16px] text-muted-foreground leading-[1.7] flex-1 line-clamp-4"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                    >
                      {article.excerpt ?? ""}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="text-[12px] text-muted-foreground"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      >
                        {article.readTime ? `${article.readTime} di lettura` : "—"}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NEWSLETTER
   ───────────────────────────────────────────────────────────────── */
function NewsletterSection() {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container">
        <Reveal className="max-w-[560px] mx-auto text-center">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Newsletter
          </p>
          <h2
            className="font-medium text-foreground mb-3"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              fontWeight: 500,
            }}
          >
            Restate nel racconto
          </h2>
          <p
            className="text-[16px] text-muted-foreground leading-[1.75] mb-6"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Una mail al mese, senza spam. Per cosa riceverete e come ci iscriviamo noi, c&apos;è la pagina dedicata.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-secondary hover:opacity-80 transition-opacity mb-8"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Leggi la promessa <ArrowRight size={14} />
          </Link>
          <NewsletterSubscribeForm source="home" variant="home" showUnsubscribeHint />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HomeOrientationHero />
      <BrandStoryStrip />
      <FeaturedArticlesSection />
      <NewsletterSection />
    </main>
  );
}
