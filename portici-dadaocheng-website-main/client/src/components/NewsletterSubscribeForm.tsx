import { useState } from "react";
import { trpc } from "@/lib/trpc";

/** Standardized across footer, home teaser, and /newsletter page. */
export const NEWSLETTER_SUCCESS_TITLE = "Grazie per l\u2019iscrizione.";
export const NEWSLETTER_SUCCESS_BODY =
  "A breve troverete in posta un messaggio di benvenuto. Niente fretta: è solo un promemoria gentile.";

export type NewsletterSubscribeVariant = "footer" | "home" | "page";

interface NewsletterSubscribeFormProps {
  source: string;
  variant: NewsletterSubscribeVariant;
  /** Shown under the form when not yet submitted (home / page). */
  showUnsubscribeHint?: boolean;
}

export function NewsletterSubscribeForm({
  source,
  variant,
  showUnsubscribeHint = false,
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setEmail("");
    },
    onError: () => {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim(), source });
  };

  if (submitted) {
    if (variant === "footer") {
      return (
        <div className="space-y-2">
          <p
            className="text-[15px] text-[var(--on-dark)]/90 font-medium"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {NEWSLETTER_SUCCESS_TITLE}
          </p>
          <p
            className="text-[15px] text-[var(--on-dark)]/85 leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {NEWSLETTER_SUCCESS_BODY}
          </p>
        </div>
      );
    }
    return (
      <div
        className={`py-5 px-6 bg-card border border-border rounded-xl ${
          variant === "home" ? "text-center" : "text-left max-w-xl"
        }`}
      >
        <p
          className="text-[17px] text-foreground mb-1 font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {NEWSLETTER_SUCCESS_TITLE}
        </p>
        <p className="text-[15px] text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
          {NEWSLETTER_SUCCESS_BODY}
        </p>
      </div>
    );
  }

  const inputBase =
    "rounded-xl focus:outline-none focus:border-primary transition-colors disabled:opacity-50";
  const buttonBase =
    "font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50";

  if (variant === "footer") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`px-4 py-2.5 text-[15px] bg-[oklch(35%_0.000_0)] border border-[oklch(45%_0.000_0)] text-[var(--on-dark)] placeholder:text-[var(--on-dark)]/60 ${inputBase}`}
            style={{ fontFamily: "var(--font-ui)" }}
          />
          <button
            type="submit"
            disabled={subscribe.isPending}
            className={`px-4 py-2.5 text-[15px] ${buttonBase}`}
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {subscribe.isPending ? "…" : "Iscriviti"}
          </button>
        </form>
        {subscribe.error && (
          <p className="mt-2 text-xs text-destructive" style={{ fontFamily: "var(--font-ui)" }}>
            {subscribe.error.message}
          </p>
        )}
      </div>
    );
  }

  if (variant === "home") {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`flex-1 px-5 py-3.5 text-[16px] bg-background border border-border text-foreground placeholder:text-muted-foreground ${inputBase}`}
            style={{ fontFamily: "var(--font-ui)" }}
          />
          <button
            type="submit"
            disabled={subscribe.isPending}
            className={`px-8 py-3.5 text-[16px] whitespace-nowrap ${buttonBase}`}
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {subscribe.isPending ? "…" : "Iscriviti"}
          </button>
        </form>
        {subscribe.error && (
          <p className="mt-3 text-sm text-destructive text-center" style={{ fontFamily: "var(--font-ui)" }}>
            {subscribe.error.message}
          </p>
        )}
        {showUnsubscribeHint && (
          <p
            className="mt-4 text-[14px] text-muted-foreground text-center"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Potete cancellarvi in qualsiasi momento.
          </p>
        )}
      </div>
    );
  }

  /* page */
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
        <input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`flex-1 px-5 py-3.5 text-[16px] bg-background border border-border text-foreground placeholder:text-muted-foreground ${inputBase}`}
          style={{ fontFamily: "var(--font-ui)" }}
        />
        <button
          type="submit"
          disabled={subscribe.isPending}
          className={`px-8 py-3.5 text-[16px] whitespace-nowrap ${buttonBase}`}
          style={{ fontFamily: "var(--font-ui)" }}
        >
          {subscribe.isPending ? "…" : "Iscriviti"}
        </button>
      </form>
      {subscribe.error && (
        <p className="mt-3 text-sm text-destructive" style={{ fontFamily: "var(--font-ui)" }}>
          {subscribe.error.message}
        </p>
      )}
      {showUnsubscribeHint && (
        <p className="mt-4 text-[15px] text-muted-foreground" style={{ fontFamily: "var(--font-ui)" }}>
          Potete cancellarvi in qualsiasi momento.
        </p>
      )}
    </div>
  );
}
