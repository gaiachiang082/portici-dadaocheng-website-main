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

const inputLight =
  "rounded-sm border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[color,box-shadow] disabled:opacity-50";

const inputFooterDark =
  "rounded-sm border border-[color-mix(in_srgb,var(--paper)_22%,transparent)] bg-[color-mix(in_srgb,var(--paper)_7%,var(--ink))] text-[var(--paper)] placeholder:text-[color-mix(in_srgb,var(--paper)_48%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)] transition-[color,box-shadow] disabled:opacity-50";

const buttonLight =
  "rounded-sm border border-primary bg-primary text-primary-foreground uppercase text-xs font-medium tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-primary/88 transition-colors disabled:opacity-50";

const buttonFooterDark =
  "rounded-sm border border-[color-mix(in_srgb,var(--paper)_55%,transparent)] bg-transparent text-[var(--paper)] uppercase text-xs font-medium tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors disabled:opacity-50";

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
          <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_92%,transparent)] font-medium [font-family:var(--font-body)]">
            {NEWSLETTER_SUCCESS_TITLE}
          </p>
          <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_80%,transparent)] leading-[1.75] [font-family:var(--font-body)]">
            {NEWSLETTER_SUCCESS_BODY}
          </p>
        </div>
      );
    }
    return (
      <div
        className={`py-5 px-6 bg-card border border-border rounded-sm ${
          variant === "home" ? "text-center" : "text-left max-w-xl"
        }`}
      >
        <p className="text-[1.0625rem] text-foreground mb-1 font-medium [font-family:var(--font-display)]">
          {NEWSLETTER_SUCCESS_TITLE}
        </p>
        <p className="text-[15px] text-muted-foreground [font-family:var(--font-body)] leading-[1.7]">
          {NEWSLETTER_SUCCESS_BODY}
        </p>
      </div>
    );
  }

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
            className={`px-4 py-2.5 text-[15px] [font-family:var(--font-mono)] ${inputFooterDark}`}
          />
          <button type="submit" disabled={subscribe.isPending} className={`px-4 py-2.5 ${buttonFooterDark}`}>
            {subscribe.isPending ? "…" : "Iscriviti"}
          </button>
        </form>
        {subscribe.error && (
          <p className="mt-2 text-xs text-destructive [font-family:var(--font-mono)]">{subscribe.error.message}</p>
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
            className={`flex-1 px-5 py-3.5 text-[15px] [font-family:var(--font-mono)] ${inputLight}`}
          />
          <button type="submit" disabled={subscribe.isPending} className={`px-8 py-3.5 whitespace-nowrap ${buttonLight}`}>
            {subscribe.isPending ? "…" : "Iscriviti"}
          </button>
        </form>
        {subscribe.error && (
          <p className="mt-3 text-sm text-destructive text-center [font-family:var(--font-mono)]">{subscribe.error.message}</p>
        )}
        {showUnsubscribeHint && (
          <p className="mt-4 text-sm text-muted-foreground text-center [font-family:var(--font-body)]">
            Potete cancellarvi in qualsiasi momento.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
        <input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={`flex-1 px-5 py-3.5 text-[15px] [font-family:var(--font-mono)] ${inputLight}`}
        />
        <button type="submit" disabled={subscribe.isPending} className={`px-8 py-3.5 whitespace-nowrap ${buttonLight}`}>
          {subscribe.isPending ? "…" : "Iscriviti"}
        </button>
      </form>
      {subscribe.error && (
        <p className="mt-3 text-sm text-destructive [font-family:var(--font-mono)]">{subscribe.error.message}</p>
      )}
      {showUnsubscribeHint && (
        <p className="mt-4 text-sm text-muted-foreground [font-family:var(--font-body)]">
          Potete cancellarvi in qualsiasi momento.
        </p>
      )}
    </div>
  );
}
