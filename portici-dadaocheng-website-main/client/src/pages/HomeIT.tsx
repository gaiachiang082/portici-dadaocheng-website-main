import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { ArticleCard, ArticleCardSkeleton, type ArticlePreview } from "@/components/ArticlePreviewCard";
import { MagneticButton } from "@/components/MagneticButton";
import { MotionReveal } from "@/components/MotionReveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { formatIssueMeta, getCurrentIssue } from "@/data/magazineIssues";
import { ARTICLES_LATEST_THREE_QUERY } from "@/sanity/articleQueries";
import { client } from "../SanityClient";

/* ─────────────────────────────────────────────────────────────────
   EDITORIAL HERO — two columns, cover block, no scroll gate
   ───────────────────────────────────────────────────────────────── */
function HomeHero() {
  const localizedHref = useLocalizedHref();
  return (
    <section
      className="pt-[7.75rem] pb-12 md:pt-[8.5rem] md:pb-16 px-6 md:px-10 bg-background border-b border-border"
      aria-labelledby="home-hero-heading"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-12 lg:gap-14 xl:gap-16 items-start">
          <div className="min-w-0">
            <MotionReveal as="p"
              className="text-[13px] font-normal tracking-[0.22em] uppercase text-muted-foreground mb-5"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Portici DaDaocheng
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <h1
                id="home-hero-heading"
                className="font-medium text-foreground mb-4"
                style={{
                  fontFamily: "'Spectral', Georgia, serif",
                  fontSize: "clamp(2rem, 4.8vw, 3.15rem)",
                  fontWeight: 500,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                }}
              >
                Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.
              </h1>
            </MotionReveal>
            <MotionReveal as="p" delay={0.16}
              className="text-[1.05rem] md:text-lg text-foreground/85 leading-snug mb-5"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              <span lang="zh-Hant">異中求同，同中求異。</span>
            </MotionReveal>
            <MotionReveal as="p" delay={0.24}
              className="text-[17px] text-muted-foreground leading-[1.75] mb-4 max-w-xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Annotiamo da Bologna e da Taipei: trimestrale in PDF, posta rada, sessioni quando una domanda diventa
              data e luogo — non un catalogo tenuto aperto per abitudine.
            </MotionReveal>
            <MotionReveal as="p" delay={0.3}
              className="text-[17px] text-muted-foreground leading-[1.75] mb-10 max-w-xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Quale domanda ti spinge oggi a tenere due città sullo stesso tavolo, senza volerle chiudere in un&apos;unica
              immagine?
            </MotionReveal>

            <MotionReveal delay={0.36}>
              <div
                className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 mb-8"
                role="group"
                aria-label="Ingressi principali"
              >
              <MagneticButton>
                <Link
                  href={localizedHref("/magazine")}
                  className="group inline-flex flex-col gap-1 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Letture</span>
                  <span className="text-[17px] font-medium text-foreground border-b border-foreground/25 pb-0.5 group-hover:border-foreground transition-colors">
                    Magazine
                  </span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href={localizedHref("/newsletter")}
                  className="group inline-flex flex-col gap-1 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Note dalla redazione</span>
                  <span className="text-[17px] font-medium text-foreground border-b border-foreground/25 pb-0.5 group-hover:border-foreground transition-colors">
                    Newsletter
                  </span>
                </Link>
              </MagneticButton>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.42}>
              <nav
                className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-muted-foreground/80"
                style={{ fontFamily: "var(--font-ui)" }}
                aria-label="Altri collegamenti"
              >
                <Link href={localizedHref("/fondatrici")} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  Fondatrici
                </Link>
                <span className="text-border select-none" aria-hidden>
                  ·
                </span>
                <Link href={localizedHref("/articoli")} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  Articoli
                </Link>
              </nav>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.1} className="min-w-0 lg:pt-2">
            <article
              className="relative border border-border bg-[var(--paper-warm)]"
              aria-label="Copertina editoriale"
            >
              <header className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-border/60">
                <BrandMark tone="ink" emphasis className="h-[66px] w-auto shrink-0" />
                <div className="text-right min-w-0">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1"
                    style={{ fontFamily: "var(--font-ui)" }}
                  >
                    Front page
                  </p>
                  <p
                    className="text-[13px] text-foreground/90 leading-tight"
                    style={{ fontFamily: "'Spectral', Georgia, serif" }}
                  >
                    Cultura · dialogo · pratica
                  </p>
                </div>
              </header>
              <ParallaxImage
                src="/brand/home-landing-cover.png"
                alt="Copertina editoriale astratta"
                className="aspect-[4/5] max-h-[min(52vh,520px)] bg-[var(--paper-deep)]"
                imgClassName="object-cover object-center opacity-[0.92]"
                offset={50}
                loading="eager"
                fetchPriority="high"
                width={800}
                height={1000}
                overlay={
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in srgb, var(--forest-deep) 35%, transparent) 0%, transparent 45%)",
                    }}
                  />
                }
              />
            </article>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MANIFESTO — dark ink band, bilingual, static (no reveal)
   ───────────────────────────────────────────────────────────────── */
function HomeManifestoStrip() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-forest text-[var(--paper)]"
      aria-labelledby="home-manifesto-heading"
    >
      <BrandMark
        tone="paper"
        className="pointer-events-none absolute -right-8 top-1/2 h-[min(420px,55vw)] w-auto -translate-y-1/2 opacity-[0.06]"
        aria-hidden
      />
      <div className="container relative z-10 max-w-3xl mx-auto px-6 md:px-10">
        <MotionReveal as="p"
          style={{ fontFamily: "var(--font-ui)" }}
          className="text-[11px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-8"
        >
          <span id="home-manifesto-heading">La nostra filosofia</span>
        </MotionReveal>
        <blockquote className="border-l-2 border-[color-mix(in_srgb,var(--paper)_35%,transparent)] pl-6 md:pl-8">
          <MotionReveal as="p" delay={0.08}
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-5 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            <span lang="it">
              Trovare le differenze nell&apos;unità. Il nostro metodo parte dalla stessa domanda: come rispondono culture
              diverse allo stesso bisogno umano?
            </span>
          </MotionReveal>
          <MotionReveal as="p" delay={0.16}
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-5 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            <span lang="it">
              Non cerchiamo di stabilire quale risposta pesa di più: annotiamo come ciascuna cultura piega la stessa
              domanda su materiali e contesti diversi.
            </span>
          </MotionReveal>
          <MotionReveal as="p" delay={0.24}
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-6 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            <span lang="it">
              Cosa resta fuori quadro, per te, quando affianchi due risposte sullo stesso foglio?
            </span>
          </MotionReveal>
          <MotionReveal as="p" delay={0.32}
            className="text-[1.35rem] md:text-[1.5rem] leading-relaxed text-[var(--paper)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            <span lang="zh-Hant">同中求異</span>
          </MotionReveal>
        </blockquote>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TWO-PANEL ENTRY — Magazine & Eventi (chapter-like)
   ───────────────────────────────────────────────────────────────── */
function HomeEntryPanels() {
  const localizedHref = useLocalizedHref();
  const currentIssue = getCurrentIssue();

  return (
    <section className="py-16 md:py-20 bg-background" aria-labelledby="home-entry-heading">
      <h2 id="home-entry-heading" className="sr-only">
        Ingresso Magazine e Sessioni
      </h2>
      <div className="container max-w-6xl mx-auto px-6 md:px-10">
        <MotionReveal className="grid md:grid-cols-2 gap-0 md:gap-px bg-border/40 border border-border/50">
          <Link
            href={localizedHref("/magazine")}
            className="group block bg-background p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground transition-colors hover:bg-[var(--paper-warm)]/50"
          >
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                I — Magazine
              </p>
              <p
                className="text-[clamp(1.5rem,3vw,1.85rem)] font-medium text-foreground leading-tight mb-6"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Letture, saggi e voci che attraversano confini.
              </p>
              <p
                className="text-[13px] leading-relaxed text-muted-foreground/90 max-w-md line-clamp-4 border-l border-border pl-4"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 mb-1.5 font-sans">
                  {formatIssueMeta(currentIssue)}
                </span>
                <span className="font-medium text-foreground/90">{currentIssue.themeTitle}</span>
                {currentIssue.intro[0] ? (
                  <span className="block mt-2 text-muted-foreground/90 line-clamp-2">{currentIssue.intro[0]}</span>
                ) : null}
              </p>
            </div>
            <p
              className="mt-8 text-[13px] uppercase tracking-[0.14em] text-foreground group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Apri il Magazine
              <ArrowRight size={14} strokeWidth={1.75} className="opacity-70" aria-hidden />
            </p>
          </Link>

          <Link
            href={localizedHref("/eventi")}
            className="group block bg-background p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-between border-t border-border/50 md:border-t-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground transition-colors hover:bg-[var(--paper-warm)]/50"
          >
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                II — Sessioni
              </p>
              <p
                className="text-[clamp(1.5rem,3vw,1.85rem)] font-medium text-foreground leading-tight mb-6"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Prossime sessioni, stagioni, interesse.
              </p>
              <p
                className="text-[15px] leading-relaxed text-muted-foreground max-w-md"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Linee possibili a Bologna: manifesta interesse per tema; quando il programma si conferma, ricevi formato
                e date — non un carrello sempre aperto.
              </p>
            </div>
            <p
              className="mt-8 text-[13px] uppercase tracking-[0.14em] text-foreground group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Vai alle sessioni
              <ArrowRight size={14} strokeWidth={1.75} className="opacity-70" aria-hidden />
            </p>
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ULTIME LETTURE — Sanity preview (same query shape as /articoli)
   ───────────────────────────────────────────────────────────────── */
function HomeLatestReadsSection() {
  const lang = useLang();
  const localizedHref = useLocalizedHref();
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const data = await client.fetch<ArticlePreview[]>(ARTICLES_LATEST_THREE_QUERY, { lang });
        if (!cancelled) {
          setArticles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("HomeLatestReadsSection fetch error:", err);
        if (!cancelled) {
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
  }, [lang]);

  if (!loading && articles.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 md:py-20 bg-muted/40 px-6 md:px-10"
      aria-labelledby="home-latest-reads-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <MotionReveal as="p"
          className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-4 [font-family:var(--font-mono)]"
        >
          LETTURE
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <h2
            id="home-latest-reads-heading"
            className="font-medium text-foreground"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              fontWeight: 500,
            }}
          >
            Dalla redazione
          </h2>
        </MotionReveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }, (_, i) => <ArticleCardSkeleton key={i} />)
            : articles.map((article, i) => (
                <div key={article._id} data-reveal data-reveal-delay={120 + i * 100}>
                  <ArticleCard article={article} />
                </div>
              ))}
        </div>
        <MotionReveal delay={0.2} className="mt-10">
          <Link
            href={localizedHref("/articoli")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Tutte le letture
            <ArrowRight size={14} aria-hidden />
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NEWSLETTER
   ───────────────────────────────────────────────────────────────── */
function NewsletterSection() {
  const localizedHref = useLocalizedHref();
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container">
        <MotionReveal className="max-w-[560px] mx-auto text-center">
          <p
            className="text-[15px] font-normal tracking-[0.22em] uppercase text-muted-foreground mb-4"
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
            Resta nel racconto
          </h2>
          <p
            className="text-[16px] text-muted-foreground leading-[1.75] mb-6"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Poche mail, solo quando c&apos;è materiale da aggiungere al taccuino. Frequenza e contenuti sono scritti per
            iscritto nella pagina dedicata.
          </p>
          <Link
            href={localizedHref("/newsletter")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity mb-8"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Note su cosa inviamo <ArrowRight size={14} />
          </Link>
          <NewsletterSubscribeForm source="home" variant="home" showUnsubscribeHint />
        </MotionReveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function HomeIT() {
  return (
    <main>
      <HomeHero />
      <HomeManifestoStrip />
      <HomeEntryPanels />
      <HomeLatestReadsSection />
      <NewsletterSection />
    </main>
  );
}
