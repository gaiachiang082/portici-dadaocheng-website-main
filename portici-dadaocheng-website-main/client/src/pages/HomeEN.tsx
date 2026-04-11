import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BrandMark } from "@/components/BrandMark";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { ArticleCard, ArticleCardSkeleton, type ArticlePreview } from "@/components/ArticlePreviewCard";
import { formatIssueMeta, getCurrentIssue, ISSUE_NO1_COVER_FALLBACK_URL } from "@/data/magazineIssues";
import { ARTICLES_LATEST_THREE_QUERY } from "@/sanity/articleQueries";
import { client } from "../SanityClient";

/* ─────────────────────────────────────────────────────────────────
   NEWSLETTER — unchanged block (includes light reveal)
   ───────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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
            <p
              className="text-[13px] font-normal tracking-[0.22em] uppercase text-muted-foreground mb-5"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Portici DaDaocheng
            </p>
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
              Where different cultures interpret the same human question in ways that refuse to line up.
            </h1>
            <p
              className="text-[1.05rem] md:text-lg text-foreground/85 leading-snug mb-5"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              lang="zh-Hant"
            >
              異中求同，同中求異。
            </p>
            <p
              className="text-[17px] text-muted-foreground leading-[1.75] mb-4 max-w-xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              We take notes from Bologna and Taipei: a quarterly PDF, rare letters in the inbox, live sessions only
              when a question has earned a date and a place under the porticoes—not a catalogue held open by habit.
            </p>
            <p
              className="text-[17px] text-muted-foreground leading-[1.75] mb-10 max-w-xl"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              What question keeps you holding both cities on the same table today—without folding them into a single
              picture?
            </p>

            <div
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 mb-8"
              role="group"
              aria-label="Main entry points"
            >
              <Link
                href={localizedHref("/magazine")}
                className="group inline-flex flex-col gap-1 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Reading</span>
                <span className="text-[17px] font-medium text-foreground border-b border-foreground/25 pb-0.5 group-hover:border-foreground transition-colors">
                  Magazine
                </span>
              </Link>
              <Link
                href={localizedHref("/newsletter")}
                className="group inline-flex flex-col gap-1 w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Notes from the editors</span>
                <span className="text-[17px] font-medium text-foreground border-b border-foreground/25 pb-0.5 group-hover:border-foreground transition-colors">
                  Newsletter
                </span>
              </Link>
            </div>

            <nav
              className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-muted-foreground/80"
              style={{ fontFamily: "var(--font-ui)" }}
              aria-label="More links"
            >
              <Link href={localizedHref("/fondatrici")} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Founders
              </Link>
              <span className="text-border select-none" aria-hidden>
                ·
              </span>
              <Link href={localizedHref("/articoli")} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                Articles
              </Link>
            </nav>
          </div>

          <div className="min-w-0 lg:pt-2">
            <article
              className="relative border border-border bg-[var(--paper-warm)]"
              aria-label="Editorial cover"
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
                    Culture · conversation · practice
                  </p>
                </div>
              </header>
              <div className="relative aspect-[4/5] max-h-[min(52vh,520px)] bg-[var(--paper-deep)]">
                <img
                  src={ISSUE_NO1_COVER_FALLBACK_URL}
                  alt="Tea ceremony — cover still from issue one"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.92]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--forest-deep) 35%, transparent) 0%, transparent 45%)",
                  }}
                />
              </div>
              <footer className="px-5 py-4 border-t border-border/60">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  The tea rite — colophon
                </p>
              </footer>
            </article>
          </div>
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
        <p
          id="home-manifesto-heading"
          className="text-[11px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--paper)_55%,transparent)] mb-8"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          Our method
        </p>
        <blockquote className="border-l-2 border-[color-mix(in_srgb,var(--paper)_35%,transparent)] pl-6 md:pl-8">
          <p
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-5 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            lang="en"
          >
            We look for difference inside what looks like unity. Our method starts with the same question: how do
            different cultures answer the same human need?
          </p>
          <p
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-5 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            lang="en"
          >
            We do not try to settle which answer weighs more: we record how each culture bends the same question across
            different materials and streets—from Bologna’s porticoes to the lanes of Dadaocheng.
          </p>
          <p
            className="text-[clamp(1.05rem,2.2vw,1.2rem)] leading-[1.65] mb-6 text-[color-mix(in_srgb,var(--paper)_92%,transparent)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            lang="en"
          >
            What stays outside the frame for you when you lay two answers on the same sheet?
          </p>
          <p
            className="text-[1.35rem] md:text-[1.5rem] leading-relaxed text-[var(--paper)]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            lang="zh-Hant"
          >
            同中求異
          </p>
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
        Magazine and sessions
      </h2>
      <div className="container max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-0 md:gap-px bg-border/40 border border-border/50">
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
                Reading, essays, and voices that cross borders.
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
              Open the Magazine
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
                II — Sessions
              </p>
              <p
                className="text-[clamp(1.5rem,3vw,1.85rem)] font-medium text-foreground leading-tight mb-6"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}
              >
                Next sessions, seasons, registered interest.
              </p>
              <p
                className="text-[15px] leading-relaxed text-muted-foreground max-w-md"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Possible lines in Bologna: leave your interest by theme; when the programme firms up, you receive format
                and dates—not a cart that stays open by default.
              </p>
            </div>
            <p
              className="mt-8 text-[13px] uppercase tracking-[0.14em] text-foreground group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Go to sessions
              <ArrowRight size={14} strokeWidth={1.75} className="opacity-70" aria-hidden />
            </p>
          </Link>
        </div>
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
        <p
          className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground mb-4 [font-family:var(--font-mono)]"
        >
          READING
        </p>
        <h2
          id="home-latest-reads-heading"
          className="font-medium text-foreground"
          style={{
            fontFamily: "'Spectral', Georgia, serif",
            fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
            fontWeight: 500,
          }}
        >
          From the desk
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {loading
            ? Array.from({ length: 3 }, (_, i) => <ArticleCardSkeleton key={i} />)
            : articles.map((article) => <ArticleCard key={article._id} article={article} />)}
        </div>
        <div className="mt-10">
          <Link
            href={localizedHref("/articoli")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            All pieces
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
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
        <Reveal className="max-w-[560px] mx-auto text-center">
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
            Stay in the narrative
          </h2>
          <p
            className="text-[16px] text-muted-foreground leading-[1.75] mb-6"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Few letters, only when there is material to add to the notebook. Cadence and contents are written out on the
            dedicated page.
          </p>
          <Link
            href={localizedHref("/newsletter")}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:opacity-80 transition-opacity mb-8"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Notes on what we send <ArrowRight size={14} />
          </Link>
          <NewsletterSubscribeForm
            source="home"
            variant="home"
            showUnsubscribeHint
            calmSubscribeErrors
            submitButtonLabel="Leave your address"
            successTitle="Address recorded."
            successBody="We write from this inbox only when the notebook has something to add. Meanwhile: which thread between Bologna and Taipei do you want to keep in sight—without closing it into a slogan?"
            calmErrorTitle="The send did not go through from here."
            calmErrorBodyPrefix="Try again in a moment, or open the newsletter page:"
            unsubscribeHintText="You can leave the list anytime."
            emailPlaceholder="Your email"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function HomeEN() {
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
