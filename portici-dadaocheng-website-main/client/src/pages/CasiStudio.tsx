import { Link } from "wouter";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";

function CasiStudioFallback() {
  const localizedHref = useLocalizedHref();

  return (
    <main className="bg-background">
      <section className="pt-32 pb-20 px-6 md:px-10">
        <div className="container max-w-4xl mx-auto text-center">
          <h1
            className="font-medium text-foreground mb-4"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(1.9rem,4vw,2.8rem)" }}
          >
            Case Studies in arrivo
          </h1>
          <p className="text-muted-foreground mb-8">Stiamo preparando questa pagina per la lingua selezionata.</p>
          <Link
            href={localizedHref("/contatti")}
            className="inline-flex items-center rounded-sm bg-foreground text-background px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
          >
            Contattaci
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function CasiStudio() {
  const lang = useLang();

  switch (lang) {
    case "en":
      return <CasiStudioFallback />;
    default:
      return <CasiStudioFallback />;
  }
}
