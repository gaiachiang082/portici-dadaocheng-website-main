import { useSearch, Link } from "wouter";
import { useLocalizedHref } from "@/contexts/LangContext";

export default function BookingSuccess() {
  const localizedHref = useLocalizedHref();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const code = params.get("code") ?? "";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "oklch(10% 0 0)", color: "oklch(90% 0.005 85)" }}
    >
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: "oklch(55% 0.075 55 / 0.15)",
            border: "2px solid oklch(55% 0.075 55)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="oklch(55% 0.075 55)" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          className="text-3xl text-[oklch(92%_0.005_85)] mb-3"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontWeight: 300 }}
        >
          Deposito ricevuto
        </h1>
        <p className="text-[oklch(60%_0.005_85)] mb-6">
          Il deposito per la sessione scelta è andato a buon fine. Ti abbiamo inviato un&apos;email di riepilogo con data, luogo e codice.
        </p>

        {code && (
          <div
            className="p-4 rounded-xl border mb-6"
            style={{
              background: "oklch(13% 0 0)",
              borderColor: "oklch(22% 0 0)",
            }}
          >
            <p className="text-xs text-[oklch(50%_0.005_85)] uppercase tracking-widest mb-1">
              Codice di conferma
            </p>
            <p className="text-2xl font-mono tracking-widest text-[oklch(55%_0.075_55)]">
              {code}
            </p>
            <p className="text-xs text-[oklch(45%_0.005_85)] mt-2">
              Porta questo codice il giorno della sessione.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link href={localizedHref("/eventi")}>
            <button
              className="w-full py-3 rounded-xl font-medium transition-all duration-200"
              style={{ background: "oklch(55% 0.075 55)", color: "oklch(98% 0 0)" }}
            >
              Altre linee e interesse
            </button>
          </Link>
          <Link href={localizedHref("/")}>
            <button
              className="w-full py-3 rounded-xl font-medium transition-all duration-200 border"
              style={{
                background: "transparent",
                borderColor: "oklch(25% 0 0)",
                color: "oklch(70% 0.005 85)",
              }}
            >
              Torna alla home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
