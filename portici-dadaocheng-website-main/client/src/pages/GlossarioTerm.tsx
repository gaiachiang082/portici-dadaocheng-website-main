import { Link, useParams } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useLocalizedHref } from "@/contexts/LangContext";

export default function GlossarioTerm() {
  const params = useParams<{ term: string }>();
  const rawTerm = params?.term ?? "";
  const termSlug = decodeURIComponent(rawTerm);
  const localizedHref = useLocalizedHref();
  const glossarioHref = localizedHref("/glossario");

  return (
    <main className="bg-background">
      <PageHeader
        eyebrow="Glossario"
        meta={termSlug || "—"}
        title={termSlug || "Voce"}
      >
        <p>
          Scheda lessicale per la voce selezionata. Definizione estesa, note culturali e link
          interni saranno collegati qui.
        </p>
      </PageHeader>
      <section className="py-10 md:py-12 px-6 md:px-10">
        <div className="container max-w-3xl mx-auto space-y-8">
          <p className="text-sm text-muted-foreground [font-family:var(--font-mono)]">
            Parametro URL (slug): <span className="text-foreground">{rawTerm || "(mancante)"}</span>
          </p>
          <div
            className="rounded-md border border-dashed border-border bg-muted/20 p-10 text-center text-muted-foreground text-sm [font-family:var(--font-ui)]"
            aria-hidden
          >
            Corpo definizione — placeholder
          </div>
          <Link
            href={glossarioHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity [font-family:var(--font-ui)]"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            Torna al glossario
          </Link>
        </div>
      </section>
    </main>
  );
}
