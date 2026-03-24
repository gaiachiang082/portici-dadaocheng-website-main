import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Legacy URL: /chi-siamo → /fondatrici (replace).
 */
export default function ChiSiamoRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/fondatrici", { replace: true });
  }, [navigate]);

  return (
    <main className="min-h-[30vh] flex items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
        Reindirizzamento…
      </p>
    </main>
  );
}
