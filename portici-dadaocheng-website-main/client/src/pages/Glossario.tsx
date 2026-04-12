import { PageHeader } from "@/components/PageHeader";

export default function Glossario() {
  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Glossario"
        meta="Lessico · Taiwan · Cibo"
        title="Indice del glossario"
      >
        <p>
          Raccolta di termini (luoghi, ingredienti, concetti) con definizioni brevi e collegamenti
          agli articoli. Struttura in espansione per supportare la ricerca e la SEO semantica.
        </p>
      </PageHeader>
      <section className="py-14 md:py-16 px-6 md:px-10">
        <div className="container max-w-3xl mx-auto">
          <p className="text-muted-foreground text-sm [font-family:var(--font-body)] leading-relaxed mb-6">
            Elenco alfabetico e filtri per tema saranno aggiunti nella fase successiva.
          </p>
          <div
            className="rounded-md border border-dashed border-border bg-muted/20 p-10 text-center text-muted-foreground text-sm [font-family:var(--font-ui)]"
            aria-hidden
          >
            Lista termini — placeholder
          </div>
        </div>
      </section>
    </main>
  );
}
