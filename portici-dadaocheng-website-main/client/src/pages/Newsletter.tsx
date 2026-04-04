import { PageHeader } from "@/components/PageHeader";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";

const VALUE_BLOCKS = [
  {
    title: "Profondità",
    text: "Un solo tema alla volta, con calma: testi che meritano di essere letti seduti.",
  },
  {
    title: "Ritmo",
    text: "Un invio al mese. Niente urgenza artificiale, niente catene di promozioni.",
  },
  {
    title: "Inviti",
    text: "Quando c\u2019è qualcosa da vivere insieme — workshop o incontri — lo saprete per primi.",
  },
] as const;

export default function Newsletter() {
  return (
    <main className="bg-background">
      <PageHeader eyebrow="Newsletter" meta="Lettera aperta · Portici" title="Una prospettiva diversa, ogni mese">
        <p>
          Ricevete un articolo o una riflessione che non pubblichiamo altrove, un’idea per guardare meglio ciò che vi
          circonda, e di tanto in tanto l’invito a un incontro dal vivo.
        </p>
        <p className="text-page-header-dim">Niente spam. Solo cultura, nel rispetto del vostro tempo.</p>
      </PageHeader>

      <section className="py-14 md:py-16 border-b border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-6 text-[1.35rem] [font-family:var(--font-display)]">Iscriviti</h2>
          <NewsletterSubscribeForm source="newsletter" variant="page" showUnsubscribeHint />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-10">
            {VALUE_BLOCKS.map(({ title, text }) => (
              <div
                key={title}
                className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-6"
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
                  {title}
                </p>
                <p className="text-[17px] text-muted-foreground leading-relaxed [font-family:var(--font-body)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
