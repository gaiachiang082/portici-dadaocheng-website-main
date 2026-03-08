import { Link } from "wouter";
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useScrollReveal, useParallax } from "@/hooks/useScrollReveal";
import { ArchImage, ArchDecor, ArchDivider } from "@/components/ArchFrame";

/* ─────────────────────────────────────────────────────────────────
   CDN IMAGE REGISTRY
   ───────────────────────────────────────────────────────────────── */
const IMG = {
  /* ── Architecture / Places ── */
  dadaochengArcade:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/noBAAdsQpHVXgrUG.png", // 大稻埕亭仔腳 紅磚拱廊+紅燈籠
  bolognaPortici:   "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/WFoweFZbdbtPoFjX.png",// 波隆那 Portici 金色拱廊+壁畫天花板
  dadaochengTemple:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/fJQLNNktTOZKWVkY.png", // 大稻埕廟宇屋頂 龍鳳彩繪
  dadaochengBaroque: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/yHHrSUbnQhNbXYxP.png", // 大稻埕歷史建築立面 巴洛克石雕

  /* ── Calligraphy / Ink Workshops ── */
  calligroupA:       "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png", // 多人圍桌寫春聯
  calliInkBrush:     "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/dFdjgXVTblMasniP.png", // 特寫水墨筆
  calliEuroMan:      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/EizOfazFNGcbaYxm.png", // 歐洲男子寫水墨
  calliFlowerGirls:  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/CWqYQNYqpYltaUBn.png", // 兩女生畫花
  calliClassroom:    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/pmoSxbLCOlhTAXWL.png", // 多人課堂書法
  inkFlower:         "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/PAfFLmeFyGztnQqK.png", // 手繪梅花水墨

  /* ── Tea / Previous uploads ── */
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

/* ─────────────────────────────────────────────────────────────────
   WORKSHOP CAROUSEL SLIDES  (書法 + 水墨 + 茶道)
   ───────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────
   FULL GALLERY SLIDES  (all photos)
   ───────────────────────────────────────────────────────────────── */
const GALLERY_SLIDES = [
  { src: IMG.dadaochengArcade,  label: "大稻埕",   caption: "Dove la storia incontra il presente" },
  { src: IMG.bolognaPortici,    label: "Bologna",  caption: "I portici come soglie tra mondi" },
  { src: IMG.dadaochengTemple,  label: "廟宇",     caption: "Il sacro come linguaggio universale" },
  { src: IMG.dadaochengBaroque, label: "建築",     caption: "Architettura che racconta storie" },
  { src: IMG.calligroupA,       label: "書法",     caption: "Scrivere è pensare con il corpo" },
  { src: IMG.calliEuroMan,      label: "水墨",     caption: "Il gesto che non mente" },
  { src: IMG.calliFlowerGirls,  label: "花鳥",     caption: "La natura come vocabolario" },
  { src: IMG.calliClassroom,    label: "課堂",     caption: "Imparare è un atto sociale" },
  { src: IMG.inkFlower,         label: "梅",       caption: "Bellezza nella semplicità" },
  { src: IMG.teaTrayCloseup,    label: "茶",       caption: "Tre filosofie, una tazza" },
  { src: IMG.teaCeremony,       label: "茶道",     caption: "Il rito trasforma l'ordinario" },
  { src: IMG.dumplingWorkshop,  label: "餃子",     caption: "Cultura che si mangia" },
  { src: IMG.teaWare,           label: "茶器",     caption: "Gli strumenti del rito quotidiano" },
  { src: IMG.matcha,            label: "抹茶",     caption: "Arte in una tazza" },
  { src: IMG.highResScene,      label: "文化",     caption: "Scoprire l'altro per scoprire se stessi" },
];

/* ─────────────────────────────────────────────────────────────────
   SCROLL REVEAL WRAPPER
   ───────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useScrollReveal(0.12);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   GENERIC CAROUSEL
   ───────────────────────────────────────────────────────────────── */
function Carousel({
  slides,
  height = "clamp(380px, 52vh, 620px)",
  interval = 4500,
  showDots = true,
  showProgress = true,
  showCounter = true,
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

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCaptionVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
      setTimeout(() => setCaptionVisible(true), 80);
    }, 500);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [isPaused, next, interval]);

  const slide = slides[current];

  return (
    <div className="relative overflow-hidden" style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      {/* Slides cross-fade */}
      {slides.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <img src={s.src} alt={s.label} className="w-full h-full object-cover"
            loading={i <= 2 ? "eager" : "lazy"} />
          <div className="absolute inset-0" style={{ background: overlayGradient }} />
        </div>
      ))}

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-7 md:px-12 md:py-9"
        style={{
          opacity: captionVisible ? 1 : 0,
          transform: captionVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.45s ease, transform 0.45s ease",
        }}>
        <div className="flex items-end justify-between max-w-5xl mx-auto">
          <div>
            <p className="text-[12px] tracking-[0.24em] uppercase text-[oklch(55.0%_0.075_55)] mb-1.5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{slide.label}</p>
            <p className="text-[oklch(96.5%_0.006_85)] max-w-[440px]"
              style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1rem, 2vw, 1.35rem)", fontWeight: 400, lineHeight: 1.35 }}>
              {slide.caption}
            </p>
          </div>
          {showCounter && (
            <p className="text-[oklch(70%_0.005_85)] hidden md:block"
              style={{ fontFamily: 'var(--font-ui)', fontSize: "12px" }}>
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          )}
        </div>
      </div>

      {/* Arrows */}
      {[{ dir: "prev", Icon: ChevronLeft, onClick: prev, pos: "left-3 md:left-6" },
        { dir: "next", Icon: ChevronRight, onClick: next, pos: "right-3 md:right-6" }].map(({ dir, Icon, onClick, pos }) => (
        <button key={dir} onClick={onClick}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center border border-[oklch(80%_0.005_85/0.4)] text-[oklch(90%_0.005_85)] hover:border-[oklch(55.0%_0.075_55)] hover:text-[oklch(55.0%_0.075_55)] transition-all duration-300 bg-[oklch(0%_0_0/0.25)]`}
          aria-label={dir}>
          <Icon size={16} />
        </button>
      ))}

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "20px" : "5px", height: "5px",
                backgroundColor: i === current ? "oklch(55.0% 0.075 55)" : "oklch(80% 0.005 85 / 0.5)",
              }} aria-label={`${i + 1}`} />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {showProgress && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-[oklch(80%_0.005_85/0.15)]">
          <div className="h-full bg-[oklch(55.0%_0.075_55)]"
            style={{ width: `${((current + 1) / total) * 100}%`, transition: "width 0.5s ease" }} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO SECTION  — 雙城拱廊並排 + 淡入淡出輪播
   ───────────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    leftSrc: IMG.dadaochengArcade,
    leftAlt: "大稻埕亭仔腳 紅磚拱廊",
    rightSrc: IMG.bolognaPortici,
    rightAlt: "Bologna Portici 金色拱廊",
    leftLabel: "台北", leftName: "大稻埕",
    rightLabel: "Bologna", rightName: "Portici",
  },
  {
    leftSrc: IMG.dadaochengTemple,
    leftAlt: "大稻埕廟宇屋頂",
    rightSrc: IMG.calligroupA,
    rightAlt: "書法工作坊",
    leftLabel: "廟宇", leftName: "神聖空間",
    rightLabel: "Workshop", rightName: "Calligrafia",
  },
  {
    leftSrc: IMG.dadaochengBaroque,
    leftAlt: "大稻埕歷史建築",
    rightSrc: IMG.inkFlower,
    rightAlt: "水墨梅花",
    leftLabel: "建築", leftName: "歷史記憶",
    rightLabel: "Inchiostro", rightName: "水墨畫",
  },
];

function HeroSection() {
  const parallaxOffset = useParallax(0.3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[oklch(10%_0_0)]">

      {/* ── Split background: 大稻埕 left | Bologna right ── */}
      <div className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxOffset}px)` }}>

        {/* Left half — 大稻埕亭仔腳 紅磚拱廊（靜態） */}
        <div className="absolute inset-0 w-1/2">
          <img src={IMG.dadaochengArcade} alt="大稻埕亭仔腳 紅磚拱廊"
            className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(8% 0 0 / 0.72) 0%, oklch(8% 0 0 / 0.50) 70%, oklch(8% 0 0 / 0.80) 100%)" }} />
        </div>

        {/* Right half — Bologna Portici 金色拱廊（靜態） */}
        <div className="absolute inset-0 left-1/2">
          <img src={IMG.bolognaPortici} alt="Bologna Portici 金色拱廊"
            className="w-full h-full object-cover object-center scale-105" />
          <div className="absolute" style={{ background: "linear-gradient(to left, oklch(8% 0 0 / 0.72) 0%, oklch(8% 0 0 / 0.50) 70%, oklch(8% 0 0 / 0.80) 100%)", top: 0, bottom: 0, left: '-60px', right: 0 }} />
        </div>

        {/* Centre vertical divider glow */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, oklch(55.0% 0.075 55 / 0.8) 30%, oklch(55.0% 0.075 55 / 0.8) 70%, transparent)" }} />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, oklch(10% 0 0 / 0.7))" }} />
      </div>

      {/* Left ochre accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[oklch(55.0%_0.075_55)]" />

      {/* Main copy — centered, spacious */}
      <div className="container relative z-10 pt-28 pb-20 flex justify-center">
        <div className="max-w-[720px] w-full mx-auto px-4 md:px-8">
          <p className="text-[14px] font-normal tracking-[0.22em] uppercase text-[#a2482b] mb-9"
            style={{ fontFamily: 'var(--font-ui)',
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 150ms, transform 0.7s ease 150ms" }}>
            Esperienze Culturali Comparate
          </p>

          <h1 className="font-semibold text-gray-900 mb-8"
            style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(2.4rem, 4.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            {["Dove culture diverse", "interpretano", "la stessa cosa."].map((line, i) => (
              <span key={i} className="block"
                style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.8s ease ${280 + i * 160}ms, transform 0.8s ease ${280 + i * 160}ms`,
                  color: i === 1 ? "#a2482b" : "#171717",
                  fontStyle: i === 1 ? "italic" : "normal" }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="text-[18px] text-slate-800 leading-[1.75] mb-12 max-w-[540px]"
            style={{ fontFamily: 'var(--font-body)',
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s ease 700ms, transform 0.8s ease 700ms" }}>
            Esperienze culturali che rivelano come Asia e Europa rispondono alle stesse domande umane in modi sorprendentemente diversi.
          </p>

          <div className="flex flex-wrap gap-4"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s ease 880ms, transform 0.8s ease 880ms" }}>
            <Link href="/workshop"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold transition-all duration-300 hover:opacity-85 hover:gap-3 bg-[#a2482b] text-[#F5F3EE]"
              style={{ fontFamily: 'var(--font-ui)' }}>
              Scopri i Workshop <ArrowRight size={16} />
            </Link>
            <Link href="/chi-siamo"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[16px] font-semibold border border-slate-600 text-slate-800 transition-all duration-300 hover:border-[#A67C52] hover:text-[#A67C52] hover:gap-3"
              style={{ fontFamily: 'var(--font-ui)' }}>
              La Nostra Storia
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1200ms" }}>
        <div className="w-px bg-[oklch(55.0%_0.075_55)]"
          style={{ height: mounted ? "52px" : "0px", transition: "height 1s ease 1300ms" }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FULL-WIDTH GALLERY CAROUSEL  (all 15 photos)
   ───────────────────────────────────────────────────────────────── */
function GalleryCarousel() {
  return (
    <section className="relative bg-[oklch(10%_0_0)]">
      {/* Section label */}
      <div className="absolute top-5 left-6 md:left-12 z-20">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[oklch(70%_0.005_85/0.6)]"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Galleria Fotografica</p>
      </div>
      <Carousel slides={GALLERY_SLIDES} height="clamp(400px, 58vh, 660px)" interval={4200} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   WORKSHOP SECTION  — Alternating text / photo layout
   ───────────────────────────────────────────────────────────────── */
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
    accent: "oklch(55.0% 0.075 55)",
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
    accent: "oklch(57.5% 0.045 165)",
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
    accent: "oklch(70.0% 0.025 220)",
  },
];

function WorkshopSection() {
  return (
    <section className="py-0 bg-[oklch(96.5%_0.006_85)]">
      {/* Header */}
      <div className="container py-20">
        <Reveal>
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#a2482b] mb-4"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>Workshop</p>
          <h2 className="font-medium text-[oklch(27.5%_0.000_0)]"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Esperienze che aprono nuove prospettive
          </h2>
          <div className="w-10 h-0.5 bg-[#a2482b] mt-5" />
        </Reveal>
      </div>

      {/* Alternating rows */}
      {WORKSHOP_FEATURES.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <div className={`grid md:grid-cols-2 items-stretch ${item.reverse ? "md:[direction:rtl]" : ""}`}>
            {/* Image */}
            <div className="relative overflow-hidden group" style={{ minHeight: "380px" }}>
              <img src={item.src} alt={item.alt}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ direction: "ltr" }} />
              {/* Ochre tint on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `${item.accent.replace(")", " / 0.12)")}`, direction: "ltr" }} />
              {/* Category badge */}
              <div className="absolute top-6 left-6 z-10" style={{ direction: "ltr" }}>
                <span className="text-[11px] tracking-[0.22em] uppercase text-[oklch(96.5%_0.006_85)] bg-[oklch(0%_0_0/0.45)] px-3 py-1.5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{item.categoryZh}</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-14 md:px-14 md:py-16 bg-[oklch(98.5%_0.003_85)]"
              style={{ direction: "ltr" }}>
              <span className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}>
                {item.category}
              </span>
              <h3 className="text-[oklch(27.5%_0.000_0)] mb-5"
                style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)", fontWeight: 500, lineHeight: 1.25 }}>
                {item.title}
              </h3>
              <p className="text-[18px] text-[oklch(45%_0.005_60)] leading-[1.8] mb-9"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {item.body}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <Link href={item.href}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}>
                  {item.cta} <ArrowRight size={14} />
                </Link>
                {item.href === "/workshop/calligraphy" && (
                  <Link href="/workshop/calligraphy"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold px-5 py-2.5 border transition-all duration-300 hover:gap-3"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      color: item.accent,
                      borderColor: `${item.accent.replace(")", " / 0.4)")}`,
                    }}>
                    Vedi tutte le foto del corso <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      {/* Workshop carousel strip */}
      <div className="bg-[oklch(14%_0_0)] mt-0">
        <div className="container py-10">
          <Reveal>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[oklch(55.0%_0.075_55)] mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px' }}>Momenti dai Workshop</p>
          </Reveal>
        </div>
        <Carousel slides={WORKSHOP_SLIDES} height="clamp(300px, 42vh, 520px)" interval={3800}
          overlayGradient="linear-gradient(to bottom, oklch(0% 0 0 / 0.05) 0%, oklch(0% 0 0 / 0.6) 100%)" />
        <div className="container pb-12 pt-8 text-center">
          <Reveal>
            <Link href="/workshop"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#a2482b] hover:opacity-70 hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif", fontSize: '17px' }}>
              Vedi tutti i workshop <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DUAL CITY SECTION  — 大稻埕 vs Bologna side by side
   ───────────────────────────────────────────────────────────────── */
function DualCitySection() {
  const cities = [
    {
      name: "大稻埕",
      subtitle: "Taipei, Taiwan",
      src: IMG.dadaochengArcade,
      alt: "大稻埕亭仔腳 紅磚拱廊",
      description: "Il quartiere storico di Taipei dove i portici in mattoni rossi ospitano ancora profumerie di erbe, negozi di tè e botteghe artigiane. La memoria viva di un'Asia che non vuole dimenticare.",
      tag: "亭仔腳",
    },
    {
      name: "Bologna",
      subtitle: "Emilia-Romagna, Italia",
      src: IMG.bolognaPortici,
      alt: "Bologna Portici affrescati",
      description: "La città dei portici — 38 km di gallerie coperte che dal Medioevo proteggono i bolognesi dalla pioggia e dal sole. Un patrimonio UNESCO che è anche filosofia di vita: camminare insieme, al riparo.",
      tag: "Portici",
    },
  ];

  return (
    <section className="py-0 bg-[oklch(27.5%_0.000_0)]">
      <div className="container py-16" style={{paddingTop: '32px', paddingBottom: '0px'}}>
        <Reveal className="text-center mb-14">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Due Città, Un'Idea</p>
          <h2 className="font-medium text-[oklch(96.5%_0.006_85)]"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            I portici come linguaggio universale
          </h2>
          <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-5 mx-auto" />
        </Reveal>
      </div>

      <div className="grid md:grid-cols-2">
        {cities.map((city, i) => (
          <Reveal key={city.name} delay={i * 150}>
            <div className="group relative overflow-hidden" style={{ minHeight: "520px" }}>
              <img src={city.src} alt={city.alt}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              {/* Dark overlay */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, oklch(0% 0 0 / 0.85) 0%, oklch(0% 0 0 / 0.3) 50%, transparent 100%)" }} />
              {/* Divider line */}
              {i === 0 && <div className="absolute top-0 bottom-0 right-0 w-px bg-[oklch(55.0%_0.075_55/0.5)]" />}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="inline-block text-[11px] tracking-[0.24em] uppercase text-[oklch(55.0%_0.075_55)] bg-[oklch(0%_0_0/0.4)] px-3 py-1 mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.tag}</span>
                <h3 className="text-[oklch(96.5%_0.006_85)] mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 500 }}>
                  {city.name}
                </h3>
                <p className="text-[13px] tracking-[0.14em] text-[oklch(55.0%_0.075_55)] mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.subtitle}</p>
                <p className="text-[16px] text-[oklch(82%_0.005_85)] leading-[1.75] max-w-[400px]"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {city.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BRAND STORY STRIP
   ───────────────────────────────────────────────────────────────── */
function BrandStoryStrip() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "oklch(92% 0.008 85)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 120% 80% at 80% 50%, oklch(89% 0.012 75 / 0.6) 0%, transparent 70%)" }} />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>La Nostra Filosofia</p>
            <h2 className="font-medium text-[oklch(27.5%_0.000_0)] mb-2"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>同中求異</h2>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mb-7" />
            <p className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.8] mb-5"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              <em>Trovare le differenze nell'unità.</em> Il nostro metodo parte sempre dalla stessa domanda: come rispondono culture diverse allo stesso bisogno umano?
            </p>
            <p className="text-[18px] text-[oklch(40%_0.005_60)] leading-[1.8] mb-10"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Non per giudicare quale risposta sia migliore, ma per scoprire che la diversità stessa è la risposta più ricca che l'umanità abbia mai prodotto.
            </p>
            <Link href="/chi-siamo"
              className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#a2482b] hover:opacity-70 hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              Scopri la nostra storia <ArrowRight size={14} />
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-center justify-center">
              <div className="relative group" style={{ width: "280px" }}>
                <ArchImage src={IMG.teaSettle} alt="Cerimonia del tè — armonia" aspectRatio="3/4"
                  borderColor="oklch(55.0% 0.075 55 / 0.5)" />
                <div className="absolute -bottom-4 -right-4 -z-10">
                  <ArchDecor size="lg" color="oklch(55.0% 0.075 55)" opacity={0.15} />
                </div>
                <p className="mt-4 text-center text-[13px] tracking-[0.18em] uppercase text-[oklch(55%_0.005_60)]"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Il rito del tè</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ARCH GALLERY STRIP
   ───────────────────────────────────────────────────────────────── */
function ArchGalleryStrip() {
  const images = [
    { src: IMG.dadaochengArcade, alt: "大稻埕亭仔腳", label: "亭仔腳 · Taipei" },
    { src: IMG.bolognaPortici,   alt: "Bologna Portici", label: "Portici · Bologna" },
    { src: IMG.dadaochengTemple, alt: "廟宇屋頂", label: "廟 · Tempio" },
  ];

  return (
    <section className="py-24 bg-[oklch(27.5%_0.000_0)] overflow-hidden">
      <div className="container">
        <Reveal className="text-center mb-16">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Attraverso il Portale</p>
          <h2 className="font-medium text-[oklch(96.5%_0.006_85)]"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Ogni arco è una soglia
          </h2>
          <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-5 mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end justify-items-center">
          {images.map((img, i) => (
            <Reveal key={img.label} delay={i * 120} className="flex flex-col items-center w-full">
              <div className="relative group w-full" style={{ maxWidth: i === 1 ? "340px" : "300px", marginTop: i === 1 ? "0" : "2.5rem" }}>
                <ArchImage src={img.src} alt={img.alt} aspectRatio={i === 1 ? "2/3" : "3/4"}
                  borderColor="oklch(55.0% 0.075 55 / 0.5)" />
              </div>
              <p className="mt-5 text-[13px] tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{img.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED ARTICLES
   ───────────────────────────────────────────────────────────────── */
const placeholderArticles = [
  { id: 1, category: "Rituali", title: "Il Silenzio Condiviso: Perché i Giapponesi Non Abbracciano",
    excerpt: "Un'esplorazione di come culture diverse esprimono affetto, vicinanza e rispetto attraverso gesti che sembrano opposti ma nascondono la stessa radice.",
    readTime: "8 min", accentColor: "oklch(57.5% 0.045 165)", image: null },
  { id: 2, category: "Cibo", title: "Le Cinque Vite della Soia: Da Taipei a Tokyo a Seoul",
    excerpt: "Uno stesso ingrediente, cinque trasformazioni culturali. Come il tofu, il miso, il doenjang e il tempeh raccontano storie di civiltà.",
    readTime: "6 min", accentColor: "oklch(55.0% 0.075 55)", image: null },
  { id: 3, category: "Spazio", title: "Anatomia di una Casa da Tè: Kyoto vs. Taipei",
    excerpt: "Due spazi, due filosofie dell'ospitalità. Cosa ci insegna l'architettura del tè sulla differenza tra wabi-sabi e calore taiwanese.",
    readTime: "10 min", accentColor: "oklch(70.0% 0.025 220)", image: null },
];

function FeaturedArticlesSection() {
  return (
    <section className="py-24 bg-[oklch(96.5%_0.006_85)]">
      <div className="container">
        <Reveal className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[oklch(55.0%_0.075_55)] mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Articoli</p>
            <h2 className="font-medium text-[oklch(27.5%_0.000_0)]"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>Letture Recenti</h2>
            <div className="w-10 h-0.5 bg-[oklch(55.0%_0.075_55)] mt-5" />
          </div>
          <Link href="/articoli"
            className="inline-flex items-center gap-2 text-[15px] text-[oklch(55.0%_0.075_55)] hover:opacity-70 hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Tutti gli articoli <ArrowRight size={14} />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {placeholderArticles.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <Link href={`/articoli/${article.id}`}
                className="group bg-[oklch(98.5%_0.003_85)] overflow-hidden shadow-[0_2px_16px_oklch(0%_0_0/0.05)] flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_oklch(0%_0_0/0.10)]">
                {article.image ? (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <img src={article.image} alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="h-1" style={{ backgroundColor: article.accentColor }} />
                )}
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-5"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", color: article.accentColor }}>
                    {article.category}
                  </span>
                  <h3 className="text-[oklch(27.5%_0.000_0)] mb-4 group-hover:text-[oklch(55.0%_0.075_55)] transition-colors duration-300"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 }}>
                    {article.title}
                  </h3>
                  <p className="text-[17px] text-[oklch(50%_0.005_60)] leading-[1.75] flex-1"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{article.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[13px] text-[oklch(60%_0.005_60)]"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{article.readTime} di lettura</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: "oklch(55.0% 0.075 55)" }} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NEWSLETTER
   ───────────────────────────────────────────────────────────────── */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setEmail("");
    },
    onError: () => {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({ email: email.trim(), source: "home" });
  };

  return (
    <section className="py-24 bg-[oklch(89.5%_0.025_80)]">
      <div className="container">
        <Reveal className="max-w-[560px] mx-auto text-center">
          <div className="flex justify-center mb-8"><ArchDivider count={3} color="oklch(55.0% 0.075 55)" /></div>
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-[#A67C52] mb-5"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>Newsletter</p>
          <h2 className="font-medium text-[oklch(27.5%_0.000_0)] mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Una Prospettiva Diversa,<br />Ogni Mese
          </h2>
          <p className="text-[18px] text-[oklch(42%_0.005_60)] leading-[1.8] mb-10"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Ricevi un articolo esclusivo, un'idea che cambierà come vedi qualcosa, e l'invito al prossimo evento. Niente spam. Solo cultura.
          </p>
          {submitted ? (
            <div className="py-6 px-8 bg-[#F5F3EE] border border-[#E5D9C8] text-center">
              <p className="text-[18px] text-[#1C1917] mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Grazie per l'iscrizione!
              </p>
              <p className="text-[15px] text-[#78716C]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                Ti abbiamo inviato un'email di benvenuto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 text-[16px] bg-[oklch(96.5%_0.006_85)] border border-[oklch(80%_0.015_80)] text-[oklch(27.5%_0.000_0)] placeholder:text-[oklch(65%_0.005_60)] focus:outline-none focus:border-[#a2482b] transition-colors"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }} />
              <button type="submit" disabled={subscribe.isPending}
                className="px-8 py-3.5 text-[16px] font-semibold bg-[#a2482b] text-[#F5F3EE] hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                {subscribe.isPending ? "..." : "Iscriviti"}
              </button>
            </form>
          )}
          {subscribe.error && (
            <p className="mt-3 text-sm text-[#a2482b]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              {subscribe.error.message}
            </p>
          )}
          {!submitted && (
            <p className="mt-5 text-[15px] text-[oklch(55%_0.005_60)]" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              Puoi cancellarti quando vuoi. Ma scommettiamo che non lo farai.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkshopSection />
      <BrandStoryStrip />
      <ArchGalleryStrip />
      <FeaturedArticlesSection />
      <NewsletterSection />
    </main>
  );
}
