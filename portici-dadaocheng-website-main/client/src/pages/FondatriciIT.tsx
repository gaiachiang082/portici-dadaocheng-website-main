import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";

const MISSION_VISION_METHOD = [
  {
    label: "Missione",
    text: "Creare esperienze culturali che rivelano come culture diverse dell'Asia orientale rispondono alle stesse domande umane in modi sorprendentemente diversi.",
  },
  {
    label: "Visione",
    text: "Un mondo dove 'diverso' non significa 'estraneo', ma 'affascinante'. Dove Bologna diventa un modello di come una città europea può essere allo stesso tempo profondamente locale e genuinamente cosmopolita.",
  },
  {
    label: "Metodo",
    text: "同中求異 — Trovare le differenze nell'unità. Partiamo sempre dalla stessa domanda: come rispondono culture diverse allo stesso bisogno umano?",
  },
] as const;

const VALUES = [
  { it: "Curiosità", zh: "好奇心", desc: "Non accettiamo 'così è sempre stato' come risposta finale." },
  { it: "Rispetto", zh: "尊重", desc: "Esploriamo culture diverse come studenti rispettosi, non come turisti." },
  { it: "Autenticità", zh: "真實性", desc: "Preferiamo una tazza scheggiata fatta a mano a una perfetta prodotta in massa." },
  { it: "Trasformazione", zh: "轉化", desc: "Non ci interessa solo informare, ma trasformare." },
  { it: "Inclusività", zh: "包容", desc: "Un progetto per chiunque abbia curiosità, indipendentemente dal background." },
] as const;

const serifBody = "text-[18px] text-muted-foreground leading-[1.85] [font-family:var(--font-body)]";
const serifBodyStrong = "text-foreground font-medium";

export default function FondatriciIT() {
  const localizedHref = useLocalizedHref();
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Fondatrici"
        meta="Portici DaDaocheng"
        className="pb-16 md:pb-20"
        title="Due persone, un solo invito: restare curiosi tra culture"
      >
        <p>
          Abbiamo immaginato Portici DaDaocheng come uno spazio lento, dove si raccontano incontri veri — non cataloghi di
          esotismi. Qui trovate chi siamo, perché esiste questo progetto, e come potete entrarci.
        </p>
      </PageHeader>

      {/* Manifesto / quote */}
      <section className="py-14 md:py-16 bg-muted/40 border-y border-border">
        <div className="container max-w-2xl mx-auto px-6 md:px-10">
          <blockquote className="text-[1.125rem] md:text-[1.25rem] text-foreground leading-[1.65] border-l-2 border-[var(--riso-red)] pl-6 md:pl-8 [font-family:var(--font-body)]">
            <span className="text-[var(--riso-gold)] not-italic font-normal tracking-wide">同中求異</span>
            <span className="text-muted-foreground"> — </span>
            Trovare le differenze nell&apos;unità. Partiamo dalla stessa domanda: come rispondono culture diverse allo stesso
            bisogno umano?
          </blockquote>
        </div>
      </section>

      {/* Two founders */}
      <section className="py-20 md:py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-14 md:gap-16 lg:gap-20">
            <article>
              <div
                className="aspect-[3/4] max-w-[280px] mb-8 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm text-center px-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Ritratto (in arrivo)
              </div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Co-fondatrice
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Ricerca e dialogo con l&apos;Asia orientale
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Taipei · memoria viva, tè, artigianato
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  Porto con me la curiosità per i quartieri che non smettono di reinventarsi: dove il commercio, il rito e la
                  quotidianità si mescolano senza slogan. Il mio lavoro qui è tenere aperta la conversazione tra radici e
                  domande nuove.
                </p>
                <p>
                  Credo che raccontare l&apos;Asia orientale in Italia significhi evitare sia il folklore sia la lezione: servono
                  incontri, tavoli lunghi, silenzi utili.
                </p>
              </div>
            </article>
            <article>
              <div
                className="aspect-[3/4] max-w-[280px] mb-8 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm text-center px-4"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Ritratto (in arrivo)
              </div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Co-fondatrice
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Ospitalità europea e fili narrativi
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Bologna · portici, accoglienza, patrimonio UNESCO
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  I portici mi hanno insegnato che si può camminare insieme restando diversi: un riparo condiviso, non una gabbia
                  di consenso. Da qui nasce il desiderio di offrire laboratori e testi che odorano di città reale, non di
                  vetrina.
                </p>
                <p>
                  Il mio contributo è costruire ponti editoriali e relazionali — far sentire Bologna come casa che sa guardare
                  lontano, senza smettere di essere sé stessa.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Shared story bridge — place as context, not hero */}
      <section className="py-20 md:py-24 bg-background border-t border-border">
        <div className="container max-w-3xl">
          <h2
            className="font-medium text-foreground mb-7"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
          >
            Il nostro brand nasce dall&apos;incontro di due luoghi
          </h2>
          <div className="brand-divider mb-8" role="presentation" aria-hidden />
          <div className="space-y-4">
            <p className={serifBody}>
              <strong className={serifBodyStrong}>大稻埕 (DadaoCheng)</strong> è un quartiere storico di Taipei dove dal XIX
              secolo commercianti da Cina, Giappone e Occidente si incontravano per scambiare tè, tessuti e idee. Un luogo dove
              antico e nuovo convivono, dove la tradizione e la modernità non sono in conflitto ma in conversazione.
            </p>
            <p className={serifBody}>
              <strong className={serifBodyStrong}>Bologna</strong> — città di portici, la più lunga rete di passaggi coperti al
              mondo (38 km), dichiarata patrimonio UNESCO. Una città che, come DadaoCheng, sa come accogliere lo straniero senza
              perdere la propria identità.
            </p>
            <p className={serifBody}>
              Il nostro brand nasce dall&apos;incontro di questi due luoghi. I portici sono spazi intermedi — né dentro né fuori.
              Sono la metafora perfetta per ciò che vogliamo essere: uno spazio dove culture diverse possono incontrarsi e
              scoprire che fanno domande simili.
            </p>
          </div>
        </div>
      </section>

      {/* Missione / Visione / Metodo */}
      <section className="py-20 md:py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-3xl">
          <div className="space-y-10">
            {MISSION_VISION_METHOD.map(({ label, text }) => (
              <div key={label} className="border-l-2 border-secondary pl-6">
                <p
                  className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
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

      {/* Values — calmer grid */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="mb-12 md:mb-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              I nostri valori
            </p>
            <h2
              className="font-medium text-foreground"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
            >
              Cinque principi, una direzione
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {VALUES.map(({ it, zh, desc }) => (
              <div
                key={it}
                className="bg-card p-5 md:p-6 rounded-xl border border-border"
              >
                <p className="text-xl text-foreground mb-1" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                  {zh}
                </p>
                <p
                  className="text-sm font-semibold text-foreground mb-2"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {it}
                </p>
                <p
                  className="text-xs text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wayfinding */}
      <section className="py-12 md:py-14 bg-background border-y border-border">
        <div className="container max-w-3xl flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-8">
          <p
            className="text-sm text-muted-foreground w-full sm:w-auto sm:mr-2"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Continua a esplorare
          </p>
          <Link
            href={localizedHref("/magazine")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Magazine
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/eventi")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Sessioni
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/articoli")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Articoli
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-22 bg-[oklch(96.5%_0.006_85)] text-center">
        <div className="container max-w-lg mx-auto px-6">
          <h2
            className="font-medium text-foreground mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
          >
            Partecipa dal vivo
          </h2>
          <p
            className="text-[17px] text-muted-foreground leading-[1.8] mb-9"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Se questo vi incuriosisce, il Magazine e le sessioni dal vivo portano avanti gli stessi temi — il calendario
            segue la domanda.
          </p>
          <Link
            href={localizedHref("/eventi")}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Prossime sessioni
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
