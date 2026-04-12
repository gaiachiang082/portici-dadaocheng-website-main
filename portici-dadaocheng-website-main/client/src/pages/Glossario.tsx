import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";
import { getAllGlossaryEntriesSorted } from "@/data/glossaryData";

export default function Glossario() {
  const localizedHref = useLocalizedHref();
  const entries = getAllGlossaryEntriesSorted();

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Glossario"
        meta="Lessico · Taiwan · Cibo"
        title="Indice del glossario"
      >
        <p>
          Qui teniamo voci come le annotiamo sul campo: nomi in trascrizione e caratteri originali, definizioni brevi e
          schede che collegano lessico a storia, politica e tavola. Utile per chi cerca da Google «che cos&apos;è nian
          gao», «significato zhengzong» — senza appiattire tutto in traduzioni comode.
        </p>
      </PageHeader>
      <section className="py-14 md:py-16 px-6 md:px-10" aria-labelledby="glossary-list-heading">
        <div className="container max-w-3xl mx-auto">
          <h2
            id="glossary-list-heading"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-8 [font-family:var(--font-mono)]"
          >
            Voci disponibili
          </h2>
          <ul className="space-y-6 list-none p-0 m-0">
            {entries.map((entry) => (
              <li key={entry.id}>
                <article className="rounded-xl border border-border bg-card/60 p-6 md:p-8 shadow-sm transition-colors hover:border-border/90">
                  <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
                    {entry.id}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3 [font-family:var(--font-display)]">
                    <Link
                      href={localizedHref(`/glossario/${entry.id}`)}
                      className="hover:text-[var(--riso-red)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)]/30 rounded-sm"
                    >
                      {entry.term}
                    </Link>
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-5 [font-family:var(--font-body)]">
                    {entry.shortDefinition}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={localizedHref(`/glossario/${entry.id}`)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground [font-family:var(--font-ui)] hover:opacity-85 transition-opacity"
                    >
                      Apri la scheda
                      <ArrowRight className="size-4 shrink-0 opacity-70" aria-hidden />
                    </Link>
                    <span className="text-muted-foreground/50 hidden sm:inline" aria-hidden>
                      ·
                    </span>
                    <Link
                      href={localizedHref(entry.relatedHub)}
                      className="text-sm text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground transition-colors [font-family:var(--font-body)]"
                    >
                      Hub collegato
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
