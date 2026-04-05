import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLang } from "@/contexts/LangContext";

/**
 * Legacy URL: /:lang/chi-siamo → /:lang/fondatrici (replace).
 */
export default function ChiSiamoRedirect() {
  const [, navigate] = useLocation();
  const lang = useLang();

  useEffect(() => {
    navigate(`/${lang}/fondatrici`, { replace: true });
  }, [navigate, lang]);

  return (
    <main className="min-h-[30vh] flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
        Reindirizzamento…
      </p>
    </main>
  );
}
