import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  CheckCircle, XCircle, Clock, Euro, Users, Calendar,
  ToggleLeft, ToggleRight, Plus, ChevronDown, ChevronUp,
  AlertTriangle, RefreshCw
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

const PAYMENT_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  pending:      { label: "In attesa",      bg: "#FEF3C7", text: "#92400E" },
  deposit_paid: { label: "Deposito pagato", bg: "#DCFCE7", text: "#166534" },
  fully_paid:   { label: "Saldato",         bg: "#D1FAE5", text: "#065F46" },
  refunded:     { label: "Rimborsato",      bg: "#F3F4F6", text: "#374151" },
  cancelled:    { label: "Cancellato",      bg: "#FEE2E2", text: "#991B1B" },
};

const STATUS_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  pending:   { label: "In attesa",  bg: "#FEF3C7", text: "#92400E" },
  confirmed: { label: "Confermato", bg: "#DCFCE7", text: "#166534" },
  cancelled: { label: "Cancellato", bg: "#FEE2E2", text: "#991B1B" },
};

function Badge({ map, value }: { map: Record<string, { label: string; bg: string; text: string }>; value: string }) {
  const style = map[value] ?? { label: value, bg: "#F3F4F6", text: "#374151" };
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: style.bg, color: style.text }}>
      {style.label}
    </span>
  );
}

/* ── Stats Card ── */
function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-white border border-[#E5E0D8] p-5 shadow-sm">
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C52] mb-1"
        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{label}</p>
      <p className="text-3xl font-medium" style={{ fontFamily: "'Spectral', Georgia, serif", color: color ?? "#1C1917" }}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#78716C] mt-1" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{sub}</p>}
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
          <button key={value}
            onClick={() => { setPayFilter(value as typeof payFilter); setOffset(0); }}
            className="px-3 py-1.5 text-xs font-semibold transition-all duration-200"
            style={{
              fontFamily: "'Noto Sans', system-ui, sans-serif",
              background: payFilter === value ? "#a2482b" : "#F5F0EB",
              color: payFilter === value ? "#F5F3EE" : "#57534E",
              border: payFilter === value ? "1px solid #a2482b" : "1px solid #D6CFC4",
            }}>
            {label}
          </button>
        ))}
        <button onClick={() => refetch()} className="ml-auto flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1C1917] transition-colors px-3 py-1.5 border border-[#D6CFC4]"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
          <RefreshCw size={12} /> Aggiorna
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-[#F5F0EB] animate-pulse" />)}
        </div>
      ) : !data?.bookings.length ? (
        <div className="text-center py-16 text-[#78716C]" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
          Nessuna prenotazione trovata.
        </div>
      ) : (
        <>
          <div className="text-xs text-[#78716C] mb-3" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            {data.total} prenotazioni totali · pagina {Math.floor(offset / limit) + 1}
          </div>
          <div className="space-y-3">
            {data.bookings.map(({ booking, workshop, session }) => (
              <div key={booking.id} className="bg-white border border-[#E5E0D8] p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-semibold text-[#1C1917] text-sm"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                        {booking.guestName}
                      </span>
                      <span className="text-xs text-[#78716C]">{booking.guestEmail}</span>
                      <span className="text-xs font-mono text-[#A67C52] bg-[#FDF8F2] px-2 py-0.5 border border-[#E5D9C8]">
                        {booking.confirmationCode}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge map={PAYMENT_BADGE} value={booking.paymentStatus} />
                      <Badge map={STATUS_BADGE} value={booking.status} />
                    </div>
                    <div className="text-xs text-[#78716C] space-y-0.5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      <p><strong>Workshop:</strong> {workshop?.title ?? "—"}</p>
                      <p><strong>Data:</strong> {formatDate(session?.sessionDate ?? null)}</p>
                      <p><strong>Partecipanti:</strong> {booking.participants} · <strong>Deposito:</strong> €{parseFloat(booking.depositAmountEur as string).toFixed(2)} · <strong>Saldo:</strong> €{parseFloat(booking.balanceAmountEur as string).toFixed(2)}</p>
                      <p><strong>Prenotato il:</strong> {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {booking.paymentStatus === "deposit_paid" && (
                      <button
                        onClick={() => markPaid.mutate({ bookingId: booking.id })}
                        disabled={markPaid.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity disabled:opacity-50"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                        <CheckCircle size={12} /> Marca saldato
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => {
                          if (confirm(`Cancellare la prenotazione di ${booking.guestName}?`)) {
                            cancelBooking.mutate({ bookingId: booking.id });
                          }
                        }}
                        disabled={cancelBooking.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-[#D6CFC4] text-[#78716C] hover:border-[#a2482b] hover:text-[#a2482b] transition-colors disabled:opacity-50"
                        style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
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
            <button disabled={offset === 0}
              onClick={() => setOffset(Math.max(0, offset - limit))}
              className="px-4 py-2 text-xs font-semibold border border-[#D6CFC4] text-[#57534E] hover:border-[#a2482b] disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              ← Precedente
            </button>
            <button disabled={offset + limit >= (data?.total ?? 0)}
              onClick={() => setOffset(offset + limit)}
              className="px-4 py-2 text-xs font-semibold border border-[#D6CFC4] text-[#57534E] hover:border-[#a2482b] disabled:opacity-40 transition-colors"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
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

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-8">
      {/* Workshop list */}
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C52] mb-4"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>Workshop</p>
        {isLoading ? (
          <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-14 bg-[#F5F0EB] animate-pulse" />)}</div>
        ) : (
          <div className="space-y-2">
            {allWorkshops?.map((w) => (
              <div key={w.id}
                className="flex items-center justify-between p-3 border cursor-pointer transition-all duration-200"
                style={{
                  background: selectedWorkshopId === w.id ? "#FDF8F2" : "white",
                  borderColor: selectedWorkshopId === w.id ? "#a2482b" : "#E5E0D8",
                }}
                onClick={() => setSelectedWorkshopId(w.id)}>
                <div>
                  <p className="text-sm font-medium text-[#1C1917]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>{w.title}</p>
                  <p className="text-xs text-[#78716C]">{w.category}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWorkshop.mutate({ workshopId: w.id, isActive: !w.isActive });
                  }}
                  className="shrink-0 ml-2"
                  title={w.isActive ? "Disattiva" : "Attiva"}>
                  {w.isActive
                    ? <ToggleRight size={22} className="text-[#a2482b]" />
                    : <ToggleLeft size={22} className="text-[#D6CFC4]" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sessions panel */}
      <div>
        {!selectedWorkshopId ? (
          <div className="flex items-center justify-center h-40 text-[#A67C52] text-sm"
            style={{ fontFamily: "'Spectral', Georgia, serif" }}>
            Seleziona un workshop per gestire le sessioni
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#A67C52]"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>Sessioni</p>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                <Plus size={12} /> Nuova sessione
              </button>
            </div>

            {/* Add session form */}
            {showAddForm && (
              <div className="bg-[#FDF8F2] border border-[#E5D9C8] p-5 mb-4">
                <p className="text-sm font-semibold text-[#1C1917] mb-4" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                  Nuova sessione
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-[#78716C] mb-1 block" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      Data e ora
                    </label>
                    <input type="datetime-local" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#D6CFC4] bg-white focus:outline-none focus:border-[#a2482b] transition-colors"
                      style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }} />
                  </div>
                  <div>
                    <label className="text-xs text-[#78716C] mb-1 block" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                      Posti totali
                    </label>
                    <input type="number" min={1} max={100} value={newSpots} onChange={(e) => setNewSpots(parseInt(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-[#D6CFC4] bg-white focus:outline-none focus:border-[#a2482b] transition-colors"
                      style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!newDate) { toast.error("Seleziona una data"); return; }
                      createSession.mutate({ workshopId: selectedWorkshopId, sessionDate: new Date(newDate).toISOString(), spotsTotal: newSpots });
                    }}
                    disabled={createSession.isPending}
                    className="px-4 py-2 text-xs font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity disabled:opacity-50"
                    style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                    {createSession.isPending ? "Creando..." : "Crea sessione"}
                  </button>
                  <button onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-xs font-semibold border border-[#D6CFC4] text-[#78716C] hover:border-[#a2482b] transition-colors"
                    style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                    Annulla
                  </button>
                </div>
              </div>
            )}

            {/* Session list */}
            {!sessions?.length ? (
              <div className="text-center py-10 text-[#78716C] text-sm" style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                Nessuna sessione per questo workshop.
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((s) => {
                  const spotsLeft = s.spotsTotal - s.spotsBooked;
                  return (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-white border border-[#E5E0D8]">
                      <div>
                        <p className="text-sm font-medium text-[#1C1917]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                          {formatDate(s.sessionDate)}
                        </p>
                        <p className="text-xs text-[#78716C] mt-0.5" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                          {s.spotsBooked}/{s.spotsTotal} posti occupati · {spotsLeft} liberi
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {!s.isActive && (
                          <span className="text-xs text-[#78716C] bg-[#F3F4F6] px-2 py-0.5 rounded-full">Inattiva</span>
                        )}
                        <button
                          onClick={() => toggleSession.mutate({ sessionId: s.id, isActive: !s.isActive })}
                          title={s.isActive ? "Disattiva" : "Attiva"}>
                          {s.isActive
                            ? <ToggleRight size={22} className="text-[#a2482b]" />
                            : <ToggleLeft size={22} className="text-[#D6CFC4]" />}
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

/* ── Main Admin Page ── */
export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"bookings" | "sessions">("bookings");

  const { data: stats } = trpc.admin.stats.useQuery(undefined, {
    enabled: user?.role === "admin",
  });

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#a2482b] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={32} className="text-[#a2482b] mx-auto mb-4" />
          <p className="text-[#1C1917] mb-4" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.25rem" }}>
            Accesso richiesto
          </p>
          <button onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-[#a2482b] text-[#F5F3EE] text-sm font-semibold hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Torna alla home
          </button>
        </div>
      </main>
    );
  }

  if (user.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle size={32} className="text-[#a2482b] mx-auto mb-4" />
          <p className="text-[#1C1917] mb-2" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.25rem" }}>
            Accesso negato
          </p>
          <p className="text-[#78716C] text-sm mb-4" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Questa pagina è riservata agli amministratori.
          </p>
          <button onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-[#a2482b] text-[#F5F3EE] text-sm font-semibold hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Torna alla home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0EB]">
      {/* Header */}
      <div className="bg-[#1C1917] text-[#F5F3EE] py-10">
        <div className="container">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#A67C52] mb-2"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Portici DaDaocheng
          </p>
          <h1 className="font-medium" style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem" }}>
            Pannello di Amministrazione
          </h1>
          <p className="text-[#A67C52] text-sm mt-1" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
            Benvenuto, {user.name}
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            <StatCard label="Totale" value={stats.totalBookings} sub="prenotazioni" />
            <StatCard label="In attesa" value={stats.pendingPayment} sub="pagamento" color="#92400E" />
            <StatCard label="Deposito" value={stats.depositPaid} sub="pagato" color="#166534" />
            <StatCard label="Saldato" value={stats.fullyPaid} sub="completamente" color="#065F46" />
            <StatCard label="Incassato" value={`€${stats.totalRevenue.toFixed(0)}`} sub="depositi ricevuti" color="#a2482b" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-[#D6CFC4]">
          {(["bookings", "sessions"] as const).map((tab) => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2"
              style={{
                fontFamily: "'Noto Sans', system-ui, sans-serif",
                borderBottomColor: activeTab === tab ? "#a2482b" : "transparent",
                color: activeTab === tab ? "#a2482b" : "#78716C",
              }}>
              {tab === "bookings" ? "Prenotazioni" : "Workshop & Sessioni"}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "bookings" ? <BookingsTab /> : <SessionsTab />}
      </div>
    </main>
  );
}
