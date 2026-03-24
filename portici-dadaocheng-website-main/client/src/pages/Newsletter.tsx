import { Link } from "wouter";
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

const ARCHIVE_PLACEHOLDER = [
  { label: "Numero · in arrivo", note: "Archivio pubblico in allestimento" },
  { label: "—", note: "Le edizioni passate saranno elencate qui." },
  { label: "—", note: "Grazie per la pazienza." },
] as const;

export default function Newsletter() {
  return (
    <main className="bg-background">
      <section className="pt-32 pb-14 md:pb-16 px-6 md:px-10 bg-foreground text-background">
        <div className="container max-w-3xl mx-auto">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8 mb-8">
            <p
              className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Newsletter
            </p>
            <p
              className="text-[13px] tracking-[0.18em] uppercase text-[oklch(68%_0.005_85)]"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Lettera aperta · Portici
            </p>
          </div>
          <h1
            className="font-medium text-[oklch(96.5%_0.006_85)] mb-6"
            style={{
              fontFamily: "'Spectral', Georgia, serif",
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Una prospettiva diversa, ogni mese
          </h1>
          <p
            className="text-[17px] text-[oklch(82%_0.005_85)] leading-[1.75] max-w-2xl mb-4"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Ricevete un articolo o una riflessione che non pubblichiamo altrove, un’idea per guardare meglio ciò che vi
            circonda, e di tanto in tanto l’invito a un incontro dal vivo.
          </p>
          <p
            className="text-[16px] text-[oklch(72%_0.005_85)] leading-[1.7] max-w-2xl"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            Niente spam. Solo cultura, nel rispetto del vostro tempo.
          </p>
          <div className="w-10 h-0.5 bg-secondary mt-8" />
        </div>
      </section>

      <section className="py-14 md:py-16 border-b border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2
            className="font-medium text-foreground mb-6"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.35rem", fontWeight: 500 }}
          >
            Iscriviti
          </h2>
          <NewsletterSubscribeForm source="newsletter" variant="page" showUnsubscribeHint />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-10">
            {VALUE_BLOCKS.map(({ title, text }) => (
              <div key={title} className="border-l-2 border-secondary pl-6">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-2"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {title}
                </p>
                <p
                  className="text-[17px] text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10">
          <h2
            className="font-medium text-foreground mb-2"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.25rem", fontWeight: 500 }}
          >
            Archivio
          </h2>
          <p
            className="text-sm text-muted-foreground mb-8"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Placeholder — nessun numero archiviato in questa versione del sito.
          </p>
          <ul className="space-y-4">
            {ARCHIVE_PLACEHOLDER.map((row, i) => (
              <li
                key={i}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-border last:border-0"
              >
                <span
                  className="text-[15px] text-foreground/80 font-medium shrink-0 w-48"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  {row.label}
                </span>
                <span className="text-[15px] text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
                  {row.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
            Leggete anche
          </p>
          <Link
            href="/magazine"
            className="text-sm font-medium text-secondary hover:underline underline-offset-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Magazine
          </Link>
        </div>
      </section>
    </main>
  );
}
