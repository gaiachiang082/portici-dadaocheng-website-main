import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ProgramInterestSection } from "@/components/ProgramInterestSection";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { getWorkshopsBookingCopy } from "@/i18n/workshopBookingLocale";

/* ─── Types ─── */
type Step = "list" | "sessions" | "form" | "review" | "paying";

interface BookingForm {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  participants: number;
  notes: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  calligraphy: "書法 · Calligrafia",
  ink: "水墨 · Inchiostro",
  tea: "茶道 · Cerimonia del Tè",
  food: "飲食 · Cucina",
};

/** Category chips on imagery: riso spot-inks mixed into forest (editorial, not flat UI swatches). */
const CATEGORY_SURFACE: Record<string, string> = {
  calligraphy: "color-mix(in srgb, var(--riso-gold) 32%, var(--forest-deep))",
  ink: "color-mix(in srgb, var(--riso-blue) 28%, var(--forest-deep))",
  tea: "color-mix(in srgb, var(--riso-teal) 28%, var(--forest-deep))",
  food: "color-mix(in srgb, var(--riso-peach) 30%, var(--forest-deep))",
};

const inputDarkClass =
  "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-[color-mix(in_srgb,var(--paper)_9%,var(--forest-deep))] border-border text-on-ink placeholder:text-on-ink-subtle focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20";

function formatSessionDate(d: Date | string, locale: string) {
  return new Date(d).toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ─── Workshop Card ─── */
function WorkshopCard({
  workshop,
  onSelect,
  ui,
}: {
  workshop: any;
  onSelect: () => void;
  ui: ReturnType<typeof getWorkshopsBookingCopy>;
}) {
  const spotsLabel =
    workshop.maxParticipants <= 8 ? ui.spotsSmall : ui.spotsStandard;
  const catSurface =
    CATEGORY_SURFACE[workshop.category] ??
    "color-mix(in srgb, var(--editorial-mark) 25%, var(--forest-deep))";

  return (
    <div
      className="group relative rounded-[16px] overflow-hidden cursor-pointer bg-forest-raised border border-border hover:border-editorial-mark transition-all duration-300 hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--forest-deep)_65%,transparent)]"
      onClick={onSelect}
    >
      {/* Image */}
      {workshop.imageUrl && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={workshop.imageUrl}
            alt={workshop.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent" />
          <span
            className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] tracking-widest uppercase text-on-ink"
            style={{ background: catSurface }}
          >
            {CATEGORY_LABELS[workshop.category] ?? workshop.category}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-0">
        <h3
          className="text-lg font-medium text-on-ink mb-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {workshop.title}
        </h3>
        {workshop.titleZh && (
          <p className="text-sm text-on-ink-accent mb-3">{workshop.titleZh}</p>
        )}
        <p className="text-[15px] text-on-ink-muted leading-relaxed line-clamp-3 mb-5">
          {workshop.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-end justify-between gap-3 text-[11px] uppercase tracking-wider text-on-ink-subtle">
          <div className="space-y-0.5 normal-case tracking-normal">
            <p>
              <span className="text-on-ink text-base font-medium tabular-nums">
                €{parseFloat(workshop.priceEur).toFixed(0)}
              </span>
              <span className="text-on-ink-muted">{ui.perPerson}</span>
            </p>
            <p>
              {workshop.durationMinutes} min · {spotsLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-4 w-full py-2.5 rounded-[12px] text-sm font-semibold bg-brand-cta text-brand-cta-foreground transition-opacity duration-200 hover:opacity-90"
        >
          {ui.ctaSelectWorkshop}
        </button>
      </div>
    </div>
  );
}

/* ─── Session Picker ─── */
function SessionPicker({
  sessions,
  selectedId,
  onSelect,
  ui,
  dateLocale,
}: {
  sessions: any[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  ui: ReturnType<typeof getWorkshopsBookingCopy>;
  dateLocale: string;
}) {
  if (sessions.length === 0) {
    return (
      <p className="text-on-ink-muted text-sm py-4">
        {ui.sessionEmpty}
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {sessions.map((s: any) => {
        const spotsLeft = s.spotsTotal - s.spotsBooked;
        const isFull = spotsLeft <= 0;
        const isSelected = selectedId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            disabled={isFull}
            aria-pressed={isSelected}
            onClick={() => !isFull && onSelect(s.id)}
            className={`flex items-center justify-between p-4 rounded-xl border text-left transition-colors duration-200 ${
              isSelected
                ? "bg-[color-mix(in_srgb,var(--brand-cta)_14%,transparent)] border-editorial-mark"
                : "bg-[color-mix(in_srgb,var(--paper)_6%,var(--forest-deep))] border-border hover:border-[color-mix(in_srgb,var(--editorial-mark)_38%,transparent)]"
            } ${isFull ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div>
              <p className="text-on-ink text-sm font-medium">
                {formatSessionDate(s.sessionDate, dateLocale)}
              </p>
              <p className="text-xs text-on-ink-muted mt-0.5">
                {isFull
                  ? ui.sessionFull
                  : spotsLeft === 1
                    ? ui.sessionOneLeft
                    : ui.sessionNLeft(spotsLeft)}
              </p>
            </div>
            {isSelected ? (
              <span className="text-[10px] uppercase tracking-widest text-editorial-mark [font-family:var(--font-mono)] shrink-0">
                {ui.selected}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

const errorBannerClass =
  "mb-4 p-3 rounded-lg border text-sm border-destructive/45 bg-[color-mix(in_srgb,var(--destructive)_14%,transparent)] text-on-ink";

/* ─── Main Page ─── */
export default function WorkshopsPage() {
  const lang = useLang();
  const ui = getWorkshopsBookingCopy(lang);
  const dateLocale = lang === "en" ? "en-GB" : "it-IT";
  const localizedHref = useLocalizedHref();
  const [legacyBooking, setLegacyBooking] = useState(false);
  const [step, setStep] = useState<Step>("list");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [form, setForm] = useState<BookingForm>({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    guestCountry: "",
    participants: 1,
    notes: "",
  });
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get("slug");
    const openLegacy = params.get("booking") === "1" || !!slugParam;
    if (openLegacy) {
      setLegacyBooking(true);
      if (slugParam) {
        setSelectedSlug(slugParam);
        setSelectedSessionId(null);
        setStep("sessions");
      }
    }
  }, []);

  const { data: workshopList, isLoading } = trpc.workshops.list.useQuery();
  const { data: workshopDetail } = trpc.workshops.getWithSessions.useQuery(
    { slug: selectedSlug! },
    { enabled: !!selectedSlug }
  );

  const createBookingMutation = trpc.workshops.createBooking.useMutation({
    onSuccess: (data) => {
      setBookingResult(data);
      setStep("review");
    },
    onError: (err) => setError(err.message),
  });

  const createCheckoutMutation = trpc.workshops.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
      }
    },
    onError: (err) => setError(err.message),
  });

  const handleSelectWorkshop = (slug: string) => {
    setSelectedSlug(slug);
    setSelectedSessionId(null);
    setStep("sessions");
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionId) return;
    setError(null);
    createBookingMutation.mutate({
      sessionId: selectedSessionId,
      guestName: form.guestName.trim(),
      guestEmail: form.guestEmail.trim(),
      guestPhone: form.guestPhone.trim() || undefined,
      guestCountry: form.guestCountry.trim() || undefined,
      participants: form.participants,
      notes: form.notes.trim() || undefined,
    });
  };

  const handlePayDeposit = () => {
    if (!bookingResult) return;
    setError(null);
    createCheckoutMutation.mutate({
      bookingId: bookingResult.bookingId,
      confirmationCode: bookingResult.confirmationCode,
      origin: window.location.origin,
    });
  };

  const workshop = workshopDetail?.workshop;
  const sessions = workshopDetail?.sessions ?? [];

  if (!legacyBooking) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <nav className="sticky top-0 z-40 border-b border-border px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-background/95 backdrop-blur-sm">
          <Link href={localizedHref("/")}>
            <span
              className="text-muted-foreground text-sm tracking-widest uppercase cursor-pointer hover:text-foreground transition-colors [font-family:var(--font-ui)]"
            >
              ← Portici 大稻埕
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href={localizedHref("/eventi")}
              className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [font-family:var(--font-ui)]"
            >
              {ui.navSessions}
            </Link>
          </div>
        </nav>
        <ProgramInterestSection className="py-14 md:py-16" showLegacyBookingHint />
        <div className="border-t border-border bg-muted/20 py-12 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 [font-family:var(--font-body)]">
              {ui.gateInviteBlurb}
            </p>
            <button
              type="button"
              onClick={() => setLegacyBooking(true)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-medium border border-border bg-card hover:bg-muted transition-colors [font-family:var(--font-ui)]"
            >
              {ui.gateOpenFlow}
            </button>
            <p className="mt-8 text-sm text-muted-foreground [font-family:var(--font-body)]">
              {ui.gateContactPrefix}{" "}
              <Link href={localizedHref("/contatti")} className="text-primary font-medium underline-offset-4 hover:underline [font-family:var(--font-ui)]">
                {ui.gateContactLink}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest text-on-ink">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-forest/95 backdrop-blur-sm">
        <Link href={localizedHref("/")}>
          <span className="text-on-ink-accent text-sm tracking-widest uppercase cursor-pointer hover:text-on-ink transition-colors">
            ← Portici 大稻埕
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href={localizedHref("/eventi")}
            className="text-xs tracking-widest uppercase text-on-ink-muted hover:text-on-ink transition-colors"
          >
            {ui.navSessions}
          </Link>
          <h1 className="text-sm tracking-widest uppercase text-on-ink-muted">{ui.navConfirm}</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step: List */}
        {step === "list" && (
          <>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-on-ink-accent mb-3">
                {ui.listKicker}
              </p>
              <h2
                className="text-[28px] md:text-[32px] text-on-ink mb-4"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                {ui.listTitle}
              </h2>
              <p className="text-on-ink-muted max-w-xl leading-relaxed">
                {ui.listIntroBeforeSessionsLink}
                <Link href={localizedHref("/eventi")} className="text-editorial-mark hover:underline underline-offset-4">
                  {ui.navSessions}
                </Link>
                {ui.listIntroAfterSessionsLink}
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl animate-pulse bg-[color-mix(in_srgb,var(--paper)_12%,transparent)]"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {(workshopList ?? []).map((w: any) => (
                  <WorkshopCard
                    key={w.id}
                    workshop={w}
                    ui={ui}
                    onSelect={() => handleSelectWorkshop(w.slug)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Step: Sessions */}
        {step === "sessions" && workshop && (
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setStep("list")}
              className="text-sm text-on-ink-muted hover:text-on-ink mb-8 transition-colors"
            >
              {ui.backToList}
            </button>

            <div className="mb-8">
              <span className="text-[10px] tracking-widest uppercase text-on-ink-accent">
                {CATEGORY_LABELS[workshop.category] ?? workshop.category}
              </span>
              <h2
                className="text-[24px] text-on-ink mt-2 mb-1"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                {workshop.title}
              </h2>
              {workshop.titleZh && (
                <p className="text-on-ink-accent">{workshop.titleZh}</p>
              )}
              <p className="text-[15px] text-on-ink-muted mt-4 leading-relaxed">
                {workshop.description}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-4 border-t border-border text-xs uppercase tracking-wider text-on-ink-subtle">
                <span className="normal-case tracking-normal">
                  {workshop.durationMinutes} min
                </span>
                <span className="normal-case tracking-normal">
                  {ui.maxParticipantsLine(workshop.maxParticipants ?? 0)}
                </span>
                {workshop.location && (
                  <span className="normal-case tracking-normal">{workshop.location}</span>
                )}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-border mb-6 bg-[color-mix(in_srgb,var(--paper)_5%,var(--forest-deep))]">
              <p className="text-sm font-medium text-on-ink mb-4">
                {ui.sessionBoxTitle}
              </p>
              <SessionPicker
                sessions={sessions}
                selectedId={selectedSessionId}
                onSelect={setSelectedSessionId}
                ui={ui}
                dateLocale={dateLocale}
              />
            </div>

            <button
              type="button"
              disabled={selectedSessionId === null}
              onClick={() => {
                if (selectedSessionId !== null) setStep("form");
              }}
              className={`w-full py-3 rounded-[12px] font-semibold transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 ${
                selectedSessionId !== null
                  ? "bg-brand-cta text-brand-cta-foreground"
                  : "bg-[color-mix(in_srgb,var(--paper)_8%,var(--forest-deep))] text-on-ink-subtle"
              }`}
            >
              {ui.nextToYourDetails}
            </button>
          </div>
        )}

        {/* Step: Form */}
        {step === "form" && workshop && (
          <div className="max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setStep("sessions")}
              className="text-sm text-on-ink-muted hover:text-on-ink mb-8 transition-colors"
            >
              {ui.changeDate}
            </button>

            <h2
              className="text-[24px] text-on-ink mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
            >
              {ui.formTitle}
            </h2>
            <p className="text-sm text-on-ink-muted mb-8">
              {ui.formIntro}
            </p>

            {error && (
              <div className={errorBannerClass} role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                    {ui.labelFullName}
                  </label>
                  <input
                    required
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className={inputDarkClass}
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                    {ui.labelEmail}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.guestEmail}
                    onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                    className={inputDarkClass}
                    placeholder="mario@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                    {ui.labelPhone}
                  </label>
                  <input
                    value={form.guestPhone}
                    onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                    className={inputDarkClass}
                    placeholder="+39 333 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                    {ui.labelCountry}
                  </label>
                  <input
                    value={form.guestCountry}
                    onChange={(e) => setForm({ ...form, guestCountry: e.target.value })}
                    className={inputDarkClass}
                    placeholder={ui.countryPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                  {ui.labelParticipants}
                </label>
                <select
                  value={form.participants}
                  onChange={(e) => setForm({ ...form, participants: parseInt(e.target.value) })}
                  className={inputDarkClass}
                >
                  {Array.from({ length: Math.min(workshop.maxParticipants ?? 10, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{ui.participantCountOption(n)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-on-ink-muted mb-1.5 uppercase tracking-wider">
                  {ui.labelNotes}
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className={`${inputDarkClass} resize-none`}
                  placeholder={ui.placeholderNotes}
                />
              </div>

              {/* Price summary */}
              <div className="p-4 rounded-xl border border-border bg-[color-mix(in_srgb,var(--paper)_5%,var(--forest-deep))]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-ink-muted">
                    €{parseFloat(workshop.priceEur).toFixed(0)} × {form.participants} {ui.priceLinePerson}
                  </span>
                  <span className="text-on-ink">
                    €{(parseFloat(workshop.priceEur) * form.participants).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                  <span className="text-editorial-mark font-medium">
                    {ui.depositLabel}
                  </span>
                  <span className="text-editorial-mark font-medium">
                    €{(parseFloat(workshop.priceEur) * form.participants * 0.5).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-on-ink-subtle mt-2">
                  {ui.balanceNote((parseFloat(workshop.priceEur) * form.participants * 0.5).toFixed(2))}
                </p>
              </div>

              <button
                type="submit"
                disabled={createBookingMutation.isPending}
                className="w-full py-3 rounded-[12px] font-semibold transition-opacity duration-200 disabled:opacity-60 bg-brand-cta text-brand-cta-foreground hover:opacity-90"
              >
                {createBookingMutation.isPending
                  ? ui.submitProcessing
                  : ui.submitBooking}
              </button>
            </form>
          </div>
        )}

        {/* Step: Review + Pay */}
        {step === "review" && bookingResult && (
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-editorial-mark text-on-ink bg-[color-mix(in_srgb,var(--editorial-mark)_12%,transparent)]"
                aria-hidden
              >
                <span className="text-[11px] uppercase tracking-[0.2em] text-editorial-mark [font-family:var(--font-mono)]">
                  {ui.reviewOk}
                </span>
              </div>
              <h2
                className="text-[24px] text-on-ink mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                {ui.reviewTitle}
              </h2>
              <p className="text-on-ink-muted text-sm">
                {ui.reviewCodeLead}
              </p>
              <p className="text-2xl font-mono tracking-widest text-editorial-mark mt-2 mb-1">
                {bookingResult.confirmationCode}
              </p>
              <p className="text-xs text-on-ink-subtle">
                {ui.reviewCodeHint}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-border mb-6 text-left bg-[color-mix(in_srgb,var(--paper)_5%,var(--forest-deep))]">
              <h3 className="text-sm font-medium text-on-ink mb-3">
                {ui.summaryTitle}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-ink-muted">{ui.summarySession}</span>
                  <span className="text-on-ink">{bookingResult.workshopTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-ink-muted">{ui.summaryDate}</span>
                  <span className="text-on-ink">{formatSessionDate(bookingResult.sessionDate, dateLocale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-ink-muted">{ui.summaryParticipants}</span>
                  <span className="text-on-ink">{bookingResult.participants}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-on-ink-muted">{ui.summaryTotal}</span>
                  <span className="text-on-ink">€{bookingResult.totalAmountEur.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-editorial-mark font-medium">{ui.summaryPayNow}</span>
                  <span className="text-editorial-mark font-medium">€{bookingResult.depositAmountEur.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-ink-subtle">{ui.summaryBalanceDay}</span>
                  <span className="text-on-ink-subtle">€{bookingResult.balanceAmountEur.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className={`${errorBannerClass} text-left`} role="alert">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handlePayDeposit}
              disabled={createCheckoutMutation.isPending}
              className="w-full py-3.5 rounded-[12px] font-semibold text-base transition-opacity duration-200 disabled:opacity-60 mb-3 bg-brand-cta text-brand-cta-foreground hover:opacity-90"
            >
              {createCheckoutMutation.isPending
                ? ui.payRedirecting
                : ui.payProceed(bookingResult.depositAmountEur.toFixed(2))}
            </button>
            <p className="text-xs text-on-ink-subtle">
              {ui.payStripeNote}
            </p>
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-border text-center">
          <p className="text-xs uppercase tracking-widest text-on-ink-subtle mb-3">{ui.elsewhere}</p>
          <Link
            href={localizedHref("/contatti")}
            className="text-sm font-medium text-editorial-mark hover:underline underline-offset-4 [font-family:var(--font-ui)]"
          >
            {ui.contacts}
          </Link>
        </div>
      </div>
    </div>
  );
}
