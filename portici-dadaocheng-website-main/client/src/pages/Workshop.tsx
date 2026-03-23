import { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Shared visual components from Home Workshop section ─── */

const IMG = {
  dadaochengArcade:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/noBAAdsQpHVXgrUG.png",
  bolognaPortici:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/WFoweFZbdbtPoFjX.png",
  dadaochengTemple:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/fJQLNNktTOZKWVkY.png",
  dadaochengBaroque: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/yHHrSUbnQhNbXYxP.png",
  calligroupA:       "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png",
  calliInkBrush:     "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/dFdjgXVTblMasniP.png",
  calliEuroMan:      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/EizOfazFNGcbaYxm.png",
  calliFlowerGirls:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/CWqYQNYqpYltaUBn.png",
  calliClassroom:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/pmoSxbLCOlhTAXWL.png",
  inkFlower:         "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/PAfFLmeFyGztnQqK.png",
  teaSettle:         "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/bglhzhpRWfrDXIyk.png",
  workshop:          "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vVbLoAhQOXtqsgRp.png",
  teaWare:           "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/tIhnZPQxlSeAhdvy.png",
  matcha:            "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vWhTfjQHHShnwmTa.png",
  dadaochengMarket:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/LDbCEzwVXwntKepU.png",
  teaRoomInterior:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/moKMdnvvYcKhiErW.png",
  teaTrayCloseup:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/VmUsguHFlqXOZXyu.png",
  dumplingWorkshop:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YMRvdgKpLhmaPWyF.png",
  baozi:             "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/TyMWdcUtnQcKPoYO.png",
  dadaochengStreet:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/JlGNTUqhPVkwUfEj.png",
  teaCeremony:       "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/FvnvFYxyZBtkoWGM.png",
  highResScene:      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/QlYNHHXFFlKYYNOQ.png",
  scenePhoto:        "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/KpoiAaEWTttzycOO.png",
};

const WORKSHOP_SLIDES = [
  { src: IMG.calligroupA,      label: "書法",     caption: "Calligrafia — Scrivere il tempo" },
  { src: IMG.calliEuroMan,     label: "水墨",     caption: "Inchiostro — Il gesto che non mente" },
  { src: IMG.calliClassroom,   label: "課堂",     caption: "Insieme — Imparare è un atto sociale" },
  { src: IMG.calliFlowerGirls, label: "花鳥",     caption: "Fiori — La natura come vocabolario" },
  { src: IMG.calliInkBrush,    label: "筆",       caption: "Il pennello — Strumento di meditazione" },
  { src: IMG.inkFlower,        label: "梅",       caption: "Susino — Bellezza nella semplicità" },
  { src: IMG.dumplingWorkshop, label: "餃子",     caption: "Ravioli — Cultura che si mangia" },
  { src: IMG.baozi,            label: "包子",     caption: "Baozi — Le mani che trasmettono" },
  { src: IMG.teaTrayCloseup,   label: "茶",       caption: "Tè — Tre filosofie, una tazza" },
  { src: IMG.teaCeremony,      label: "茶道",     caption: "Cerimonia — Il rito trasforma" },
];

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.12);
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Carousel({
  slides,
  height = "clamp(380px, 52vh, 620px)",
  interval = 4500,
  showDots = false,
  showProgress = false,
  showCounter = false,
  overlayGradient = "linear-gradient(to bottom, oklch(0% 0 0 / 0.1) 0%, oklch(0% 0 0 / 0.55) 100%)",
}: {
  slides: { src: string; label: string; caption: string }[];
  height?: string;
  interval?: number;
  showDots?: boolean;
  showProgress?: boolean;
  showCounter?: boolean;
  overlayGradient?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(true);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCaptionVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
        setTimeout(() => setCaptionVisible(true), 80);
      }, 500);
    },
    [isTransitioning],
  );

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [isPaused, next, interval]);

  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden"
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img src={s.src} alt={s.label} className="w-full h-full object-cover" loading={i <= 2 ? "eager" : "lazy"} />
          <div className="absolute inset-0" style={{ background: overlayGradient }} />
        </div>
      ))}

      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 py-7 md:px-12 md:py-9"
        style={{
          opacity: captionVisible ? 1 : 0,
          transform: captionVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.45s ease, transform 0.45s ease",
        }}
      >
        <div className="flex items-end justify-between max-w-5xl mx-auto">
          <div>
            <p
              className="text-[12px] tracking-[0.24em] uppercase text-primary mb-1.5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {slide.label}
            </p>
            <p
              className="text-[var(--on-dark)] max-w-[440px]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                fontWeight: 400,
                lineHeight: 1.35,
              }}
            >
              {slide.caption}
            </p>
          </div>
          {showCounter && (
            <p
              className="text-[var(--on-dark)]/70 hidden md:block"
              style={{ fontFamily: "var(--font-ui)", fontSize: "12px" }}
            >
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          )}
        </div>
      </div>

      {[{ dir: "prev", Icon: Calendar, onClick: prev, pos: "left-3 md:left-6" },
        { dir: "next", Icon: MapPin, onClick: next, pos: "right-3 md:right-6" }].map(({ dir, Icon, onClick, pos }) => (
        <button
          key={dir}
          onClick={onClick}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--on-dark)]/40 text-[var(--on-dark)] hover:border-primary hover:text-primary transition-all duration-300 bg-black/25`}
          aria-label={dir}
        >
          <Icon size={16} />
        </button>
      ))}

      {showDots && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "20px" : "5px",
                height: "5px",
                backgroundColor: i === current ? "var(--primary)" : "rgba(245,222,179,0.5)",
              }}
              aria-label={`${i + 1}`}
            />
          ))}
        </div>
      )}

      {showProgress && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-[var(--on-dark)]/15">
          <div
            className="h-full bg-primary"
            style={{ width: `${((current + 1) / total) * 100}%`, transition: "width 0.5s ease" }}
          />
        </div>
      )}
    </div>
  );
}

const WORKSHOP_FEATURES = [
  {
    category: "Calligrafia & Inchiostro",
    categoryZh: "書法水墨",
    title: "Scrivere è pensare con il corpo",
    body: "Attraverso il pennello e l'inchiostro, scopri come la calligrafia cinese trasforma ogni gesto in un atto di meditazione. Non si impara a copiare caratteri — si impara a stare presenti.",
    cta: "Scopri il Workshop",
    href: "/workshop/calligraphy",
    src: IMG.calligroupA,
    alt: "Workshop di calligrafia — gruppo intorno al tavolo",
    reverse: false,
    accent: "var(--primary)",
  },
  {
    category: "Pittura ad Inchiostro",
    categoryZh: "水墨畫",
    title: "Il gesto che non mente",
    body: "Nella pittura a inchiostro non esiste correzione. Ogni pennellata è definitiva — come le parole dette con sincerità. Un'esperienza che insegna a fidarsi del proprio istinto.",
    cta: "Prenota un Posto",
    href: "/workshop",
    src: IMG.inkFlower,
    alt: "Mano che dipinge fiori di susino con inchiostro",
    reverse: true,
    accent: "var(--secondary)",
  },
  {
    category: "Cucina Culturale",
    categoryZh: "飲食文化",
    title: "Cultura che si mangia",
    body: "Impastare ravioli o modellare baozi non è solo cucinare — è accedere a un codice culturale che si tramanda attraverso le mani. Ogni piega racconta una storia.",
    cta: "Vedi il Programma",
    href: "/workshop",
    src: IMG.dumplingWorkshop,
    alt: "Famiglia italiana impara a fare i ravioli cinesi",
    reverse: false,
    accent: "var(--accent)",
  },
];

function WorkshopHighlightSection() {
  return (
    <section className="py-0 bg-background">
      <div className="container py-20">
        <Reveal>
          <p
            className="font-normal tracking-[0.22em] uppercase text-primary mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700 }}
          >
            Workshop
          </p>
          <h2
            className="font-medium text-[oklch(27.5%_0.000_0)]"
            style={{
              fontFamily: "'Cooper Black', serif",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "-1px",
            }}
          >
            Esperienze che aprono nuove prospettive
          </h2>
          <div className="w-10 h-0.5 bg-primary mt-5" />
        </Reveal>
      </div>

      {WORKSHOP_FEATURES.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <div
            className={`group/card relative grid md:grid-cols-2 items-stretch transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_22px_40px_rgba(44,62,80,0.3)] rounded-[16px] overflow-hidden ${
              item.reverse ? "md:[direction:rtl]" : ""
            }`}
          >
            <div
              className="absolute -inset-1 rounded-[20px] pointer-events-none -z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${item.accent}15, transparent 50%)`,
                animation: "pulse-frame 2.5s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -inset-2 rounded-[24px] border border-primary/20 pointer-events-none -z-10 opacity-40"
              style={{ animation: "pulse-frame 3s ease-in-out infinite 0.5s" }}
            />

            <div
              className="relative overflow-hidden group rounded-[16px_16px_0_0] md:rounded-[16px_0_0_16px]"
              style={{ minHeight: "380px" }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ direction: "ltr" }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10"
                style={{ direction: "ltr" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                style={{ direction: "ltr" }}
              >
                <p
                  className="text-[var(--on-dark)] text-sm leading-relaxed max-w-md"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {item.body}
                </p>
              </div>
              <div
                className="absolute top-6 left-6 z-10"
                style={{
                  direction: "ltr",
                  animation: `fade-slide-up 0.6s ease-out ${300 + i * 150}ms forwards`,
                }}
              >
                <span
                  className="text-[11px] tracking-[0.22em] uppercase text-[var(--on-dark)] bg-black/45 px-3 py-1.5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  {item.categoryZh}
                </span>
              </div>
            </div>

            <div
              className="flex flex-col justify-center px-10 py-14 md:px-14 md:py-16 bg-card rounded-[0_0_16px_16px] md:rounded-[0_16px_16px_0]"
              style={{ direction: "ltr" }}
            >
              <span
                className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}
              >
                {item.category}
              </span>
              <h3
                className="text-foreground mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
                  fontWeight: 500,
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>
              <p
                className="text-[18px] text-muted-foreground leading-[1.8] mb-9"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                {item.body}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}
                >
                  {item.cta} <ArrowRight size={14} />
                </Link>
                {item.href === "/workshop/calligraphy" && (
                  <Link
                    href="/workshop/calligraphy"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold px-5 py-2.5 border border-primary/40 text-primary transition-all duration-300 hover:gap-3"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    Vedi tutte le foto del corso <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      <div className="bg-[oklch(14%_0_0)] mt-0">
        <div className="container py-10">
          <Reveal>
            <p
              className="text-[12px] tracking-[0.28em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "14px" }}
            >
              Momenti dai Workshop
            </p>
          </Reveal>
        </div>
        <Carousel
          slides={WORKSHOP_SLIDES}
          height="clamp(300px, 42vh, 520px)"
          interval={3800}
          overlayGradient="linear-gradient(to bottom, oklch(0% 0 0 / 0.05) 0%, oklch(0% 0 0 / 0.6) 100%)"
        />
        <div className="container pb-12 pt-8 text-center">
          <Reveal>
            <Link
              href="/workshop"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:opacity-70 hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", fontSize: "17px" }}
            >
              Vedi tutti i workshop <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

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

      {/* Highlight strip moved from Home page */}
      <WorkshopHighlightSection />
    </main>
  );
}
