import { Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

export default function NotFound() {
  const localizedHref = useLocalizedHref();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[oklch(96.5%_0.006_85)] px-4">
      <div className="w-full max-w-lg mx-4 text-center">
        <p
          className="text-[15px] font-normal tracking-[0.22em] uppercase text-muted-foreground mb-6"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Errore 404
        </p>
        <h1
          className="text-[oklch(27.5%_0.000_0)] mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Questa pagina non c&apos;è più
        </h1>
        <div className="w-10 h-0.5 bg-secondary mx-auto mb-8" />
        <p
          className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.75] mb-10"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          L&apos;indirizzo potrebbe essere errato, oppure il contenuto è stato spostato. Da qui
          potete tornare all&apos;inizio e riprendere il cammino.
        </p>
        <div
          id="not-found-button-group"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href={localizedHref("/")}
            className="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}
