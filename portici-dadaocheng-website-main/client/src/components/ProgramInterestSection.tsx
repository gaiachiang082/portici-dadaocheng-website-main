import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { PROGRAM_CONCEPTS, type ProgramConcept } from "@/data/programConcepts";
import { useLocalizedHref } from "@/contexts/LangContext";

const kindLabel: Record<ProgramConcept["kind"], string> = {
  cultural: "Linea culturale",
  hybrid: "Ibrido conviviale",
  exploratory: "In esplorazione",
};

type Props = {
  id?: string;
  className?: string;
  showLegacyBookingHint?: boolean;
};

/** Newsletter `source` column is varchar(64) — keep attribution prefix + slug within limit. */
function newsletterSourceFromTopicSlug(topicSlug: string): string {
  const raw = `interest_${topicSlug}`;
  return raw.length <= 64 ? raw : raw.slice(0, 64);
}

export function ProgramInterestSection({ id = "interesse", className = "", showLegacyBookingHint }: Props) {
  const localizedHref = useLocalizedHref();
  const [selectedSlug, setSelectedSlug] = useState<string>(PROGRAM_CONCEPTS[0]!.slug);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [alsoNewsletter, setAlsoNewsletter] = useState(false);

  const [refFromWorkshop, setRefFromWorkshop] = useState<{ slug: string; title: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interesse = params.get("interesse");
    const refSlug = params.get("refSlug");
    const refTitle = params.get("refTitle");
    if (refSlug && refTitle) {
      let title = refTitle;
      try {
        title = decodeURIComponent(refTitle);
      } catch {
        /* keep raw */
      }
      setRefFromWorkshop({ slug: refSlug, title });
      setSelectedSlug(`workshop-${refSlug}`);
      return;
    }
    if (interesse && PROGRAM_CONCEPTS.some((c) => c.slug === interesse)) {
      setSelectedSlug(interesse);
    }
  }, []);

  const selectedConcept = useMemo(() => PROGRAM_CONCEPTS.find((c) => c.slug === selectedSlug), [selectedSlug]);

  const resolvedTopic = useMemo(() => {
    if (refFromWorkshop && selectedSlug === `workshop-${refFromWorkshop.slug}`) {
      return {
        slug: `workshop-${refFromWorkshop.slug}`,
        title: refFromWorkshop.title,
      };
    }
    if (selectedConcept) {
      return { slug: selectedConcept.slug, title: selectedConcept.title };
    }
    return { slug: PROGRAM_CONCEPTS[0]!.slug, title: PROGRAM_CONCEPTS[0]!.title };
  }, [refFromWorkshop, selectedConcept, selectedSlug]);

  const register = trpc.programInterest.register.useMutation();
  const subscribeNewsletter = trpc.newsletter.subscribe.useMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    try {
      await register.mutateAsync({
        email: trimmedEmail,
        name: name.trim() || undefined,
        topicSlug: resolvedTopic.slug,
        topicTitle: resolvedTopic.title,
        note: note.trim() || undefined,
      });

      let extra = "";
      if (alsoNewsletter) {
        try {
          const sub = await subscribeNewsletter.mutateAsync({
            email: trimmedEmail,
            name: name.trim() || undefined,
            source: newsletterSourceFromTopicSlug(resolvedTopic.slug),
          });
          if (sub.alreadySubscribed) {
            extra = " Siete già nella newsletter — nessun duplicato.";
          } else {
            extra = " Riceverete anche il Magazine e le novità sulle sessioni (una mail al mese, senza spam).";
          }
        } catch {
          extra =
            " Interesse registrato. Per la newsletter, potete iscrivervi dalla pagina dedicata se volete completare l’iscrizione.";
        }
      }

      toast.success(`Grazie. Vi contatteremo quando ci sarà un aggiornamento su questa linea.${extra}`);
      setEmail("");
      setName("");
      setNote("");
      setAlsoNewsletter(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invio non riuscito. Riprovate tra poco.");
    }
  };

  const submitting = register.isPending || subscribeNewsletter.isPending;

  return (
    <section id={id} className={className}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p
          className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground mb-3"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          Prossime sessioni
        </p>
        <h2
          className="font-medium text-foreground mb-4 text-[clamp(1.35rem,2.8vw,1.75rem)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Linee possibili — raccogliamo interesse prima del calendario
        </h2>
        <p
          className="text-[17px] text-muted-foreground leading-[1.75] mb-10 max-w-2xl [font-family:var(--font-body)]"
        >
          Il programma dal vivo è stagionale e guidato dalla domanda. Scegliete una linea che vi interessa: quando ci
          sarà abbastanza interesse, scriviamo a chi si è registrato con date, formato e dettagli pratici.
        </p>

        {refFromWorkshop && (
          <p
            className="mb-8 text-sm text-foreground border-l-2 border-editorial-mark pl-4 py-1 [font-family:var(--font-body)]"
          >
            <span className="text-muted-foreground uppercase tracking-wider text-xs [font-family:var(--font-ui)]">
              Linea dal sito
            </span>
            <br />
            <span className="font-medium">{refFromWorkshop.title}</span>
          </p>
        )}

        <div className="grid lg:grid-cols-[1fr_minmax(0,380px)] gap-10 lg:gap-14 items-start">
          <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
            {PROGRAM_CONCEPTS.map((c) => {
              const on = selectedSlug === c.slug;
              return (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      setRefFromWorkshop(null);
                      setSelectedSlug(c.slug);
                    }}
                    className={`w-full text-left h-full rounded-xl border p-5 transition-colors ${
                      on
                        ? "border-editorial-mark bg-[color-mix(in_srgb,var(--editorial-mark)_8%,transparent)]"
                        : "border-border bg-card hover:bg-muted/40"
                    }`}
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2"
                      style={{ fontFamily: "var(--font-ui)" }}
                    >
                      {kindLabel[c.kind]}
                    </p>
                    <p className="font-medium text-foreground [font-family:var(--font-display)] text-[1.05rem] mb-1">
                      {c.title}
                    </p>
                    {c.titleZh && (
                      <p className="text-sm text-muted-foreground mb-2" lang="zh-Hant">
                        {c.titleZh}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed [font-family:var(--font-body)]">
                      {c.blurb}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="border border-border rounded-xl p-6 md:p-8 bg-muted/25">
            <h3
              className="text-[15px] font-medium text-foreground mb-1 [font-family:var(--font-ui)]"
            >
              Manifestate interesse
            </h3>
            <p className="text-sm text-muted-foreground mb-6 [font-family:var(--font-body)]">
              Tema selezionato: <strong className="text-foreground font-medium">{resolvedTopic.title}</strong>
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider [font-family:var(--font-ui)]">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider [font-family:var(--font-ui)]">
                  Nome (facoltativo)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5 uppercase tracking-wider [font-family:var(--font-ui)]">
                  Nota (facoltativo)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Es. sere feriali, livello principiante, gruppo di 3 persone…"
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-background text-foreground text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/30 resize-none"
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={alsoNewsletter}
                  onChange={(e) => setAlsoNewsletter(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring/30 shrink-0"
                />
                <span className="text-[13px] text-muted-foreground leading-snug [font-family:var(--font-body)] group-hover:text-foreground/90 transition-colors">
                  Vorrei anche ricevere il Magazine e notizie sulle prossime sessioni{" "}
                  <span className="text-muted-foreground/80">(newsletter facoltativa, circa una mail al mese).</span>
                </span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 [font-family:var(--font-ui)]"
              >
                {submitting ? "Invio…" : "Invia interesse"}
              </button>
            </form>

            {showLegacyBookingHint && (
              <p className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground leading-relaxed [font-family:var(--font-body)]">
                Se avete già ricevuto un invito con link al pagamento, potete accedere al{" "}
                <Link href={`${localizedHref("/workshops")}?booking=1`} className="text-primary underline-offset-4 hover:underline font-medium">
                  flusso di conferma riservato
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
