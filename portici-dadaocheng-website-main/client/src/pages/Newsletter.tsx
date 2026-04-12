import { PageHeader } from "@/components/PageHeader";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";

const VALUE_BLOCKS = [
  {
    title: "Profondità",
    text: "Un tema alla volta, su carta o in sala: testi che chiedono di fermarsi, non di scorrere.",
    closing: "Quanto tempo riesci a tenere una lettura lunga oggi, senza doverlo giustificare a nessuno?",
  },
  {
    title: "Ritmo",
    text: "Non teniamo un calendario di posta fisso: a volte due note vicine, a volte settimane senza nulla in casella.",
    closing: "Cosa ti fa più diffidenza — un silenzio lungo o una mail che arriva troppo prevedibile?",
  },
  {
    title: "Inviti",
    text: "Quando una sessione ha data e luogo a Bologna te lo segniamo qui; non è un carrello sempre aperto.",
    closing: "Preferisci sapere prima il tema o prima il giorno sul calendario?",
  },
] as const;

export default function Newsletter() {
  return (
    <main className="bg-background">
      <PageHeader eyebrow="Newsletter" meta="Lettera dal taccuino · Portici" title="Posta rada, materiale da leggere con calma">
        <p>
          Ti scriviamo quando abbiamo una nota che non sta bene solo sul sito: testo lungo, aggiornamento sul trimestrale,
          o un invito a una sessione con data e posto.
        </p>
        <p className="text-page-header-dim">
          Niente catene di promozioni: se non c&apos;è nulla da aggiungere al taccuino, non inventiamo urgenza.
        </p>
        <p className="text-page-header-dim mt-4 max-w-2xl">
          Cosa vorresti che restasse fuori da questa casella — anche se il progetto ti interessa?
        </p>
      </PageHeader>

      <section className="py-14 md:py-16 border-b border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-medium text-foreground mb-6 text-[1.35rem] [font-family:var(--font-display)]">
            Registra l&apos;indirizzo
          </h2>
          <NewsletterSubscribeForm
            source="newsletter"
            variant="page"
            showUnsubscribeHint
            editorialSubmitButton
            calmSubscribeErrors
            submitButtonLabel="Registra l'indirizzo"
          />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-10">
            {VALUE_BLOCKS.map(({ title, text, closing }) => (
              <div
                key={title}
                className="border-l-2 border-[color-mix(in_srgb,var(--riso-red)_40%,transparent)] pl-6"
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 [font-family:var(--font-mono)]">
                  {title}
                </p>
                <p className="text-[17px] text-muted-foreground leading-relaxed [font-family:var(--font-body)] mb-4">
                  {text}
                </p>
                <p className="text-[16px] text-foreground/85 leading-relaxed [font-family:var(--font-body)]">{closing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
