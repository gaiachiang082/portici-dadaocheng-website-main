import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";

/** Tre blocchi: niente mission statement chiuso — solo cosa annotiamo e cosa lasciamo aperto. */
const FIELD_NOTES = [
  {
    label: "Cosa annotiamo",
    text: "Ci muoviamo tra Dadaocheng e i portici di Bologna con la stessa domanda appuntata: come culture diverse piegano lo stesso bisogno umano su materiali e orari diversi. Non cataloghiamo risposte giuste.",
  },
  {
    label: "Cosa teniamo sospeso",
    text: "Evitiamo il folklore da vetrina e la lezione dall'alto. Preferiamo tavoli stretti, silenzi utili, testi che si possono rileggere — e ammettere quando una risposta non ci basta ancora.",
  },
  {
    label: "Come lavoriamo",
    text: "同中求異 — cerchiamo le differenze dentro ciò che sembra unito. Il trimestrale e le sessioni dal vivo sono due modi di tenere ferma la stessa linea, non due reparti separati.",
  },
] as const;

const VALUES = [
  { it: "Curiosità", zh: "好奇心", desc: "Non ci bastano le frasi 'è sempre stato così': vogliamo sapere chi le ha dette, dove, e con quale mano." },
  { it: "Rispetto", zh: "尊重", desc: "Stiamo sedute al tavolo come chi impara, non come pubblico in platea." },
  { it: "Concretezza", zh: "具體", desc: "Preferiamo nome di via, odore di tè, ceramica scheggiata a slogan che suonano da brochure." },
  { it: "Residuo", zh: "留存", desc: "Ci interessa cosa ti resta addosso dopo l'incontro — non la promessa di una trasformazione totale." },
  { it: "Accesso", zh: "近用", desc: "Teniamo il progetto aperto a chi arriva con una domanda precisa, non a un 'pubblico' generico." },
] as const;

const serifBody = "text-[18px] text-muted-foreground leading-[1.85] [font-family:var(--font-body)]";
const serifBodyStrong = "text-foreground font-medium";

export default function FondatriciIT() {
  const localizedHref = useLocalizedHref();
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Appunto dal campo"
        meta="Da Taipei ai portici di Bologna"
        className="pb-16 md:pb-20"
        title="Due persone che portano domande, non titoli"
      >
        <p>
          Questa pagina non è un curriculum. È un taccuino condiviso: come ci siamo incontrate tra il 亭仔腳 di Dadaocheng e
          le arcate di Bologna, e perché teniamo il progetto lento, con mani sporche d&apos;inchiostro e di farina quando serve.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          Cosa vorresti che restasse fuori da questo incontro tra due città — anche se ti incuriosisce leggerci?
        </p>
      </PageHeader>

      <section className="py-14 md:py-16 bg-muted/40 border-y border-border">
        <div className="container max-w-2xl mx-auto px-6 md:px-10">
          <blockquote className="text-[1.125rem] md:text-[1.25rem] text-foreground leading-[1.65] border-l-2 border-[var(--riso-red)] pl-6 md:pl-8 [font-family:var(--font-body)]">
            <span className="text-[var(--riso-gold)] not-italic font-normal tracking-wide">同中求異</span>
            <span className="text-muted-foreground"> — </span>
            Non siamo qui per chiudere il cerchio: annotiamo come culture diverse rispondono allo stesso bisogno umano con
            gesti che non coincidono.
          </blockquote>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container max-w-5xl">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Chi tiene il taccuino in due città
          </p>
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
                style={{ fontFamily: "var(--font-ui)" }}
              >
                In campo · Taipei
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Dadaocheng: vicoli, tè, botteghe che cambiano pelle
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Quartieri che non smettono di rimischiare commercio, rito e quotidianità
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  Cammino per strade dove il mattone e la lamiera si alternano senza chiedere permesso. Il mio lavoro è
                  restare accanto a chi vende, chi prega, chi chiude la serranda — e portare in Italia domande nate lì,
                  non etichette pronte.
                </p>
                <p>
                  Non sono un&apos;autorità sull&apos;Asia orientale: sono qualcuno che traduce incontri in testi e
                  laboratori, sapendo che ogni pagina lascia fuori qualcosa.
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
                style={{ fontFamily: "var(--font-ui)" }}
              >
                In campo · Bologna
              </p>
              <h2
                className="font-medium text-[oklch(27.5%_0.000_0)] mb-1"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.5rem", fontWeight: 500 }}
              >
                Sotto i portici: ombra fissa, passi che non si allineano
              </h2>
              <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Arcate, pietra, città che cammina anche quando piove
              </p>
              <div className={`space-y-4 ${serifBody}`}>
                <p>
                  I portici mi hanno insegnato che si può dividere lo stesso riparo restando su traiettorie diverse. Da qui
                  costruiamo inviti al tavolo — odore di città vera, non allestimento da fiere.
                </p>
                <p>
                  Il mio compito è tenere aperto il filo editoriale tra Bologna e Taipei senza appiattire né le une né
                  l&apos;altra: due suoli, due ritmi, stesse domande messe in parallelo.
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
            Perché due luoghi sullo stesso foglio
          </h2>
          <div className="brand-divider mb-8" role="presentation" aria-hidden />
          <div className="space-y-4">
            <p className={serifBody}>
              <strong className={serifBodyStrong}>Dadaocheng</strong> è un quartiere di Taipei dove, da oltre un secolo,
              si incrociano merci, lingue e idee — tè, tessuti, botteghe che oggi convivono con cavi e condizionatori. Non è
              uno sfondo romantico: è pietra, umidità, prezzi appuntati a mano.
            </p>
            <p className={serifBody}>
              <strong className={serifBodyStrong}>Bologna</strong> è città di portici — chilometri di passaggi coperti
              dove la pioggia non ferma il passo. Anche qui l&apos;incontro è quotidiano: studenti, mercato, turisti che
              sbagliano strada.
            </p>
            <p className={serifBody}>
              Per noi i portici (qui e là) sono corridoi dove ci si ferma senza dover condividere la stessa conclusione.
              Teniamo le due città sullo stesso foglio per chiederci, ogni volta: cosa resta fuori cornice quando le
              affianchi?
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
              Come teniamo il filo
            </p>
            <h2
              className="font-medium text-foreground"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
            >
              Cinque appigli, una bussola mobile
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6">
            {VALUES.map(({ it, zh, desc }) => (
              <div key={it} className="bg-card p-5 md:p-6 rounded-xl border border-border">
                <p className="text-xl text-foreground mb-1" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                  {zh}
                </p>
                <p
                  className="text-sm font-semibold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {it}
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
            Altrove sul sito
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
            Sessioni
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href={localizedHref("/articoli")}
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Articoli
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-22 bg-[oklch(96.5%_0.006_85)] text-center">
        <div className="container max-w-lg mx-auto px-6">
          <h2
            className="font-medium text-foreground mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.75rem", fontWeight: 500 }}
          >
            Dal taccuino alle date in calendario
          </h2>
          <p
            className="text-[17px] text-muted-foreground leading-[1.8] mb-9"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Se questo filo ti sta a cuore, Magazine e sessioni seguono le stesse domande: il calendario si apre quando la
            richiesta regge il tavolo — non il contrario.
          </p>
          <Link
            href={localizedHref("/eventi")}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Linee e date
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
