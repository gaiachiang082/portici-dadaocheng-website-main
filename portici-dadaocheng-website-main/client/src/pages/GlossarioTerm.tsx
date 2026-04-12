import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { GlossaryEntryBody } from "@/components/GlossaryEntryBody";
import { useLocalizedHref } from "@/contexts/LangContext";
import { getGlossaryEntryBySlug } from "@/data/glossaryData";

export default function GlossarioTerm() {
  const params = useParams<{ term: string }>();
  const rawTerm = params?.term ?? "";
  const termSlug = decodeURIComponent(rawTerm);
  const localizedHref = useLocalizedHref();
  const glossarioHref = localizedHref("/glossario");
  const entry = termSlug ? getGlossaryEntryBySlug(termSlug) : undefined;

  if (!entry) {
    return (
      <main className="bg-background">
        <section className="pt-32 pb-24 px-6 md:px-10">
          <div className="container max-w-xl mx-auto text-center">
            <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-4 [font-family:var(--font-mono)]">
              Glossario
            </p>
            <h1
              className="text-foreground font-semibold mb-4 text-[clamp(1.5rem,3.5vw,2rem)] [font-family:var(--font-display)] leading-tight"
            >
              Nel taccuino non c&apos;è ancora questa nota
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2 [font-family:var(--font-body)] text-[1.0625rem]">
              La voce che cerchi —{" "}
              <span className="text-foreground/90 font-mono text-sm">{termSlug || "—"}</span> — non è ancora stata
              archiviata qui. Le schede crescono a ritmo di ricerca, non di calendario editoriale.
            </p>
            <p className="text-sm text-muted-foreground/90 mb-10 [font-family:var(--font-body)]">
              Se hai un termine da proporre, passa dai contatti del sito; intanto puoi esplorare le voci già aperte.
            </p>
            <Link
              href={glossarioHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground text-background px-6 py-3 text-sm font-medium [font-family:var(--font-ui)] hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="size-4 shrink-0" aria-hidden />
              Torna all&apos;indice del glossario
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background">
      <PageHeader eyebrow="Glossario" meta={entry.id} title={entry.term}>
        <p className="text-[1.0625rem] leading-[1.75]">{entry.shortDefinition}</p>
      </PageHeader>
      <section className="py-10 md:py-14 px-6 md:px-10 border-t border-border/60">
        <div className="container max-w-3xl mx-auto space-y-10">
          <GlossaryEntryBody body={entry.body} localizedHref={localizedHref} />
          <div className="pt-6 border-t border-border/50">
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
              Percorso tematico
            </p>
            <p className="text-[15px] text-muted-foreground [font-family:var(--font-body)] leading-relaxed mb-4">
              Questa voce è legata al hub{" "}
              <Link
                href={localizedHref(entry.relatedHub)}
                className="text-foreground font-medium underline underline-offset-4 decoration-border hover:text-[var(--riso-red)] transition-colors"
              >
                {entry.relatedHubTitle}
              </Link>
              .
            </p>
            <Link
              href={glossarioHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-ui)]"
            >
              <ArrowLeft className="size-4 shrink-0" aria-hidden />
              Torna al glossario
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
