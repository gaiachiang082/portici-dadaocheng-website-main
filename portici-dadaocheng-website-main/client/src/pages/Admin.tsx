import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  CheckCircle, XCircle, ToggleLeft, ToggleRight, Plus, AlertTriangle, RefreshCw, Copy, Download,
} from "lucide-react";
import { toast } from "sonner";

/* ── Helpers ── */
function formatDate(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("it-IT", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/** Muted status surfaces: meaning preserved, integrated with paper / riso / destructive — not dashboard primaries. */
const PAYMENT_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  pending: {
    label: "In attesa",
    bg: "color-mix(in srgb, var(--riso-gold) 22%, var(--paper))",
    text: "var(--foreground)",
  },
  deposit_paid: {
    label: "Deposito pagato",
    bg: "color-mix(in srgb, var(--riso-teal) 16%, var(--paper))",
    text: "var(--foreground)",
  },
  fully_paid: {
    label: "Saldato",
    bg: "color-mix(in srgb, var(--riso-teal) 10%, var(--paper-warm))",
    text: "var(--ink-soft)",
  },
  refunded: {
    label: "Rimborsato",
    bg: "color-mix(in srgb, var(--muted) 65%, var(--paper))",
    text: "var(--muted-foreground)",
  },
  cancelled: {
    label: "Cancellato",
    bg: "color-mix(in srgb, var(--destructive) 12%, var(--paper))",
    text: "var(--destructive)",
  },
};

const STATUS_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  pending: {
    label: "In attesa",
    bg: "color-mix(in srgb, var(--riso-gold) 22%, var(--paper))",
    text: "var(--foreground)",
  },
  confirmed: {
    label: "Confermato",
    bg: "color-mix(in srgb, var(--riso-teal) 16%, var(--paper))",
    text: "var(--foreground)",
  },
  cancelled: {
    label: "Cancellato",
    bg: "color-mix(in srgb, var(--destructive) 12%, var(--paper))",
    text: "var(--destructive)",
  },
};

function Badge({ map, value }: { map: Record<string, { label: string; bg: string; text: string }>; value: string }) {
  const style = map[value] ?? {
    label: value,
    bg: "var(--muted)",
    text: "var(--muted-foreground)",
  };
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full border border-border/60"
      style={{ background: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}

type StatTone = "default" | "annotation" | "settled" | "revenue";

/* ── Stats Card ── */
function StatCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string | number;
  sub?: string;
  tone?: StatTone;
}) {
  const valueColor =
    tone === "annotation"
      ? "var(--editorial-mark)"
      : tone === "settled"
        ? "color-mix(in srgb, var(--riso-teal) 55%, var(--foreground))"
        : tone === "revenue"
          ? "var(--brand-cta)"
          : "var(--foreground)";

  return (
    <div className="bg-card border border-border p-5 shadow-sm">
      <p
        className="text-xs font-semibold tracking-[0.18em] uppercase text-editorial-mark mb-1"
        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
      >
        {label}
      </p>
      <p
        className="text-3xl font-medium"
        style={{ fontFamily: "'Spectral', Georgia, serif", color: valueColor }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="text-xs text-muted-foreground mt-1"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Bookings Tab ── */
function BookingsTab() {
  const [payFilter, setPayFilter] = useState<"all" | "pending" | "deposit_paid" | "fully_paid" | "refunded" | "cancelled">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data, isLoading, refetch } = trpc.admin.listBookings.useQuery(
    { paymentStatus: payFilter, status: statusFilter, limit, offset },
    { refetchOnWindowFocus: false }
  );

  const markPaid = trpc.admin.markBalancePaid.useMutation({
    onSuccess: () => { toast.success("Saldo marcato come pagato"); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const cancelBooking = trpc.admin.cancelBooking.useMutation({
    onSuccess: () => { toast.success("Prenotazione cancellata"); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const FILTER_OPTS = [
    { value: "all", label: "Tutti" },
    { value: "pending", label: "In attesa" },
    { value: "deposit_paid", label: "Deposito pagato" },
    { value: "fully_paid", label: "Saldato" },
    { value: "cancelled", label: "Cancellato" },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_OPTS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => { setPayFilter(value as typeof payFilter); setOffset(0); }}
            className={`px-3 py-1.5 text-xs font-semibold transition-opacity duration-200 border ${
              payFilter === value
                ? "bg-brand-cta text-brand-cta-foreground border-brand-cta"
                : "bg-muted text-muted-foreground border-border hover:opacity-90"
            }`}
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => refetch()}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          <RefreshCw size={12} /> Aggiorna
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted animate-pulse" />
          ))}
        </div>
      ) : !data?.bookings.length ? (
        <div className="text-center py-16 text-muted-foreground" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
          Nessuna prenotazione trovata.
        </div>
      ) : (
        <>
          <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            {data.total} prenotazioni totali · pagina {Math.floor(offset / limit) + 1}
          </div>
          <div className="space-y-3">
            {data.bookings.map(({ booking, workshop, session }) => (
              <div key={booking.id} className="bg-card border border-border p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="font-semibold text-foreground text-sm"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                      >
                        {booking.guestName}
                      </span>
                      <span className="text-xs text-muted-foreground">{booking.guestEmail}</span>
                      <span className="text-xs font-mono text-editorial-mark bg-muted px-2 py-0.5 border border-border">
                        {booking.confirmationCode}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge map={PAYMENT_BADGE} value={booking.paymentStatus} />
                      <Badge map={STATUS_BADGE} value={booking.status} />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      <p><strong className="text-foreground">Workshop:</strong> {workshop?.title ?? "—"}</p>
                      <p><strong className="text-foreground">Data:</strong> {formatDate(session?.sessionDate ?? null)}</p>
                      <p>
                        <strong className="text-foreground">Partecipanti:</strong> {booking.participants} ·{" "}
                        <strong className="text-foreground">Deposito:</strong> €{parseFloat(booking.depositAmountEur as string).toFixed(2)} ·{" "}
                        <strong className="text-foreground">Saldo:</strong> €{parseFloat(booking.balanceAmountEur as string).toFixed(2)}
                      </p>
                      <p><strong className="text-foreground">Prenotato il:</strong> {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {booking.paymentStatus === "deposit_paid" && (
                      <button
                        type="button"
                        onClick={() => markPaid.mutate({ bookingId: booking.id })}
                        disabled={markPaid.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-brand-cta text-brand-cta-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                      >
                        <CheckCircle size={12} /> Marca saldato
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Cancellare la prenotazione di ${booking.guestName}?`)) {
                            cancelBooking.mutate({ bookingId: booking.id });
                          }
                        }}
                        disabled={cancelBooking.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-editorial-mark transition-colors disabled:opacity-50"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                      >
                        <XCircle size={12} /> Cancella
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex gap-3 mt-6 justify-center">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - limit))}
              className="px-4 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-foreground disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              ← Precedente
            </button>
            <button
              type="button"
              disabled={offset + limit >= (data?.total ?? 0)}
              onClick={() => setOffset(offset + limit)}
              className="px-4 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-foreground disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              Successivo →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Sessions Tab ── */
function SessionsTab() {
  const { data: allWorkshops, isLoading } = trpc.admin.listAllWorkshops.useQuery();
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newSpots, setNewSpots] = useState(12);

  const { data: sessions, refetch: refetchSessions } = trpc.admin.listSessions.useQuery(
    { workshopId: selectedWorkshopId ?? 0 },
    { enabled: selectedWorkshopId !== null }
  );

  const toggleWorkshop = trpc.admin.toggleWorkshopActive.useMutation({
    onSuccess: () => toast.success("Workshop aggiornato"),
    onError: (e) => toast.error(e.message),
  });

  const createSession = trpc.admin.createSession.useMutation({
    onSuccess: () => {
      toast.success("Sessione creata");
      setShowAddForm(false);
      setNewDate("");
      setNewSpots(12);
      refetchSessions();
    },
    onError: (e) => toast.error(e.message),
  });

  const toggleSession = trpc.admin.toggleSessionActive.useMutation({
    onSuccess: () => { toast.success("Sessione aggiornata"); refetchSessions(); },
    onError: (e) => toast.error(e.message),
  });

  const inputClass =
    "w-full px-3 py-2 text-sm border border-input bg-background text-foreground focus:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20";

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-8">
      {/* Workshop list */}
      <div>
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase text-editorial-mark mb-4"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          Workshop
        </p>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {allWorkshops?.map((w) => (
              <div
                key={w.id}
                className={`flex items-center justify-between p-3 border cursor-pointer transition-colors duration-200 ${
                  selectedWorkshopId === w.id
                    ? "bg-muted border-editorial-mark"
                    : "bg-card border-border hover:border-[color-mix(in_srgb,var(--editorial-mark)_35%,transparent)]"
                }`}
                onClick={() => setSelectedWorkshopId(w.id)}
              >
                <div>
                  <p className="text-sm font-medium text-foreground" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.category}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWorkshop.mutate({ workshopId: w.id, isActive: !w.isActive });
                  }}
                  className="shrink-0 ml-2"
                  title={w.isActive ? "Disattiva" : "Attiva"}
                >
                  {w.isActive
                    ? <ToggleRight size={22} className="text-brand-cta" />
                    : <ToggleLeft size={22} className="text-muted-foreground" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sessions panel */}
      <div>
        {!selectedWorkshopId ? (
          <div className="flex items-center justify-center h-40 text-editorial-mark text-sm" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
            Seleziona un workshop per gestire le sessioni
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-editorial-mark"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
              >
                Sessioni
              </p>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-brand-cta text-brand-cta-foreground hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
              >
                <Plus size={12} /> Nuova sessione
              </button>
            </div>

            {/* Add session form */}
            {showAddForm && (
              <div className="bg-muted/50 border border-border p-5 mb-4">
                <p className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                  Nuova sessione
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      Data e ora
                    </label>
                    <input
                      type="datetime-local"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className={inputClass}
                      style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      Posti totali
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newSpots}
                      onChange={(e) => setNewSpots(parseInt(e.target.value))}
                      className={inputClass}
                      style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!newDate) { toast.error("Seleziona una data"); return; }
                      createSession.mutate({ workshopId: selectedWorkshopId, sessionDate: new Date(newDate).toISOString(), spotsTotal: newSpots });
                    }}
                    disabled={createSession.isPending}
                    className="px-4 py-2 text-xs font-semibold bg-brand-cta text-brand-cta-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                    style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                  >
                    {createSession.isPending ? "Creando..." : "Crea sessione"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark transition-colors"
                    style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                  >
                    Annulla
                  </button>
                </div>
              </div>
            )}

            {/* Session list */}
            {!sessions?.length ? (
              <div className="text-center py-10 text-muted-foreground text-sm" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                Nessuna sessione per questo workshop.
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((s) => {
                  const spotsLeft = s.spotsTotal - s.spotsBooked;
                  return (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-card border border-border">
                      <div>
                        <p className="text-sm font-medium text-foreground" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                          {formatDate(s.sessionDate)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                          {s.spotsBooked}/{s.spotsTotal} posti occupati · {spotsLeft} liberi
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {!s.isActive && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/80">
                            Inattiva
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleSession.mutate({ sessionId: s.id, isActive: !s.isActive })}
                          title={s.isActive ? "Disattiva" : "Attiva"}
                        >
                          {s.isActive
                            ? <ToggleRight size={22} className="text-brand-cta" />
                            : <ToggleLeft size={22} className="text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function escapeCsvCell(value: string | null | undefined): string {
  if (value == null || value === "") return '""';
  const s = String(value).replace(/"/g, '""');
  return `"${s}"`;
}

function downloadProgramInterestsCsv(
  rows: {
    createdAt: Date | string | null;
    email: string;
    name: string | null;
    topicSlug: string;
    topicTitle: string;
    note: string | null;
  }[]
) {
  const header = ["createdAt", "email", "name", "topicSlug", "topicTitle", "note"];
  const lines = [header.join(",")];
  for (const r of rows) {
    const created =
      r.createdAt instanceof Date
        ? r.createdAt.toISOString()
        : r.createdAt
          ? new Date(r.createdAt).toISOString()
          : "";
    lines.push(
      [
        escapeCsvCell(created),
        escapeCsvCell(r.email),
        escapeCsvCell(r.name),
        escapeCsvCell(r.topicSlug),
        escapeCsvCell(r.topicTitle),
        escapeCsvCell(r.note),
      ].join(",")
    );
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `interessi-programma-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Program interests tab ── */
function ProgramInterestsTab() {
  const [topicFilter, setTopicFilter] = useState<"all" | string>("all");
  const [offset, setOffset] = useState(0);
  const limit = 50;
  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.admin.listProgramInterests.useQuery(
    {
      topicSlug: topicFilter === "all" ? undefined : topicFilter,
      limit,
      offset,
    },
    { refetchOnWindowFocus: false }
  );

  const topicSummary = data?.topicSummary ?? [];
  const totalAllTopics = topicSummary.reduce((s, t) => s + t.count, 0);

  const handleExport = async () => {
    try {
      const exported = await utils.admin.listProgramInterests.fetch({
        topicSlug: topicFilter === "all" ? undefined : topicFilter,
        limit: 2500,
        offset: 0,
      });
      downloadProgramInterestsCsv(exported.rows);
      toast.success(
        exported.rows.length >= 2500
          ? "Esportate le prime 2500 righe (limite). Restringi il tema se serve."
          : `Esportate ${exported.rows.length} righe in CSV.`
      );
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Esportazione non riuscita");
    }
  };

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copiata");
    } catch {
      toast.error("Copia non riuscita");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <StatCard
          label="Manifestazioni"
          value={topicFilter === "all" ? totalAllTopics : data?.total ?? 0}
          sub={topicFilter === "all" ? "totale raccolto" : "per il tema selezionato"}
          tone="annotation"
        />
        <StatCard
          label="Linee tematiche"
          value={topicSummary.length}
          sub="slug distinti · sintesi domanda"
        />
      </div>

      {topicSummary.length > 0 && (
        <div className="mb-6">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase text-editorial-mark mb-3"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Per tema · conteggi e ultimo ingresso
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setTopicFilter("all");
                setOffset(0);
              }}
              className={`px-3 py-1.5 text-xs font-semibold transition-opacity duration-200 border ${
                topicFilter === "all"
                  ? "bg-brand-cta text-brand-cta-foreground border-brand-cta"
                  : "bg-muted text-muted-foreground border-border hover:opacity-90"
              }`}
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              Tutti
            </button>
            {topicSummary.map((t) => (
              <button
                key={t.topicSlug}
                type="button"
                onClick={() => {
                  setTopicFilter(t.topicSlug);
                  setOffset(0);
                }}
                className={`px-3 py-1.5 text-xs font-semibold transition-opacity duration-200 border text-left max-w-[280px] truncate ${
                  topicFilter === t.topicSlug
                    ? "bg-brand-cta text-brand-cta-foreground border-brand-cta"
                    : "bg-muted text-muted-foreground border-border hover:opacity-90"
                }`}
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                title={`${t.topicTitle} · ${t.topicSlug}`}
              >
                {t.topicTitle} ({t.count})
              </button>
            ))}
          </div>
          <div className="bg-card border border-border divide-y divide-border text-sm">
            {topicSummary.map((t) => (
              <div
                key={`row-${t.topicSlug}`}
                className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{t.topicTitle}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{t.topicSlug}</p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 text-right">
                  <span className="text-foreground font-semibold tabular-nums">{t.count}</span> · ultimo{" "}
                  {formatDate(t.latestAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 border border-border"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          <RefreshCw size={12} /> Aggiorna
        </button>
        <button
          type="button"
          onClick={() => void handleExport()}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-border text-foreground hover:border-editorial-mark transition-colors"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          <Download size={12} /> Esporta CSV
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse" />
          ))}
        </div>
      ) : !data?.rows.length ? (
        <div className="text-center py-16 text-muted-foreground" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
          Nessuna manifestazione di interesse ancora.
        </div>
      ) : (
        <>
          <div className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            {data.total} righe {topicFilter === "all" ? "in totale" : "per questo filtro"} · pagina{" "}
            {Math.floor(offset / limit) + 1}
          </div>
          <div className="space-y-3">
            {data.rows.map((row) => (
              <div key={row.id} className="bg-card border border-border p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                      >
                        {formatDate(row.createdAt)}
                      </span>
                      <span
                        className="text-sm font-medium text-foreground break-all"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                      >
                        {row.email}
                      </span>
                      <button
                        type="button"
                        onClick={() => void copyEmail(row.email)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-foreground transition-colors"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
                        title="Copia email"
                      >
                        <Copy size={12} /> Copia
                      </button>
                    </div>
                    {row.name && (
                      <p className="text-sm text-foreground" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                        <span className="text-muted-foreground">Nome · </span>
                        {row.name}
                      </p>
                    )}
                    <div className="text-xs space-y-1" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      <p>
                        <span className="text-muted-foreground">Tema · </span>
                        <span className="font-medium text-foreground">{row.topicTitle}</span>
                        <span className="text-muted-foreground font-mono ml-2">{row.topicSlug}</span>
                      </p>
                      {row.note && (
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap border-l-2 border-border pl-3 mt-2">
                          {row.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6 justify-center">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - limit))}
              className="px-4 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-foreground disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              ← Precedente
            </button>
            <button
              type="button"
              disabled={offset + limit >= (data?.total ?? 0)}
              onClick={() => setOffset(offset + limit)}
              className="px-4 py-2 text-xs font-semibold border border-border text-muted-foreground hover:border-editorial-mark hover:text-foreground disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              Successivo →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main Admin Page ── */
export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"bookings" | "sessions" | "interests">("bookings");

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  if (authLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-cta border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={32} className="text-editorial-mark mx-auto mb-4" />
          <p className="text-foreground mb-4" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.25rem" }}>
            Accesso richiesto
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-brand-cta text-brand-cta-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Torna alla home
          </button>
        </div>
      </main>
    );
  }

  if (user.role !== "admin") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={32} className="text-editorial-mark mx-auto mb-4" />
          <p className="text-foreground mb-2" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.25rem" }}>
            Accesso negato
          </p>
          <p className="text-muted-foreground text-sm mb-4" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Questa pagina è riservata agli amministratori.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-brand-cta text-brand-cta-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Torna alla home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest text-on-ink py-10">
        <div className="container">
          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase text-on-ink-accent mb-2"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Portici DaDaocheng
          </p>
          <h1 className="font-medium text-on-ink" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem" }}>
            Pannello di Amministrazione
          </h1>
          <p className="text-on-ink-muted text-sm mt-1" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Benvenuto, {user.name}
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <StatCard label="Totale" value={stats.totalBookings} sub="prenotazioni" />
            <StatCard label="In attesa" value={stats.pendingPayment} sub="pagamento" tone="annotation" />
            <StatCard label="Deposito" value={stats.depositPaid} sub="pagato" tone="settled" />
            <StatCard label="Saldato" value={stats.fullyPaid} sub="completamente" tone="settled" />
            <StatCard label="Incassato" value={`€${stats.totalRevenue.toFixed(0)}`} sub="depositi ricevuti" tone="revenue" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 mb-8 border-b border-border">
          {(["bookings", "sessions", "interests"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold transition-colors duration-200 border-b-2 ${
                activeTab === tab
                  ? "border-editorial-mark text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
            >
              {tab === "bookings"
                ? "Prenotazioni"
                : tab === "sessions"
                  ? "Workshop & Sessioni"
                  : "Interessi programma"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "bookings" ? (
          <BookingsTab />
        ) : activeTab === "sessions" ? (
          <SessionsTab />
        ) : (
          <ProgramInterestsTab />
        )}
      </div>
    </main>
  );
}
