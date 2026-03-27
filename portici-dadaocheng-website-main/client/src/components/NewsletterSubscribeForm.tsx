import { useState } from "react";
import { trpc } from "@/lib/trpc";

/** Standardized across footer, home teaser, and /newsletter page. */
export const NEWSLETTER_SUCCESS_TITLE = "Grazie per l\u2019iscrizione.";
export const NEWSLETTER_SUCCESS_BODY =
  "A breve troverete in posta un messaggio di benvenuto. Niente fretta: è solo un promemoria gentile.";

/** Calm copy when the mutation fails — avoids raw API / TRPC messages. */
export const NEWSLETTER_CALM_ERROR_TITLE = "Non siamo riusciti a completare l\u2019invio in questo momento.";
export const NEWSLETTER_CALM_ERROR_BODY_PREFIX =
  "Potete riprovare tra poco oppure passare dalla pagina newsletter:";

export type NewsletterSubscribeVariant = "footer" | "home" | "page";

interface NewsletterSubscribeFormProps {
  source: string;
  variant: NewsletterSubscribeVariant;
  /** Shown under the form when not yet submitted (home / page). */
  showUnsubscribeHint?: boolean;
  submitButtonLabel?: string;
  successTitle?: string;
  /** Default success copy when the API does not report `alreadySubscribed`. */
  successBody?: string;
  /** When the server returns `alreadySubscribed: true` (e.g. magazine PDF resend). */
  successBodyWhenAlreadySubscribed?: string;
  /** Separate title when `alreadySubscribed` (e.g. magazine duplicate). */
  successTitleWhenAlreadySubscribed?: string;
  /** Use sentence-case primary button (home / page) instead of mono uppercase. */
  editorialSubmitButton?: boolean;
  /** On error, show editorial calm copy instead of `subscribe.error.message`. */
  calmSubscribeErrors?: boolean;
  /**
   * When set, and the API returns `emailSent: false`, show this under the success copy
   * (DB ok but Resend did not confirm send — keeps the main message honest).
   */
  successSupplementWhenEmailNotSent?: string;
  /**
   * After submit: no card panel — light border accent and body typography only
   * (e.g. magazine current-issue hero).
   */
  quietSuccess?: boolean;
}

const inputLight =
  "rounded-sm border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[color,box-shadow] disabled:opacity-50";

const inputFooterDark =
  "rounded-sm border border-[color-mix(in_srgb,var(--paper)_22%,transparent)] bg-[color-mix(in_srgb,var(--paper)_7%,var(--forest-deep))] text-[var(--paper)] placeholder:text-[color-mix(in_srgb,var(--paper)_48%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--riso-red)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--forest-deep)] transition-[color,box-shadow] disabled:opacity-50";

const buttonLight =
  "rounded-sm border border-primary bg-primary text-primary-foreground uppercase text-xs font-medium tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-primary/88 transition-colors disabled:opacity-50";

/** Long editorial CTAs (e.g. Magazine) — sentence case, slightly wider label. */
const buttonLightEditorial =
  "rounded-sm border border-primary bg-primary text-primary-foreground text-[13px] font-medium tracking-[0.02em] normal-case [font-family:var(--font-body)] hover:bg-primary/88 transition-colors disabled:opacity-50";

const buttonFooterDark =
  "rounded-sm border border-[color-mix(in_srgb,var(--paper)_55%,transparent)] bg-transparent text-[var(--paper)] uppercase text-xs font-medium tracking-[0.08em] [font-family:var(--font-mono)] hover:bg-[var(--paper)] hover:text-[var(--foreground)] transition-colors disabled:opacity-50";

export function NewsletterSubscribeForm({
  source,
  variant,
  showUnsubscribeHint = false,
  submitButtonLabel,
  successTitle,
  successBody,
  successBodyWhenAlreadySubscribed,
  successTitleWhenAlreadySubscribed,
  editorialSubmitButton = false,
  calmSubscribeErrors = false,
  successSupplementWhenEmailNotSent,
  quietSuccess = false,
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [returningSubscriber, setReturningSubscriber] = useState(false);
  const [emailDispatchFailed, setEmailDispatchFailed] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setReturningSubscriber(data.alreadySubscribed === true);
      setEmailDispatchFailed(
        successSupplementWhenEmailNotSent !== undefined && data.emailSent === false
      );
      setEmail("");
    },
    onError: () => {},
  });

  const resolvedSuccessTitle =
    returningSubscriber && successTitleWhenAlreadySubscribed
      ? successTitleWhenAlreadySubscribed
      : successTitle ?? NEWSLETTER_SUCCESS_TITLE;
  const resolvedSuccessBody =
    returningSubscriber && successBodyWhenAlreadySubscribed
      ? successBodyWhenAlreadySubscribed
      : successBody ?? NEWSLETTER_SUCCESS_BODY;
  const primaryButtonClass = editorialSubmitButton ? buttonLightEditorial : buttonLight;

  const errorBlock =
    subscribe.error &&
    (calmSubscribeErrors ? (
      <div
        className={`mt-3 text-sm text-muted-foreground leading-[1.7] [font-family:var(--font-body)] ${
          variant === "home" && !quietSuccess ? "text-center" : ""
        }`}
      >
        <p className="text-foreground/90 font-medium">{NEWSLETTER_CALM_ERROR_TITLE}</p>
        <p className="mt-2">
          {NEWSLETTER_CALM_ERROR_BODY_PREFIX}{" "}
          <a href="/newsletter" className="text-primary underline-offset-4 hover:underline">
            /newsletter
          </a>
          .
        </p>
      </div>
    ) : (
      <p
        className={`mt-3 text-sm text-destructive [font-family:var(--font-mono)] ${
          variant === "home" && !quietSuccess ? "text-center" : ""
        }`}
      >
        {subscribe.error.message}
      </p>
    ));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim(), source });
  };

  const emailNotSentSupplement =
    emailDispatchFailed && successSupplementWhenEmailNotSent ? (
      <p
        className={`text-[13px] text-muted-foreground/90 [font-family:var(--font-body)] leading-[1.7] border-t border-border/50 pt-3 mt-3 ${
          variant === "home" && !quietSuccess ? "text-center" : "text-left"
        }`}
      >
        {successSupplementWhenEmailNotSent}{" "}
        <a href="/newsletter" className="text-primary underline-offset-4 hover:underline">
          /newsletter
        </a>
        .
      </p>
    ) : null;

  if (submitted) {
    if (variant === "footer") {
      return (
        <div className="space-y-2">
          <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_92%,transparent)] font-medium [font-family:var(--font-body)]">
            {resolvedSuccessTitle}
          </p>
          <p className="text-[1.0625rem] text-[color-mix(in_srgb,var(--paper)_80%,transparent)] leading-[1.75] [font-family:var(--font-body)]">
            {resolvedSuccessBody}
          </p>
          {emailNotSentSupplement}
        </div>
      );
    }
    if (quietSuccess) {
      return (
        <div className="text-left max-w-xl space-y-2 pt-1 border-t border-border/45">
          <p className="text-[15px] text-foreground/88 font-normal [font-family:var(--font-body)] leading-snug">
            {resolvedSuccessTitle}
          </p>
          <p className="text-[14px] text-muted-foreground [font-family:var(--font-body)] leading-[1.65]">
            {resolvedSuccessBody}
          </p>
          {emailNotSentSupplement}
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
          {resolvedSuccessTitle}
        </p>
        <p className="text-[15px] text-muted-foreground [font-family:var(--font-body)] leading-[1.7]">
          {resolvedSuccessBody}
        </p>
        {emailNotSentSupplement}
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
            {subscribe.isPending ? "…" : submitButtonLabel ?? "Iscriviti"}
          </button>
        </form>
        {errorBlock}
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
          <button
            type="submit"
            disabled={subscribe.isPending}
            className={`px-8 py-3.5 ${editorialSubmitButton ? "sm:px-6 whitespace-normal text-center leading-snug" : "whitespace-nowrap"} ${primaryButtonClass}`}
          >
            {subscribe.isPending ? "…" : submitButtonLabel ?? "Iscriviti"}
          </button>
        </form>
        {errorBlock}
        {showUnsubscribeHint && (
          <p
            className={`mt-4 text-sm text-muted-foreground [font-family:var(--font-body)] ${
              quietSuccess ? "text-left" : "text-center"
            }`}
          >
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
        <button
          type="submit"
          disabled={subscribe.isPending}
          className={`px-8 py-3.5 ${editorialSubmitButton ? "sm:px-6 whitespace-normal text-center leading-snug" : "whitespace-nowrap"} ${primaryButtonClass}`}
        >
          {subscribe.isPending ? "…" : submitButtonLabel ?? "Iscriviti"}
        </button>
      </form>
      {errorBlock}
      {showUnsubscribeHint && (
        <p className="mt-4 text-sm text-muted-foreground [font-family:var(--font-body)]">
          Potete cancellarvi in qualsiasi momento.
        </p>
      )}
    </div>
  );
}
