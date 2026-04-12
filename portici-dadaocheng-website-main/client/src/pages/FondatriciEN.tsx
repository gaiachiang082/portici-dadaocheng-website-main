import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";

const FIELD_NOTES = [
  {
    label: "What we jot down",
    text: "We move between Taipei’s Dadaocheng and Bologna’s porticoes with the same question pinned to the page: how different cultures fold the same human need across different materials and hours. We do not file tidy answers.",
  },
  {
    label: "What we leave open",
    text: "We sidestep window-dressing folklore and the lecture from above. We prefer narrow tables, useful silence, texts you can reread — and admitting when an answer still does not hold.",
  },
  {
    label: "How we work",
    text: "同中求異 — we look for difference inside what looks the same. The quarterly and in-person sessions are two ways to hold one line, not two separate departments.",
  },
] as const;

const VALUES = [
  {
    en: "Curiosity",
    zh: "好奇心",
    desc: "Slogans like ‘it has always been this way’ are not enough for us: we want to know who said it, where, and with which hand.",
  },
  {
    en: "Respect",
    zh: "尊重",
    desc: "We sit at the table as people who learn, not as an audience in rows.",
  },
  {
    en: "Concrete detail",
    zh: "具體",
    desc: "We prefer a street name, the smell of tea, a chipped bowl to language that reads like a brochure.",
  },
  {
    en: "What remains",
    zh: "留存",
    desc: "We care what stays with you after the encounter — not the promise of a total makeover.",
  },
  {
    en: "Access",
    zh: "近用",
    desc: "We keep the project open to those who arrive with a precise question, not to a generic ‘public’.",
  },
] as const;

const serifBody = "text-[18px] text-muted-foreground leading-[1.85] [font-family:var(--font-body)]";
const serifBodyStrong = "text-foreground font-medium";

export default function FondatriciEN() {
  const localizedHref = useLocalizedHref();
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Field note"
        meta="From Taipei to Bologna’s porticoes"
        className="pb-16 md:pb-20"
        title="Two people carrying questions, not résumés"
      >
        <p>
          This page is not a CV. It is a shared notebook: how we met between the 亭仔腳 of Dadaocheng and the arcades of
          Bologna, and why we keep the project slow — with ink- or flour-stained hands when the work asks for it.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          What would you want left outside this encounter between two cities — even if you are only lightly curious?
        </p>
      </PageHeader>

      <section className="py-14 md:py-16 bg-muted/40 border-y border-border">
        <div className="container max-w-2xl mx-auto px-6 md:px-10">
          <blockquote className="text-[1.125rem] md:text-[1.25rem] text-foreground leading-[1.65] border-l-2 border-[var(--riso-red)] pl-6 md:pl-8 [font-family:var(--font-body)]">
            <span className="text-[var(--riso-gold)] not-italic font-normal tracking-wide">同中求異</span>
            <span className="text-muted-foreground"> — </span>
            We are not here to close the circle: we note how different cultures answer the same human need with gestures
            that do not line up.
          </blockquote>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-5xl">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Who holds the notebook in two cities
          </p>
          <div className="grid md:grid-cols-2 gap-14 md:gap-16 lg:gap-20">
            <article>
              <div
                className="aspect-[3/4] max-w-[280px] mb-8 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm text-center px-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Portrait (forthcoming)
              </div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                In the field · Taipei
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Dadaocheng: lanes, tea, shops that keep changing their skin
              </h2>
              <p className="text-sm text-muted-foreground mb-6" style={{ fontFamily: "var(--font-ui)" }}>
                Neighbourhoods that never stop mixing trade, ritual, and the everyday
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  I walk streets where brick and sheet metal alternate without asking permission. My work is to stay next
                  to those who sell, who pray, who pull the shutter down — and to bring questions born there to Italy,
                  not ready-made labels.
                </p>
                <p>
                  <strong className={serifBodyStrong}>We are not an authority on East Asia:</strong> we are people who
                  turn encounters into text and labs, knowing every page leaves something out.
                </p>
              </div>
            </article>
            <article>
              <div
                className="aspect-[3/4] max-w-[280px] mb-8 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm text-center px-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Portrait (forthcoming)
              </div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                In the field · Bologna
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Under the porticoes: steady shade, strides that never quite match
              </h2>
              <p className="text-sm text-muted-foreground mb-6" style={{ fontFamily: "var(--font-ui)" }}>
                Arcades, stone, a city that keeps walking when it rains
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  The porticoes taught me you can share the same shelter and still move on different lines. From here we
                  build invitations to the table — the smell of a real city, not a fair stand.
                </p>
                <p>
                  My job is to keep the editorial thread open between Bologna and Taipei without flattening either soil:
                  two grounds, two tempos, the same questions held side by side.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background border-t border-border">
        <div className="container max-w-3xl">
          <h2
            className="font-medium text-foreground mb-7"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
          >
            Why two places on the same sheet
          </h2>
          <div className="brand-divider mb-8" role="presentation" aria-hidden />
          <div className="space-y-4">
            <p className={serifBody}>
              <strong className={serifBodyStrong}>Dadaocheng</strong> is a district of Taipei where, for more than a
              century, goods, languages, and ideas have crossed — tea, cloth, shops that now share space with cables and
              air conditioners. It is not a romantic backdrop: it is stone, humidity, prices written by hand.
            </p>
            <p className={serifBody}>
              <strong className={serifBodyStrong}>Bologna</strong> is a city of porticoes — kilometres of covered walks
              where rain does not stop the step. Here too encounter is daily: students, market stalls, visitors who
              take the wrong turn.
            </p>
            <p className={serifBody}>
              For us, porticoes (here and there) are corridors where you can pause without sharing one conclusion. We
              keep both cities on the same sheet to ask, each time: what stays outside the frame when you set them next to
              each other?
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-3xl">
          <div className="space-y-10">
            {FIELD_NOTES.map(({ label, text }) => (
              <div key={label} className="border-l-2 border-secondary pl-6">
                <p
                  className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {label}
                </p>
                <p
                  className="text-[oklch(40%_0.005_60)] leading-relaxed text-[17px]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="mb-12 md:mb-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              How we hold the thread
            </p>
            <h2
              className="font-medium text-foreground"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
            >
              Five handholds, one movable compass
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {VALUES.map(({ en, zh, desc }) => (
              <div key={en} className="bg-card p-5 md:p-6 rounded-xl border border-border">
                <p className="text-xl text-foreground mb-1" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                  {zh}
                </p>
                <p className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-ui)" }}>
                  {en}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-background border-y border-border">
        <div className="container max-w-3xl flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-8">
          <p className="text-sm text-muted-foreground w-full sm:w-auto sm:mr-2" style={{ fontFamily: "var(--font-ui)" }}>
            Elsewhere on the site
          </p>
          <Link
            href={localizedHref("/magazine")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Magazine
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/eventi")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Sessions
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/articoli")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Articles
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-22 bg-[oklch(96.5%_0.006_85)] text-center">
        <div className="container max-w-lg mx-auto px-6">
          <h2
            className="font-medium text-foreground mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
          >
            From the notebook to dates on the calendar
          </h2>
          <p
            className="text-[17px] text-muted-foreground leading-[1.8] mb-9"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            If this thread matters to you, the Magazine and sessions follow the same questions: the calendar opens when
            demand can hold the table — not the other way around.
          </p>
          <Link
            href={localizedHref("/eventi")}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Lines and dates
            <ArrowRight size={14} />
          </Link>
          <p
            className="text-sm text-muted-foreground mt-8 max-w-md mx-auto leading-relaxed [font-family:var(--font-body)]"
          >
            Which city would you want to hear from first in our next note — and what would you ask us to leave unsaid?
          </p>
        </div>
      </section>
    </main>
  );
}
