import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

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

const CATEGORY_COLORS: Record<string, string> = {
  calligraphy: "oklch(35% 0.06 30)",
  ink: "oklch(30% 0.02 240)",
  tea: "oklch(38% 0.08 140)",
  food: "oklch(38% 0.09 55)",
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("it-IT", {
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
}: {
  workshop: any;
  onSelect: () => void;
}) {
  const spotsLabel =
    workshop.maxParticipants <= 8 ? "Piccolo gruppo" : "Gruppo standard";
  const catColor = CATEGORY_COLORS[workshop.category] ?? "oklch(35% 0.06 30)";

  return (
    <div
      className="group relative rounded-[16px] overflow-hidden cursor-pointer border border-[oklch(25%_0_0)] hover:border-[oklch(55%_0.075_55)] transition-all duration-300 hover:shadow-[0_22px_40px_rgba(0,0,0,0.35)]"
      style={{ background: "oklch(13% 0 0)" }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(13%_0_0)] via-transparent to-transparent" />
          <span
            className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] tracking-widest uppercase text-white"
            style={{ background: catColor }}
          >
            {CATEGORY_LABELS[workshop.category] ?? workshop.category}
          </span>
        </div>
      )}

      <div className="p-5">
        <h3
          className="text-lg font-medium text-[oklch(92%_0.005_85)] mb-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {workshop.title}
        </h3>
        {workshop.titleZh && (
          <p className="text-sm text-[oklch(55%_0.075_55)] mb-3">{workshop.titleZh}</p>
        )}
        <p className="text-sm text-[oklch(65%_0.005_85)] line-clamp-3 mb-4">
          {workshop.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-light text-[oklch(92%_0.005_85)]">
              €{parseFloat(workshop.priceEur).toFixed(0)}
            </span>
            <span className="text-xs text-[oklch(50%_0.005_85)] ml-1">/ persona</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-[oklch(50%_0.005_85)]">{workshop.durationMinutes} min</p>
            <p className="text-xs text-[oklch(50%_0.005_85)]">{spotsLabel}</p>
          </div>
        </div>

        <button
          className="mt-4 w-full py-2.5 rounded-[12px] text-sm font-semibold transition-all duration-200 shadow-[0_10px_20px_rgba(139,69,19,0.3)] hover:-translate-y-[1px]"
          style={{
            background: "oklch(55% 0.075 55)",
            color: "oklch(98% 0 0)",
          }}
        >
          Prenota ora →
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
}: {
  sessions: any[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  if (sessions.length === 0) {
    return (
      <p className="text-[oklch(55%_0.005_85)] text-sm py-4">
        Nessuna sessione disponibile al momento. Contattaci per organizzare una data privata.
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
            disabled={isFull}
            onClick={() => !isFull && onSelect(s.id)}
            className="flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200"
            style={{
              background: isSelected ? "oklch(55% 0.075 55 / 0.15)" : "oklch(16% 0 0)",
              borderColor: isSelected ? "oklch(55% 0.075 55)" : "oklch(25% 0 0)",
              opacity: isFull ? 0.4 : 1,
              cursor: isFull ? "not-allowed" : "pointer",
            }}
          >
            <div>
              <p className="text-[oklch(90%_0.005_85)] text-sm font-medium">
                {formatDate(s.sessionDate)}
              </p>
              <p className="text-xs text-[oklch(55%_0.005_85)] mt-0.5">
                {isFull ? "Completo" : `${spotsLeft} posti disponibili`}
              </p>
            </div>
            {isSelected && (
              <span className="text-[oklch(55%_0.075_55)] text-lg">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main Page ─── */
export default function WorkshopsPage() {
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

  // Read ?slug= from URL to pre-select a workshop (from Calendario page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get("slug");
    if (slugParam && step === "list") {
      handleSelectWorkshop(slugParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      guestName: form.guestName,
      guestEmail: form.guestEmail,
      guestPhone: form.guestPhone || undefined,
      guestCountry: form.guestCountry || undefined,
      participants: form.participants,
      notes: form.notes || undefined,
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

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(10% 0 0)", color: "oklch(90% 0.005 85)" }}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[oklch(18%_0_0)] px-6 py-4 flex items-center justify-between"
        style={{ background: "oklch(10% 0 0 / 0.95)", backdropFilter: "blur(12px)" }}>
        <Link href="/">
          <span className="text-[oklch(55%_0.075_55)] text-sm tracking-widest uppercase cursor-pointer hover:text-[oklch(70%_0.075_55)] transition-colors">
            ← Portici 大稻埕
          </span>
        </Link>
        <h1 className="text-sm tracking-widest uppercase text-[oklch(60%_0.005_85)]">
          Workshop
        </h1>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Step: List */}
        {step === "list" && (
          <>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[oklch(55%_0.075_55)] mb-3">
                Esperienze Culturali
              </p>
              <h2
                className="text-[28px] md:text-[32px] text-[oklch(92%_0.005_85)] mb-4"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                I nostri Workshop
              </h2>
              <p className="text-[oklch(60%_0.005_85)] max-w-xl">
                Ogni workshop è un dialogo tra due culture. Prenota il tuo posto e porta a casa
                un'esperienza che non dimenticherai. Il deposito del 50% è richiesto alla prenotazione.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-80 rounded-2xl bg-[oklch(15%_0_0)] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {(workshopList ?? []).map((w: any) => (
                  <WorkshopCard
                    key={w.id}
                    workshop={w}
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
              onClick={() => setStep("list")}
              className="text-sm text-[oklch(55%_0.005_85)] hover:text-[oklch(75%_0.005_85)] mb-8 transition-colors"
            >
              ← Torna ai workshop
            </button>

            <div className="mb-8">
              <span className="text-[10px] tracking-widest uppercase text-[oklch(55%_0.075_55)]">
                {CATEGORY_LABELS[workshop.category] ?? workshop.category}
              </span>
              <h2
                className="text-[24px] text-[oklch(92%_0.005_85)] mt-2 mb-1"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                {workshop.title}
              </h2>
              {workshop.titleZh && (
                <p className="text-[oklch(55%_0.075_55)]">{workshop.titleZh}</p>
              )}
              <p className="text-sm text-[oklch(60%_0.005_85)] mt-3">{workshop.description}</p>
              <div className="flex gap-6 mt-4 text-sm text-[oklch(55%_0.005_85)]">
                <span>⏱ {workshop.durationMinutes} min</span>
                <span>👥 Max {workshop.maxParticipants} persone</span>
                <span>📍 {workshop.location}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[oklch(22%_0_0)] mb-6"
              style={{ background: "oklch(13% 0 0)" }}>
              <p className="text-sm font-medium text-[oklch(80%_0.005_85)] mb-4">
                Scegli una data
              </p>
              <SessionPicker
                sessions={sessions}
                selectedId={selectedSessionId}
                onSelect={setSelectedSessionId}
              />
            </div>

            <button
              disabled={selectedSessionId === null}
              onClick={() => { if (selectedSessionId !== null) setStep("form"); }}
              className="w-full py-3 rounded-[12px] font-semibold transition-all duration-200 disabled:opacity-40 shadow-[0_10px_20px_rgba(139,69,19,0.3)] hover:-translate-y-[1px]"
              style={{
                background: selectedSessionId ? "oklch(55% 0.075 55)" : "oklch(30% 0 0)",
                color: "oklch(98% 0 0)",
              }}
            >
              Continua →
            </button>
          </div>
        )}

        {/* Step: Form */}
        {step === "form" && workshop && (
          <div className="max-w-xl mx-auto">
            <button
              onClick={() => setStep("sessions")}
              className="text-sm text-[oklch(55%_0.005_85)] hover:text-[oklch(75%_0.005_85)] mb-8 transition-colors"
            >
              ← Cambia data
            </button>

            <h2
              className="text-[24px] text-[oklch(92%_0.005_85)] mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
            >
              I tuoi dati
            </h2>
            <p className="text-sm text-[oklch(55%_0.005_85)] mb-8">
              Inserisci i tuoi dati per completare la prenotazione.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                    Nome completo *
                  </label>
                  <input
                    required
                    value={form.guestName}
                    onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors"
                    style={{
                      background: "oklch(15% 0 0)",
                      borderColor: "oklch(25% 0 0)",
                      color: "oklch(90% 0.005 85)",
                    }}
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.guestEmail}
                    onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors"
                    style={{
                      background: "oklch(15% 0 0)",
                      borderColor: "oklch(25% 0 0)",
                      color: "oklch(90% 0.005 85)",
                    }}
                    placeholder="mario@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                    Telefono
                  </label>
                  <input
                    value={form.guestPhone}
                    onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors"
                    style={{
                      background: "oklch(15% 0 0)",
                      borderColor: "oklch(25% 0 0)",
                      color: "oklch(90% 0.005 85)",
                    }}
                    placeholder="+39 333 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                    Paese
                  </label>
                  <input
                    value={form.guestCountry}
                    onChange={(e) => setForm({ ...form, guestCountry: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors"
                    style={{
                      background: "oklch(15% 0 0)",
                      borderColor: "oklch(25% 0 0)",
                      color: "oklch(90% 0.005 85)",
                    }}
                    placeholder="Italia"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                  Numero di partecipanti *
                </label>
                <select
                  value={form.participants}
                  onChange={(e) => setForm({ ...form, participants: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors"
                  style={{
                    background: "oklch(15% 0 0)",
                    borderColor: "oklch(25% 0 0)",
                    color: "oklch(90% 0.005 85)",
                  }}
                >
                  {Array.from({ length: Math.min(workshop.maxParticipants ?? 10, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "persona" : "persone"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[oklch(55%_0.005_85)] mb-1.5 uppercase tracking-wider">
                  Note (allergie, richieste speciali)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none focus:border-[oklch(55%_0.075_55)] transition-colors resize-none"
                  style={{
                    background: "oklch(15% 0 0)",
                    borderColor: "oklch(25% 0 0)",
                    color: "oklch(90% 0.005 85)",
                  }}
                  placeholder="Eventuali note..."
                />
              </div>

              {/* Price summary */}
              <div className="p-4 rounded-xl border border-[oklch(22%_0_0)]"
                style={{ background: "oklch(13% 0 0)" }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[oklch(60%_0.005_85)]">
                    €{parseFloat(workshop.priceEur).toFixed(0)} × {form.participants} persona/e
                  </span>
                  <span className="text-[oklch(85%_0.005_85)]">
                    €{(parseFloat(workshop.priceEur) * form.participants).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-[oklch(22%_0_0)] pt-2 mt-2">
                  <span className="text-[oklch(55%_0.075_55)] font-medium">
                    Deposito ora (50%)
                  </span>
                  <span className="text-[oklch(55%_0.075_55)] font-medium">
                    €{(parseFloat(workshop.priceEur) * form.participants * 0.5).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[oklch(45%_0.005_85)] mt-2">
                  Il saldo di €{(parseFloat(workshop.priceEur) * form.participants * 0.5).toFixed(2)} sarà dovuto il giorno del workshop.
                </p>
              </div>

              <button
                type="submit"
                disabled={createBookingMutation.isPending}
              className="w-full py-3 rounded-[12px] font-semibold transition-all duration-200 disabled:opacity-60 shadow-[0_10px_20px_rgba(139,69,19,0.3)] hover:-translate-y-[1px]"
                style={{
                  background: "oklch(55% 0.075 55)",
                  color: "oklch(98% 0 0)",
                }}
              >
                {createBookingMutation.isPending ? "Elaborazione..." : "Conferma e paga il deposito →"}
              </button>
            </form>
          </div>
        )}

        {/* Step: Review + Pay */}
        {step === "review" && bookingResult && (
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "oklch(55% 0.075 55 / 0.15)", border: "1px solid oklch(55% 0.075 55)" }}>
                <span className="text-2xl">✓</span>
              </div>
              <h2
                className="text-[24px] text-[oklch(92%_0.005_85)] mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.2 }}
              >
                Prenotazione ricevuta!
              </h2>
              <p className="text-[oklch(60%_0.005_85)] text-sm">
                Il tuo codice di prenotazione è:
              </p>
              <p className="text-2xl font-mono tracking-widest text-[oklch(55%_0.075_55)] mt-2 mb-1">
                {bookingResult.confirmationCode}
              </p>
              <p className="text-xs text-[oklch(45%_0.005_85)]">
                Conserva questo codice per il giorno del workshop.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[oklch(22%_0_0)] mb-6 text-left"
              style={{ background: "oklch(13% 0 0)" }}>
              <h3 className="text-sm font-medium text-[oklch(80%_0.005_85)] mb-3">
                Riepilogo prenotazione
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[oklch(55%_0.005_85)]">Workshop</span>
                  <span className="text-[oklch(85%_0.005_85)]">{bookingResult.workshopTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[oklch(55%_0.005_85)]">Data</span>
                  <span className="text-[oklch(85%_0.005_85)]">{formatDate(bookingResult.sessionDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[oklch(55%_0.005_85)]">Partecipanti</span>
                  <span className="text-[oklch(85%_0.005_85)]">{bookingResult.participants}</span>
                </div>
                <div className="flex justify-between border-t border-[oklch(22%_0_0)] pt-2 mt-2">
                  <span className="text-[oklch(55%_0.005_85)]">Totale</span>
                  <span className="text-[oklch(85%_0.005_85)]">€{bookingResult.totalAmountEur.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[oklch(55%_0.075_55)] font-medium">Da pagare ora (50%)</span>
                  <span className="text-[oklch(55%_0.075_55)] font-medium">€{bookingResult.depositAmountEur.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[oklch(45%_0.005_85)]">Saldo il giorno del workshop</span>
                  <span className="text-[oklch(45%_0.005_85)]">€{bookingResult.balanceAmountEur.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handlePayDeposit}
              disabled={createCheckoutMutation.isPending}
              className="w-full py-3.5 rounded-[12px] font-semibold text-base transition-all duration-200 disabled:opacity-60 mb-3 shadow-[0_10px_20px_rgba(139,69,19,0.3)] hover:-translate-y-[1px]"
              style={{
                background: "oklch(55% 0.075 55)",
                color: "oklch(98% 0 0)",
              }}
            >
              {createCheckoutMutation.isPending
                ? "Reindirizzamento a Stripe..."
                : `Paga il deposito €${bookingResult.depositAmountEur.toFixed(2)} →`}
            </button>
            <p className="text-xs text-[oklch(40%_0.005_85)]">
              Sarai reindirizzato a Stripe per il pagamento sicuro. Usa la carta di test: 4242 4242 4242 4242.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
