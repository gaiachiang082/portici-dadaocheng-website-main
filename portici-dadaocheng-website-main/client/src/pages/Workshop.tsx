import { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLang, useLocalizedHref } from "@/contexts/LangContext";
import { getWorkshopOverviewCopy, type WorkshopOverviewCopy } from "@/i18n/workshopOverviewLocale";
import { getWorkshopsBookingCopy } from "@/i18n/workshopBookingLocale";

/** `/eventi` or `/eventi?…` → `/${lang}/eventi` preserving query. */
function localizeEventiHref(raw: string, lh: (path: string) => string): string {
  if (raw === "/eventi") return lh("/eventi");
  if (raw.startsWith("/eventi?")) return `${lh("/eventi")}?${raw.slice(8)}`;
  return raw;
}

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
  overlayGradient = "linear-gradient(to bottom, color-mix(in srgb, var(--forest-deep) 8%, transparent) 0%, color-mix(in srgb, var(--forest-deep) 58%, transparent) 100%)",
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
                backgroundColor: i === current ? "var(--primary)" : "color-mix(in srgb, var(--paper) 50%, transparent)",
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

function WorkshopHighlightSection({
  w,
  localizedHref,
}: {
  w: WorkshopOverviewCopy;
  localizedHref: (path: string) => string;
}) {
  return (
    <section className="py-0 bg-background">
      <div className="container py-20">
        <Reveal>
          <p
            className="font-normal tracking-[0.22em] uppercase text-primary mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700 }}
          >
            {w.highlightKicker}
          </p>
          <h2
            className="font-medium text-foreground"
            style={{
              fontFamily: "'Cooper Black', serif",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "-1px",
            }}
          >
            {w.highlightTitle}
          </h2>
          <div className="w-10 h-0.5 bg-primary mt-5" />
        </Reveal>
      </div>

      {w.workshopFeatures.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <div
            className={`group/card relative grid md:grid-cols-2 items-stretch transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_22px_40px_rgba(44,62,80,0.3)] rounded-[16px] overflow-hidden ${
              item.reverse ? "md:[direction:rtl]" : ""
            }`}
          >
            <div
              className="absolute -inset-1 rounded-[20px] pointer-events-none -z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${item.accent} 14%, transparent), transparent 50%)`,
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
                  href={localizeEventiHref(item.href, localizedHref)}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}
                >
                  {item.cta} <ArrowRight size={14} />
                </Link>
                {item.href.includes("calligraphy-ink") && (
                  <Link
                    href={localizedHref("/workshop/calligraphy")}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold px-5 py-2.5 border border-primary/40 text-primary transition-all duration-300 hover:gap-3"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    {w.calligraphyGalleryLink} <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      <div className="bg-forest mt-0">
        <div className="container py-10">
          <Reveal>
            <p
              className="text-[12px] tracking-[0.28em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "14px" }}
            >
              {w.tableImagesKicker}
            </p>
          </Reveal>
        </div>
        <Carousel
          slides={w.workshopSlides}
          height="clamp(300px, 42vh, 520px)"
          interval={3800}
          overlayGradient="linear-gradient(to bottom, color-mix(in srgb, var(--forest-deep) 5%, transparent) 0%, color-mix(in srgb, var(--forest-deep) 62%, transparent) 100%)"
        />
        <div className="container pb-12 pt-8 text-center">
          <Reveal>
            <Link
              href={localizedHref("/eventi")}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:opacity-70 hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", fontSize: "17px" }}
            >
              {w.linesAndDatesLink} <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Constants ─── */
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  calligraphy: {
    bg: "color-mix(in srgb, var(--riso-gold) 24%, var(--paper))",
    text: "color-mix(in srgb, var(--ink) 78%, var(--riso-gold))",
    border: "color-mix(in srgb, var(--riso-gold) 42%, var(--paper-deep))",
  },
  ink: {
    bg: "color-mix(in srgb, var(--riso-blue) 18%, var(--paper))",
    text: "color-mix(in srgb, var(--ink) 82%, var(--riso-blue))",
    border: "color-mix(in srgb, var(--riso-blue) 38%, var(--paper-deep))",
  },
  tea: {
    bg: "color-mix(in srgb, var(--riso-teal) 20%, var(--paper))",
    text: "color-mix(in srgb, var(--ink) 74%, var(--riso-teal))",
    border: "color-mix(in srgb, var(--riso-teal) 40%, var(--paper-deep))",
  },
  food: {
    bg: "color-mix(in srgb, var(--riso-peach) 22%, var(--paper))",
    text: "color-mix(in srgb, var(--ink) 72%, var(--brand-cta))",
    border: "color-mix(in srgb, var(--riso-peach) 42%, var(--paper-deep))",
  },
};

function formatDate(d: Date | string, dateLocale: string) {
  return new Date(d).toLocaleDateString(dateLocale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(d: Date | string, dateLocale: string) {
  return new Date(d).toLocaleTimeString(dateLocale, {
    hour: "2-digit",
    minute: "2-digit",
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
  onExpressInterest,
  w,
  dateLocale,
}: {
  workshop: any;
  sessions: any[];
  onExpressInterest: (slug: string, title: string) => void;
  w: WorkshopOverviewCopy;
  dateLocale: string;
}) {
  const localizedHref = useLocalizedHref();
  const catStyle = CATEGORY_COLORS[workshop.category] ?? CATEGORY_COLORS.calligraphy;
  const nextSession = sessions[0];
  const spotsLeft = nextSession ? nextSession.spotsTotal - nextSession.spotsBooked : 0;
  const isFull = nextSession ? spotsLeft <= 0 : true;

  return (
    <div className="bg-card overflow-hidden rounded-2xl border border-border shadow-sm grid md:grid-cols-[1fr_auto] transition-shadow duration-300 hover:shadow-md">
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
            {w.categoryLabels[workshop.category] ?? workshop.category}
          </span>
          {sessions.length > 0 && !isFull && (
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                background: "color-mix(in srgb, var(--riso-teal) 22%, var(--paper))",
                color: "color-mix(in srgb, var(--ink) 72%, var(--riso-teal))",
                border: "1px solid color-mix(in srgb, var(--riso-teal) 40%, var(--paper-deep))",
              }}
            >
              {w.badgeOnCalendar}
            </span>
          )}
          {isFull && sessions.length > 0 && (
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                background: "var(--muted)",
                color: "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {w.badgeFull}
            </span>
          )}
        </div>

        <h3
          className="font-medium text-foreground mb-2"
          style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "1.375rem", lineHeight: 1.3 }}
        >
          {workshop.title}
        </h3>
        {workshop.titleZh && (
          <p className="text-brand-cta mb-3 text-sm"
            style={{ fontFamily: "'Spectral', Georgia, serif" }}>
            {workshop.titleZh}
          </p>
        )}

        <p
          className="text-[17px] text-muted-foreground leading-[1.75] mb-5 max-w-2xl"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          {workshop.description}
        </p>

        {/* Session list */}
        {sessions.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-cta mb-2"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              {w.sessionDatesLead}
            </p>
            {sessions.slice(0, 3).map((s: any) => {
              const left = s.spotsTotal - s.spotsBooked;
              return (
                <div key={s.id}
                  className="flex items-center justify-between py-2 px-3 bg-surface-inset border border-border rounded-xl">
                  <div className="flex items-center gap-4">
                    <Calendar size={13} className="text-brand-cta shrink-0" />
                    <span className="text-sm text-foreground"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {formatDate(s.sessionDate, dateLocale)} · {formatTime(s.sessionDate, dateLocale)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                    {left <= 0 ? w.spotsFull : w.spotsN(left)}
                  </span>
                </div>
              );
            })}
            {sessions.length > 3 && (
              <p className="text-xs text-brand-cta pt-1"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                {w.moreDates(sessions.length - 3)}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {w.noPublicDates}
          </p>
        )}

        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground mt-5"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-brand-cta" />
            {workshop.durationMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={13} className="text-brand-cta" />
            {w.maxParticipants(workshop.maxParticipants)}
          </span>
          {workshop.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-cta" />
              {workshop.location}
            </span>
          )}
        </div>
      </div>

      {/* Right panel: interest-first + discreet booking */}
      <div className="bg-muted p-8 flex flex-col items-center justify-center gap-4 border-t md:border-t-0 md:border-l border-border min-w-[200px] md:rounded-r-2xl">
        <p className="text-xs text-center text-muted-foreground leading-relaxed max-w-[200px]"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          {w.depositBlurb}
        </p>

        <button
          type="button"
          onClick={() => onExpressInterest(workshop.slug, workshop.title)}
          className="w-full px-5 py-3 text-[16px] font-semibold bg-brand-cta text-brand-cta-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
        >
          {w.leaveNoteCta} <ArrowRight size={14} />
        </button>

        {sessions.length > 0 ? (
          <Link
            href={`${localizedHref("/workshops")}?booking=1&slug=${encodeURIComponent(workshop.slug)}`}
            className="text-[11px] text-center text-muted-foreground hover:text-brand-cta underline-offset-4 hover:underline [font-family:var(--font-ui)] uppercase tracking-wider"
          >
            {w.inviteDepositLink}
          </Link>
        ) : (
          <Link href={localizedHref("/contatti")}
            className="w-full px-5 py-2.5 text-[14px] font-medium border border-border text-foreground hover:bg-background transition-colors text-center rounded-md"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}
          >
            {w.writeUs}
          </Link>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Workshop() {
  const lang = useLang();
  const w = getWorkshopOverviewCopy(lang);
  const dateLocale = lang === "en" ? "en-GB" : "it-IT";
  const localizedHref = useLocalizedHref();
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

  const handleExpressInterest = (slug: string, title: string) => {
    navigate(
      `${localizedHref("/eventi")}?refSlug=${encodeURIComponent(slug)}&refTitle=${encodeURIComponent(title)}`
    );
  };

  const activeFilterCount = (filterCategory !== "all" ? 1 : 0) + (filterMonth !== "all" ? 1 : 0);

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-forest text-on-ink">
        <div className="container max-w-3xl">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-on-ink-accent mb-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {w.heroEyebrow}
          </p>
          <h1 className="font-medium text-on-ink mb-8"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.15 }}>
            {w.heroTitle1}
            <br />
            <em className="text-on-ink-accent not-italic">{w.heroTitle2Em}</em>
          </h1>
          <p className="text-[18px] text-on-ink-muted leading-[1.75]"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {w.heroP1}
          </p>
          <p className="text-[17px] text-on-ink-muted/90 leading-[1.75] mt-5"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {w.heroOpenQ}
          </p>
          <div className="w-10 h-0.5 bg-on-ink-accent mt-8" />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-surface-section-tint">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {w.steps.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <span className="text-4xl font-medium text-brand-cta/40 mb-3"
                  style={{ fontFamily: "'Spectral', Georgia, serif" }}>{step}</span>
                <h3 className="text-sm font-semibold text-foreground mb-2"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario + Filters */}
      <section className="py-24 bg-surface-inset">
        <div className="container">
          {/* Section header */}
          <div className="mb-10">
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-brand-cta mb-4"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              {w.sectionDbKicker}
            </p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-medium text-foreground"
                style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
                {w.sectionLabsTitle}
              </h2>
              <Link href={localizedHref("/eventi")}
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-cta hover:opacity-70 hover:gap-3 transition-all duration-300"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                {w.leaveNoteCta} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="w-10 h-0.5 bg-brand-cta mt-4" />
          </div>

          {/* ── Filter Bar ── */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <Filter size={14} className="text-brand-cta" />
                <span className="font-semibold text-foreground">{w.filterLead}</span>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap gap-2">
                {w.categoryFilters.map(({ value, label }) => (
                  <button key={value}
                    onClick={() => setFilterCategory(value)}
                    className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      background: filterCategory === value ? "var(--brand-cta)" : "var(--surface-inset)",
                      color: filterCategory === value ? "var(--brand-cta-foreground)" : "var(--foreground)",
                      border: filterCategory === value ? "1px solid var(--brand-cta)" : "1px solid var(--border)",
                    }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Month filter */}
              {availableMonths.length > 0 && (
                <>
                  <div className="w-px h-5 bg-border" />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilterMonth("all")}
                      className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                      background: filterMonth === "all" ? "var(--brand-cta)" : "var(--surface-inset)",
                      color: filterMonth === "all" ? "var(--brand-cta-foreground)" : "var(--foreground)",
                      border: filterMonth === "all" ? "1px solid var(--brand-cta)" : "1px solid var(--border)",
                      }}>
                      {w.filterAllMonths}
                    </button>
                    {availableMonths.map((mk) => {
                      const [year, month] = mk.split("-");
                      const label = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString(dateLocale, { month: "long", year: "numeric" });
                      return (
                        <button key={mk}
                          onClick={() => setFilterMonth(mk)}
                          className="px-3 py-1.5 text-xs font-semibold tracking-wide rounded-xl transition-all duration-200 capitalize"
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            background: filterMonth === mk ? "var(--brand-cta)" : "var(--surface-inset)",
                          color: filterMonth === mk ? "var(--brand-cta-foreground)" : "var(--foreground)",
                          border: filterMonth === mk ? "1px solid var(--brand-cta)" : "1px solid var(--border)",
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
                  className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  <X size={12} />
                  {w.filterClear(activeFilterCount)}
                </button>
              )}
            </div>
          </div>

          {/* Workshop list */}
          {isLoading ? (
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse" />
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4"
                style={{ fontFamily: "'Spectral', Georgia, serif" }}>
                {w.emptyFiltered}
              </p>
              <button
                onClick={() => { setFilterCategory("all"); setFilterMonth("all"); }}
                className="text-brand-cta text-sm font-semibold hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                {w.clearAllFilters}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {filteredData.map(({ workshop, sessions }) => (
                <WorkshopCalendarCard
                  key={workshop.id}
                  workshop={workshop}
                  sessions={sessions}
                  onExpressInterest={handleExpressInterest}
                  w={w}
                  dateLocale={dateLocale}
                />
              ))}
            </div>
          )}

          {/* Result count */}
          {!isLoading && filteredData.length > 0 && (
            <p className="mt-6 text-sm text-muted-foreground text-center"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              {activeFilterCount > 0
                ? w.resultCountFiltered(filteredData.length)
                : w.resultCount(filteredData.length)}
            </p>
          )}
        </div>
      </section>

      {/* Points system */}
      <section className="py-20 bg-forest text-on-ink">
        <div className="container max-w-2xl text-center">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-on-ink-accent mb-5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {w.whenYouHaveDateKicker}
          </p>
          <h2 className="font-medium text-on-ink mb-6"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            {w.whenYouHaveDateTitle}
          </h2>
          <p className="text-[18px] text-on-ink-muted leading-[1.8] mb-10"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {w.whenYouHaveDateP1}
          </p>
          <p className="text-[17px] text-on-ink-muted/90 leading-[1.75] mb-10"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {w.whenYouHaveDateOpenQ}
          </p>
          <Link href={localizedHref("/eventi")}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold bg-brand-cta text-brand-cta-foreground hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            {w.linesAndDatesLink} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Highlight strip moved from Home page */}
      <WorkshopHighlightSection w={w} localizedHref={localizedHref} />
    </main>
  );
}
