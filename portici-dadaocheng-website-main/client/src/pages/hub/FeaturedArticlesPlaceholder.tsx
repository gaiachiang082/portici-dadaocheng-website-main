/**
 * Shared placeholder for topic hubs: will host curated article cards.
 */
export function FeaturedArticlesPlaceholder() {
  return (
    <section className="py-14 md:py-16 px-6 md:px-10 border-t border-border bg-muted/20">
      <div className="container max-w-4xl mx-auto">
        <h2
          className="font-medium text-foreground mb-2 text-[1.35rem] [font-family:var(--font-display)]"
        >
          Articoli in evidenza
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl [font-family:var(--font-body)] leading-relaxed">
          Qui collegheremo letture scelte per questo tema. Struttura SEO e contenuti in arrivo.
        </p>
        <div
          className="rounded-md border border-dashed border-border bg-background/80 p-10 text-center text-muted-foreground text-sm [font-family:var(--font-ui)]"
          aria-hidden
        >
          Blocco articoli — placeholder
        </div>
      </div>
    </section>
  );
}
