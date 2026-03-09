import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

/* ─── Constants ─── */
const CATEGORY_LABELS: Record<string, string> = {
  calligraphy: "書法 · Calligrafia",
  ink: "水墨 · Inchiostro",
  tea: "茶道 · Cerimonia del Tè",
  food: "飲食 · Cucina",
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  calligraphy: { bg: "oklch(93% 0.02 45)", text: "oklch(35% 0.06 30)", border: "oklch(80% 0.04 45)" },
  ink:         { bg: "oklch(93% 0.01 240)", text: "oklch(30% 0.02 240)", border: "oklch(80% 0.02 240)" },
  tea:         { bg: "oklch(93% 0.02 140)", text: "oklch(38% 0.08 140)", border: "oklch(80% 0.05 140)" },
  food:        { bg: "oklch(93% 0.03 55)", text: "oklch(38% 0.09 55)", border: "oklch(80% 0.06 55)" },
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(d: Date | string) {
  return new Date(d).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMonthYear(d: Date | string) {
  return new Date(d).toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
  });
}

function getMonthKey(d: Date | string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
}

/* ─── Workshop Calendar Card ─── */
function WorkshopCalendarCard({
  workshop,
  sessions,
  onBook,
}: {
  workshop: any;
  sessions: any[];
  onBook: (slug: string) => void;
}) {
  const catStyle = CATEGORY_COLORS[workshop.category] ?? CATEGORY_COLORS.calligraphy;
  const nextSession = sessions[0];
  const spotsLeft = nextSession ? nextSession.spotsTotal - nextSession.spotsBooked : 0;
  const isFull = nextSession ? spotsLeft <= 0 : true;

  return (
    <div className="bg-white overflow-hidden rounded-2xl border border-gray-100 shadow-sm grid md:grid-cols-[1fr_auto] transition-shadow duration-300 hover:shadow-md">
      <div className="p-8">
        {/* Category + status badges */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              background: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            {CATEGORY_LABELS[workshop.category] ?? workshop.category}
          </span>
          {sessions.length > 0 && !isFull && (
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                background: "oklch(93% 0.04 165)",
                color: "oklch(38% 0.08 165)",
                border: "1px solid oklch(80% 0.06 165)",
              }}
            >
              Disponibile
            </span>
          )}
          {isFull && sessions.length > 0 && (
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                background: "oklch(93% 0 0)",
                color: "oklch(50% 0 0)",
                border: "1px solid oklch(80% 0 0)",
              }}
            >
              Completo
            </span>
          )}
        </div>

        <h3
          className="font-medium text-[oklch(27.5%_0.000_0)] mb-2"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.375rem", lineHeight: 1.3 }}
        >
          {workshop.title}
        </h3>
        {workshop.titleZh && (
          <p className="text-[oklch(55.0%_0.075_55)] mb-3 text-sm"
            style={{ fontFamily: "'Spectral', Georgia, serif" }}>
            {workshop.titleZh}
          </p>
        )}

        <p
          className="text-[17px] text-[oklch(50%_0.005_60)] leading-[1.75] mb-5 max-w-2xl"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          {workshop.description}
        </p>

        {/* Session list */}
        {sessions.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[oklch(55.0%_0.075_55)] mb-2"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Date disponibili
            </p>
            {sessions.slice(0, 3).map((s: any) => {
              const left = s.spotsTotal - s.spotsBooked;
              return (
                <div key={s.id}
                  className="flex items-center justify-between py-2 px-3 bg-[oklch(97%_0.003_85)] border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Calendar size={13} className="text-[oklch(55.0%_0.075_55)] shrink-0" />
                    <span className="text-sm text-[oklch(35%_0.005_60)]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {formatDate(s.sessionDate)} · {formatTime(s.sessionDate)}
                    </span>
                  </div>
                  <span className="text-xs text-[oklch(55%_0.005_60)] shrink-0 ml-4"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {left <= 0 ? "Completo" : `${left} posti`}
                  </span>
                </div>
              );
            })}
            {sessions.length > 3 && (
              <p className="text-xs text-[oklch(55.0%_0.075_55)] pt-1"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                + {sessions.length - 3} altre date disponibili
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-[oklch(60%_0.005_60)] italic"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Nessuna sessione programmata al momento. Contattaci per organizzare una data privata.
          </p>
        )}

        <div className="flex flex-wrap gap-5 text-sm text-[oklch(55%_0.005_60)] mt-5"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-[oklch(55.0%_0.075_55)]" />
            {workshop.durationMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} className="text-[oklch(55.0%_0.075_55)]" />
            Max {workshop.maxParticipants} partecipanti
          </span>
          {workshop.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[oklch(55.0%_0.075_55)]" />
              {workshop.location}
            </span>
          )}
        </div>
      </div>

      {/* Right panel: price + CTA */}
      <div className="bg-[oklch(96.5%_0.006_85)] p-8 flex flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 min-w-[200px] md:rounded-r-2xl">
        <div className="text-center">
          <p className="text-xs text-[oklch(60%_0.005_60)] mb-1"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Deposito (50%)
          </p>
          <p className="text-3xl font-medium text-[oklch(27.5%_0.000_0)]"
            style={{ fontFamily: "'Spectral', Georgia, serif" }}>
            €{Math.round(parseFloat(workshop.priceEur) * 0.5)}
          </p>
          <p className="text-xs text-[oklch(60%_0.005_60)] mt-0.5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Totale €{parseFloat(workshop.priceEur).toFixed(0)}
          </p>
        </div>

        {sessions.length > 0 ? (
          <button
            onClick={() => onBook(workshop.slug)}
            className="w-full px-5 py-3 text-[16px] font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity flex items-center justify-center gap-2"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Prenota il Tuo Posto <ArrowRight size={14} />
          </button>
        ) : (
          <Link href="/contatti"
            className="w-full px-5 py-3 text-[16px] font-semibold border border-[#a2482b] text-[#a2482b] hover:bg-[#a2482b] hover:text-[#F5F3EE] transition-colors text-center"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            Contattaci
          </Link>
        )}
        <p className="text-xs text-center text-[oklch(60%_0.005_60)]"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Cancellazione gratuita<br />fino al giorno prima
        </p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Workshop() {
  const [, navigate] = useLocation();
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterMonth, setFilterMonth] = useState<string>("all");

  const { data: allData, isLoading } = trpc.workshops.listAllWithSessions.useQuery();

  // Collect all unique months from sessions
  const availableMonths = useMemo(() => {
    if (!allData) return [];
    const monthSet = new Set<string>();
    allData.forEach(({ sessions }) => {
      sessions.forEach((s: any) => monthSet.add(getMonthKey(s.sessionDate)));
    });
    return Array.from(monthSet).sort();
  }, [allData]);

  // Filter workshops
  const filteredData = useMemo(() => {
    if (!allData) return [];
    return allData
      .map(({ workshop, sessions }) => {
        // Filter sessions by month
        const filteredSessions = filterMonth === "all"
          ? sessions
          : sessions.filter((s: any) => getMonthKey(s.sessionDate) === filterMonth);
        return { workshop, sessions: filteredSessions };
      })
      .filter(({ workshop, sessions }) => {
        const catMatch = filterCategory === "all" || workshop.category === filterCategory;
        const monthMatch = filterMonth === "all" || sessions.length > 0;
        return catMatch && monthMatch;
      });
  }, [allData, filterCategory, filterMonth]);

  const handleBook = (slug: string) => {
    navigate(`/workshops?slug=${slug}`);
  };

  const activeFilterCount = (filterCategory !== "all" ? 1 : 0) + (filterMonth !== "all" ? 1 : 0);

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-3xl">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Workshop
          </p>
          <h1 className="font-medium text-[oklch(96.5%_0.006_85)] mb-8"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.15 }}>
            Esperienze che lasciano
            <br />
            <em className="text-[oklch(55.0%_0.075_55)] not-italic">tracce permanenti.</em>
          </h1>
          <p className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Ogni workshop è progettato per creare almeno un momento in cui penserai:
            "Non avevo mai visto le cose in questo modo."
          </p>
          <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-8" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[oklch(89.5%_0.025_80)]">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Prenota e paga il 50%", desc: "Riserva il tuo posto con un deposito del 50% online tramite carta di credito." },
              { step: "02", title: "Cancellazione gratuita", desc: "Puoi cancellare gratuitamente fino al giorno prima. Il deposito diventa punti per il prossimo workshop." },
              { step: "03", title: "Paga il resto in loco", desc: "Il giorno dell'evento, dopo aver vissuto l'esperienza, saldi il restante 50% in contanti o carta." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <span className="text-4xl font-medium text-[oklch(55.0%_0.075_55)] opacity-40 mb-3"
                  style={{ fontFamily: "'Spectral', Georgia, serif" }}>{step}</span>
                <h3 className="text-sm font-semibold text-[oklch(27.5%_0.000_0)] mb-2"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{title}</h3>
                <p className="text-sm text-[oklch(50%_0.005_60)] leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario + Filters */}
      <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
        <div className="container">
          {/* Section header */}
          <div className="mb-10">
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#a2482b] mb-4"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              Calendario
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-medium text-[oklch(27.5%_0.000_0)]"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
                Workshop in Programma
              </h2>
              <Link href="/workshops"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#a2482b] hover:opacity-70 hover:gap-3 transition-all duration-300"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                Prenota direttamente <ArrowRight size={14} />
              </Link>
            </div>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-4" />
          </div>

          {/* ── Filter Bar ── */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[oklch(50%_0.005_60)]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <Filter size={14} className="text-[oklch(55.0%_0.075_55)]" />
                <span className="font-semibold text-[oklch(35%_0.005_60)]">Filtra:</span>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Tutti i tipi" },
                  { value: "calligraphy", label: "書法 Calligrafia" },
                  { value: "ink", label: "水墨 Inchiostro" },
                  { value: "tea", label: "茶道 Tè" },
                  { value: "food", label: "飲食 Cucina" },
                ].map(({ value, label }) => (
                  <button key={value}
                    onClick={() => setFilterCategory(value)}
                    className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      background: filterCategory === value ? "#a2482b" : "oklch(96% 0.003 85)",
                      color: filterCategory === value ? "#F5F3EE" : "oklch(45% 0.005 60)",
                      border: filterCategory === value ? "1px solid #a2482b" : "1px solid oklch(85% 0.005 85)",
                    }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Month filter */}
              {availableMonths.length > 0 && (
                <>
                  <div className="w-px h-5 bg-[oklch(85%_0.005_85)]" />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterMonth("all")}
                      className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                      background: filterMonth === "all" ? "#a2482b" : "oklch(96% 0.003 85)",
                      color: filterMonth === "all" ? "#F5F3EE" : "oklch(45% 0.005 60)",
                      border: filterMonth === "all" ? "1px solid #a2482b" : "1px solid oklch(85% 0.005 85)",
                      }}>
                      Tutti i mesi
                    </button>
                    {availableMonths.map((mk) => {
                      const [year, month] = mk.split("-");
                      const label = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString("it-IT", { month: "long", year: "numeric" });
                      return (
                        <button key={mk}
                          onClick={() => setFilterMonth(mk)}
                          className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200 capitalize"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            background: filterMonth === mk ? "#a2482b" : "oklch(96% 0.003 85)",
                          color: filterMonth === mk ? "#F5F3EE" : "oklch(45% 0.005 60)",
                          border: filterMonth === mk ? "1px solid #a2482b" : "1px solid oklch(85% 0.005 85)",
                          }}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Clear filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setFilterCategory("all"); setFilterMonth("all"); }}
                  className="ml-auto flex items-center gap-1.5 text-xs text-[oklch(50%_0.005_60)] hover:text-[oklch(30%_0.005_60)] transition-colors"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  <X size={12} />
                  Rimuovi filtri ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* Workshop list */}
          {isLoading ? (
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-[oklch(93%_0.003_85)] animate-pulse" />
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[oklch(55%_0.005_60)] text-lg mb-4"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                Nessun workshop trovato con i filtri selezionati.
              </p>
              <button
                onClick={() => { setFilterCategory("all"); setFilterMonth("all"); }}
                className="text-[oklch(55.0%_0.075_55)] text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Rimuovi tutti i filtri →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {filteredData.map(({ workshop, sessions }) => (
                <WorkshopCalendarCard
                  key={workshop.id}
                  workshop={workshop}
                  sessions={sessions}
                  onBook={handleBook}
                />
              ))}
            </div>
          )}

          {/* Result count */}
          {!isLoading && filteredData.length > 0 && (
            <p className="mt-6 text-sm text-[oklch(60%_0.005_60)] text-center"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              {filteredData.length} workshop {filteredData.length === 1 ? "trovato" : "trovati"}
              {activeFilterCount > 0 && " con i filtri applicati"}
            </p>
          )}
        </div>
      </section>

      {/* Points system */}
      <section className="py-20 bg-[oklch(27.5%_0.000_0)]">
        <div className="container max-w-2xl text-center">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Sistema Punti
          </p>
          <h2 className="font-medium text-[oklch(96.5%_0.006_85)] mb-6"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Il tuo deposito non va mai perso.
          </h2>
          <p className="text-[18px] text-[oklch(72%_0.005_85)] leading-[1.8] mb-10"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Se cancelli entro il giorno prima, il tuo deposito si trasforma automaticamente
            in punti da usare per prenotare il prossimo workshop. Perché la curiosità
            non dovrebbe avere scadenza.
          </p>
          <Link href="/workshops"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-[oklch(55.0%_0.075_55)] text-[oklch(96.5%_0.006_85)] hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Prenota il Tuo Posto <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
