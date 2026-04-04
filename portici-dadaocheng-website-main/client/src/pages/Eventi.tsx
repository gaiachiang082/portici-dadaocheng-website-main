import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ProgramInterestSection } from "@/components/ProgramInterestSection";

const INTEREST_STEPS = [
  {
    n: "1",
    title: "Linee curate",
    text: "Presentiamo concetti di laboratorio e serate dal vivo come estensioni del racconto editoriale — non come catalogo fisso.",
  },
  {
    n: "2",
    title: "Raccogliamo interesse",
    text: "Lasciate email e, se volete, una nota: ci aiuta a capire su quali temi concentrare energie e stagioni.",
  },
  {
    n: "3",
    title: "Raggruppiamo la domanda",
    text: "Per ogni linea osserviamo quante persone si sono mosse. Quando ha senso, definiamo formato, durata e fascia di prezzo.",
  },
  {
    n: "4",
    title: "Vi scriviamo con le date",
    text: "Chi ha manifestato interesse riceve prima le informazioni su sessioni confermate. Il pagamento arriva quando il programma è reale.",
  },
] as const;

export default function Eventi() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Sessioni dal vivo"
        meta="Bologna · programma in evoluzione"
        title="Il calendario segue la curiosità — non il contrario"
      >
        <p>
          Gli incontri dal vivo sono estensioni del nostro lavoro editoriale: stesse domande, mani e tavolo. In questa
          fase il sito funziona da piattaforma culturale: il Magazine e la newsletter portano il racconto; le sessioni si
          aprono quando la domanda lo giustifica.
        </p>
        <p className="text-page-header-dim">
          Niente promessa di disponibilità continua: proponiamo linee possibili, raccogliamo interesse, poi costruiamo
          stagioni e pilota. Il flusso di pagamento diretto resta solo per chi ha già ricevuto un invito.
        </p>
      </PageHeader>

      <ProgramInterestSection className="py-14 md:py-18 border-b border-border" showLegacyBookingHint />

      <section className="py-14 md:py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-2 text-[1.35rem] [font-family:var(--font-display)]">
            Come funziona oggi
          </h2>
          <p className="text-sm text-muted-foreground mb-10" style={{ fontFamily: "var(--font-ui)" }}>
            Dal tema all&apos;invito — senza carrello in prima pagina.
          </p>
          <ol className="space-y-8 list-none p-0 m-0">
            {INTEREST_STEPS.map(({ n, title, text }) => (
              <li key={n} className="flex gap-5">
                <span
                  className="shrink-0 w-9 h-9 rounded-full border border-border text-foreground flex items-center justify-center text-sm font-semibold"
                  style={{ fontFamily: "var(--font-ui)" }}
                  aria-hidden
                >
                  {n}
                </span>
                <div>
                  <p className="font-medium text-foreground mb-1" style={{ fontFamily: "var(--font-ui)", fontSize: "1rem" }}>
                    {title}
                  </p>
                  <p className="text-[16px] text-muted-foreground leading-relaxed [font-family:var(--font-body)]">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-6 text-[1.35rem] [font-family:var(--font-display)]">
            Racconto e programma
          </h2>
          <ul className="space-y-8">
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Prima le letture
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                Il Magazine è il luogo dove teniamo ferma la linea culturale. Da lì capite tono, immagini e perché
                certe sessioni esistono.
              </p>
              <Link
                href="/magazine"
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Apri il Magazine <ArrowRight size={14} />
              </Link>
            </li>
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Restare nel filo
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                Una mail al mese: stesso spirito del sito, senza rumore. Complementare rispetto alla manifestazione di
                interesse sulle sessioni.
              </p>
              <Link
                href="/newsletter"
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Pagina newsletter <ArrowRight size={14} />
              </Link>
            </li>
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Immagini e filosofia
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                Per approfondire calligrafia, cucina e percorso visivo — senza passare dal calendario.
              </p>
              <Link
                href="/workshop"
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Laboratori — visione d&apos;insieme <ArrowRight size={14} />
              </Link>
              <span className="text-muted-foreground mx-2">·</span>
              <Link
                href="/workshop/calligraphy"
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Calligrafia <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/20 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-4 text-[1.25rem] [font-family:var(--font-display)]">Dove siamo</h2>
          <p className="text-[16px] text-muted-foreground leading-[1.75] mb-6 [font-family:var(--font-body)]">
            La base è a <strong className="text-foreground font-medium">Bologna</strong>; l&apos;indirizzo preciso viene
            comunicato quando una sessione è confermata. A volte portiamo esperienze in pop-up altrove.
          </p>
          <Link
            href="/contatti"
            className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Contatti <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
          <p className="text-sm text-muted-foreground w-full sm:w-auto sm:mr-2" style={{ fontFamily: "var(--font-ui)" }}>
            Altrove sul sito
          </p>
          <Link
            href="/magazine"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Magazine
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href="/newsletter"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Newsletter
          </Link>
          <span className="hidden sm:inline text-border">·</span>
          <Link
            href="/contatti"
            className="text-sm font-medium text-primary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Contatti
          </Link>
        </div>
      </section>
    </main>
  );
}
