import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const STEPS = [
  {
    n: "1",
    title: "Scegli il laboratorio",
    text: "Nel calendario trovi titoli, durata e prezzo per persona. Niente sorprese prima di prenotare.",
  },
  {
    n: "2",
    title: "Prenota la data",
    text: "Selezioni la sessione che fa per voi. I posti sono limitati per mantenere un ritmo umano.",
  },
  {
    n: "3",
    title: "Completi i dati",
    text: "Nome, contatti e numero di partecipanti. Potete lasciare una nota se serve.",
  },
  {
    n: "4",
    title: "Conferma e pagamento",
    text: "Il pagamento avviene in modo sicuro online. Riceverete conferma e dettagli pratici via email.",
  },
] as const;

export default function Eventi() {
  return (
    <main className="bg-background">
      <PageHeader eyebrow="Eventi" meta="Calendario · Bologna" title="Partecipare, senza fretta">
        <p>
          Gli incontri dal vivo sono il cuore di Portici: laboratori in piccolo gruppo, mani e parole, tempo per restare.
          Questa pagina serve a orientarvi — il calendario vero e la prenotazione stanno un solo passo dopo.
        </p>
        <p className="text-page-header-dim">
          Niente catalogo infinito: ciò che offriamo ha un filo narrativo. Per approfondire filosofia e immagini,
          c&apos;è la pagina Workshop.
        </p>
      </PageHeader>

      <section className="py-14 md:py-16 border-b border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-4 text-[1.35rem] [font-family:var(--font-display)]">
            Calendario e prenotazione
          </h2>
          <p className="text-[17px] text-muted-foreground leading-[1.75] mb-8 max-w-2xl [font-family:var(--font-body)]">
            Aprite il calendario, scegliete sessione e data. Lì trovate disponibilità aggiornate e il flusso fino al
            pagamento.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 items-start">
            <Link
              href="/workshops"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Vai al calendario
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/workshop"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:underline underline-offset-4 pt-2 sm:pt-3"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Scopri la pagina Workshop
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-2 text-[1.35rem] [font-family:var(--font-display)]">
            Come funziona
          </h2>
          <p
            className="text-sm text-muted-foreground mb-10"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            In sintesi — il dettaglio resta sul modulo di prenotazione.
          </p>
          <ol className="space-y-8 list-none p-0 m-0">
            {STEPS.map(({ n, title, text }) => (
              <li key={n} className="flex gap-5">
                <span
                  className="shrink-0 w-9 h-9 rounded-full border border-border text-foreground flex items-center justify-center text-sm font-semibold"
                  style={{ fontFamily: "var(--font-ui)" }}
                  aria-hidden
                >
                  {n}
                </span>
                <div>
                  <p
                    className="font-medium text-foreground mb-1"
                    style={{ fontFamily: "var(--font-ui)", fontSize: "1rem" }}
                  >
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
            Percorsi tematici
          </h2>
          <ul className="space-y-6">
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Panorama
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                Linee di calligrafia, tè, cucina e cultura visiva — raccontate con immagini e filtri.
              </p>
              <Link
                href="/workshop"
                className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Pagina Workshop <ArrowRight size={14} />
              </Link>
            </li>
            <li className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-5">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Calligrafia e inchiostro
              </p>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-3 [font-family:var(--font-body)]">
                Approfondimento dedicato a corsi e immagini del percorso calligrafico.
              </p>
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
          <h2 className="font-medium text-foreground mb-4 text-[1.25rem] [font-family:var(--font-display)]">
            Dove siamo
          </h2>
          <p className="text-[16px] text-muted-foreground leading-[1.75] mb-6 [font-family:var(--font-body)]">
            La base è a <strong className="text-foreground font-medium">Bologna</strong>; l&apos;indirizzo preciso viene
            comunicato ai partecipanti confermati. A volte portiamo l&apos;esperienza in pop-up in altre città.
          </p>
          <Link
            href="/spazio"
            className="text-[15px] font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Spazio e concept <ArrowRight size={14} />
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
