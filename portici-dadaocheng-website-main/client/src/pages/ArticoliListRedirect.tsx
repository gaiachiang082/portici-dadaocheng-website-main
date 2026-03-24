import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Legacy list URL: /articoli → /magazine (replace, no stack spam).
 * Detail URLs remain /articoli/:id.
 */
export default function ArticoliListRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/magazine", { replace: true });
  }, [navigate]);

  return (
    <main className="min-h-[30vh] flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
        Reindirizzamento al Magazine…
      </p>
    </main>
  );
}
