import { Link } from "wouter";
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useScrollReveal, useParallax } from "@/hooks/useScrollReveal";
import { ArchImage, ArchDecor, ArchDivider } from "@/components/ArchFrame";
import { client } from "@/SanityClient";

/* ── Sky lantern SVG (平溪天燈) ── */
function SkyLantern({ delay, left, duration, drift }: { delay: number; left: string; duration: number; drift: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        bottom: "-5%",
        animation: `float-up ${duration}s ease-in-out ${delay}s infinite`,
        ["--drift" as string]: `${drift}px`,
      }}
    >
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="drop-shadow-[0_0_8px_rgba(245,222,179,0.5)]">
        <ellipse cx="12" cy="8" rx="10" ry="6" fill="rgba(245,222,179,0.9)" stroke="rgba(205,133,63,0.6)" strokeWidth="0.5" />
        <path d="M12 14 L12 28 M10 18 L14 18 M10 22 L14 22" stroke="rgba(205,133,63,0.5)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

/* ── Floating light particles ── */
function LightParticle({ left, top, delay, dx, dy }: { left: string; top: string; delay: number; dx: number; dy: number }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-[var(--on-dark)] pointer-events-none"
      style={{
        left,
        top,
        animation: `particle-float 4s ease-in-out ${delay}s infinite`,
        ["--dx" as string]: `${dx}px`,
        ["--dy" as string]: `${dy}px`,
      }}
    />
  );
}

/* ── Letter-by-letter mask slide-in text ── */
function MaskSlideText({ text, delay, color, italic }: { text: string; delay: number; color?: string; italic?: boolean }) {
  return (
    <span className="block overflow-hidden">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `letter-slide-in 0.6s ease-out ${delay + i * 40}ms forwards`,
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            color: color || "var(--on-dark)",
            fontStyle: italic ? "italic" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

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
   LANDING VIDEO AREAS (DA TAIPEI / A BOLOGNA)
   本機影片置入方式：將 .mp4 檔放到 client/public/videos/ 資料夾，
   命名為 area1.mp4（上）、area2.mp4（下），重新整理即可顯示。
   ───────────────────────────────────────────────────────────────── */
const VIDEO = {
  area1: "/videos/area1.mp4", // [ANIMAZIONE AREA 1] — Da Taipei
  area2: "/videos/area2.mp4", // [ANIMAZIONE AREA 2] — A Bologna
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
            <p className="text-[12px] tracking-[0.24em] uppercase text-primary mb-1.5"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{slide.label}</p>
            <p className="text-[var(--on-dark)] max-w-[440px]"
              style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1rem, 2vw, 1.35rem)", fontWeight: 400, lineHeight: 1.35 }}>
              {slide.caption}
            </p>
          </div>
          {showCounter && (
            <p className="text-[var(--on-dark)]/70 hidden md:block"
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
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--on-dark)]/40 text-[var(--on-dark)] hover:border-primary hover:text-primary transition-all duration-300 bg-black/25`}
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
                backgroundColor: i === current ? "var(--primary)" : "rgba(245,222,179,0.5)",
              }} aria-label={`${i + 1}`} />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {showProgress && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-[var(--on-dark)]/15">
          <div className="h-full bg-primary"
            style={{ width: `${((current + 1) / total) * 100}%`, transition: "width 0.5s ease" }} />
        </div>
      )}
    </div>
  );
}

function HeroSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [stripesVisible, setStripesVisible] = useState(false);

  useEffect(() => {
    setTitleVisible(true);
    const id = window.setTimeout(() => setStripesVisible(true), 650);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="bg-white text-[#2c3e50] pt-24 md:pt-28">
      <style>
        {`
        body {
          font-family: 'Roboto Mono', monospace;
          background: #ffffff;
          color: #2c3e50;
          line-height: 1.6;
        }

        .hero-container {
          width: 100%;
          background: #ffffff;
          overflow: hidden;
        }

        .hero-header {
          background: #ffffff;
          padding: 40px 60px;
          text-align: right;
          border-bottom: 2px solid #000000;
        }

        .hero-header h1 {
          font-family: 'Cooper Black', 'CooperBlack', 'Cooper Black BT', 'Cooper Std', system-ui, sans-serif;
          font-size: 4rem;
          font-weight: 900;
          color: #000000;
          letter-spacing: -2px;
          line-height: 1;
        }

        .striped-bar {
          width: 100%;
          padding: 24px 60px;
          position: relative;
          overflow: hidden;
          min-height: 80px;
          display: flex;
          align-items: center;
        }

        .striped-bar.taipei {
          justify-content: flex-start;
        }

        .striped-bar.bologna {
          justify-content: flex-end;
        }

        .pixel-text {
          font-family: 'Courier New', monospace;
          font-size: 2.2rem;
          font-weight: 900;
          color: #2c3e50;
          letter-spacing: 8px;
          position: absolute;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .striped-bar.taipei .pixel-text {
          left: 60px;
        }

        .striped-bar.bologna .pixel-text {
          left: 100%;
          transform: translateX(calc(-100% - 60px));
        }

        .pixel-text::before,
        .pixel-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8B4513, #D2691E, #CD853F);
        }

        .pixel-text::before {
          top: -10px;
        }

        .pixel-text::after {
          bottom: -10px;
        }

        /* Da TAIPEI: 左 → 右 → 左 迴圈，11s 一輪 */
        .pixel-text.taipei-animate {
          animation: taipeiSlideAcross 11s ease-in-out infinite;
        }

        @keyframes taipeiSlideAcross {
          0% {
            left: 60px;
            transform: translateX(0);
          }
          45% {
            left: 100%;
            transform: translateX(-100%);
          }
          55% {
            left: 100%;
            transform: translateX(-100%);
          }
          100% {
            left: 60px;
            transform: translateX(0);
          }
        }

        /* A BOLOGNA: 右 → 左 → 右 迴圈，11s 一輪（只用 left + transform 以正確插值） */
        .pixel-text.bologna-animate {
          animation: bolognaSlideAcross 11s ease-in-out infinite;
        }

        @keyframes bolognaSlideAcross {
          0% {
            left: 100%;
            transform: translateX(calc(-100% - 60px));
          }
          45% {
            left: 60px;
            transform: translateX(0);
          }
          55% {
            left: 60px;
            transform: translateX(0);
          }
          100% {
            left: 100%;
            transform: translateX(calc(-100% - 60px));
          }
        }

        .animation-block {
          width: 100%;
          height: 200px;
          background: #a80000;
          border-bottom: 2px solid #000000;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .animation-block.block-1 {
          animation: pulseRed 2s infinite;
        }

        @keyframes pulseRed {
          0%, 100% {
            background: #a80000;
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            background: #cc0000;
            box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }

        .animation-block.block-2 {
          animation: pulseRed2 2s infinite;
          animation-delay: 1s;
        }

        @keyframes pulseRed2 {
          0%, 100% {
            background: #a80000;
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            background: #cc0000;
            box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }

        .content-section {
          background: #ffffff;
          padding: 60px 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .content-section h2 {
          font-family: 'Cooper Black', serif;
          font-size: 2.5rem;
          color: #000000;
          margin-bottom: 30px;
          letter-spacing: -1px;
        }

        .content-section h3 {
          font-family: 'Montserrat', system-ui, sans-serif;
          font-size: 1.3rem;
          color: #666666;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .content-section p {
          font-family: 'Roboto Mono', monospace;
          font-size: 1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 20px;
          text-align: justify;
        }

        .content-block {
          margin-bottom: 50px;
          padding: 30px;
          background: #f5f5f5;
          border-left: 4px solid #a80000;
          border-radius: 4px;
        }

        .content-block:first-child {
          border-left-color: #a80000;
        }

        .content-block:nth-child(2) {
          border-left-color: #a80000;
        }

        .video-compare-link {
          border-left: 4px solid #a80000;
          margin-left: 0;
        }

        .video-compare-link .content-block {
          border-left: none;
        }

        .content-section-tight {
          padding-top: 24px;
          padding-bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-header {
            padding: 30px 20px;
          }

          .hero-header h1 {
            font-size: 2.5rem;
          }

          .striped-bar {
            padding: 20px 20px;
            min-height: 60px;
          }

          .pixel-text {
            font-size: 1.5rem;
            letter-spacing: 4px;
          }

          .animation-block {
            height: 150px;
          }

          .content-section {
            padding: 40px 20px;
          }

          .content-section-tight {
            padding-top: 16px;
          }

          .content-section h2 {
            font-size: 1.8rem;
          }

          .content-section h3 {
            font-size: 1rem;
          }

          .content-section p {
            font-size: 0.9rem;
          }
        }

        .divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #a80000, transparent);
          margin: 40px 0;
        }
        `}
      </style>

      <div className="hero-container">
        <div
          className="hero-header"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h1>
            PORTICI
            <br />
            DADAOCHENG
          </h1>
        </div>

        {stripesVisible && (
          <div
            style={{
              opacity: stripesVisible ? 1 : 0,
              transform: stripesVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <div className="striped-bar taipei">
              <div className="pixel-text taipei-animate">Da TAIPEI</div>
            </div>

            <div className="animation-block block-1">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={VIDEO.area1}
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => { (e.currentTarget.style.display = "none"); e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg tracking-widest bg-[#a80000] hidden">[ANIMAZIONE AREA 1]</span>
            </div>

            <div className="striped-bar bologna">
              <div className="pixel-text bologna-animate">A BOLOGNA</div>
            </div>

            <div className="video-compare-link">
              <div className="animation-block block-2">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={VIDEO.area2}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => { (e.currentTarget.style.display = "none"); e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg tracking-widest bg-[#a80000] hidden">[ANIMAZIONE AREA 2]</span>
              </div>
              <div className="content-section content-section-tight">
                <div className="content-block">
                  <h2>Esperienze Culturali Comparate</h2>
                  <h3>Dove culture diverse interpretano la stessa cosa.</h3>
                  <p>
                    Esperienze culturali che rivelano come Asia e Europa rispondono alle stesse domande
                    umane in modi sorprendentemente diversi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL ARCH SECTION — geometric arch that scales on scroll
   ───────────────────────────────────────────────────────────────── */
function ScrollArchSection({ onRevealHero }: { onRevealHero?: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;

      // Map section entering viewport (bottom → middle) to 0 → 1
      const start = viewportH * 0.9;
      const end = viewportH * 0.3;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);

      if (!notified && clamped >= 0.98) {
        setNotified(true);
        onRevealHero?.();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // At the end of scroll, tunnel dramatically enlarges so the glow fills viewport
  const maxScale = 3;
  const scale = 1 + progress * (maxScale - 1);
  const translateY = progress * -80;
  const glowBase = 220;
  const glowSize = glowBase + progress * 900;

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050607] py-24 md:py-28 overflow-hidden"
      aria-hidden="true"
    >
      <div className="container flex flex-col items-center">
        <div className="mb-10 text-center">
          <p
            className="text-[12px] tracking-[0.28em] uppercase text-[oklch(72%_0.005_85)]/70"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Entrata nel Portale
          </p>
        </div>

        <div
          className="relative w-full max-w-4xl aspect-[3/2]"
          style={{
            transform: `scale(${scale}) translateY(${translateY}px)`,
            transformOrigin: "center bottom",
            transition: "transform 0.06s linear",
          }}
        >
          {/* Dark background */}
          <div className="absolute inset-0 bg-[#050607]" />

          {/* Concentric arches */}
          <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
            <rect x="0" y="0" width="1200" height="800" fill="#050607" />
            {Array.from({ length: 11 }).map((_, i) => {
              const inset = 40 + i * 32;
              const stroke = "rgba(255,255,255,0.24)";
              return (
                <path
                  key={i}
                  d={`
                    M ${inset} 520
                    A ${600 - inset} ${520 - inset} 0 0 1 ${1200 - inset} 520
                    L ${1200 - inset} 800
                    L ${inset} 800
                    Z
                  `}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={1.2}
                />
              );
            })}
          </svg>

          {/* Glow at tunnel end */}
          <div
            className="absolute left-1/2 bottom-[6%] -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              width: `${glowSize}px`,
              height: `${glowSize}px`,
              background:
                "radial-gradient(circle at 50% 15%, rgba(255,115,80,0.95), rgba(255,115,80,0.28) 45%, transparent 75%)",
              boxShadow: "0 0 60px rgba(255,115,80,0.8)",
              mixBlendMode: "screen",
            }}
          />
        </div>
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
        <p className="text-[11px] tracking-[0.28em] uppercase text-[var(--on-dark)]/60"
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

function WorkshopSection() {
  return (
    <section className="py-0 bg-background">
      {/* Header — font sizes match former hero workshop intro (2.5rem title, 1rem label) */}
      <div className="container py-20">
        <Reveal>
          <p className="font-normal tracking-[0.22em] uppercase text-primary mb-4"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700 }}>Workshop</p>
          <h2 className="font-medium text-[oklch(27.5%_0.000_0)]"
            style={{ fontFamily: "'Cooper Black', serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-1px" }}>
            Esperienze che aprono nuove prospettive
          </h2>
          <div className="w-10 h-0.5 bg-primary mt-5" />
        </Reveal>
      </div>

      {/* Alternating rows — cards with rounded corners and geometric shadow */}
      {WORKSHOP_FEATURES.map((item, i) => (
        <Reveal key={item.title} delay={i * 80}>
          <div className={`group/card relative grid md:grid-cols-2 items-stretch transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_22px_40px_rgba(44,62,80,0.3)] rounded-[16px] overflow-hidden ${item.reverse ? "md:[direction:rtl]" : ""}`}>
            {/* Pulsing decorative frame background */}
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

            {/* Image */}
            <div className="relative overflow-hidden group rounded-[16px_16px_0_0] md:rounded-[16px_0_0_16px]" style={{ minHeight: "380px" }}>
              <img src={item.src} alt={item.alt}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ direction: "ltr" }} />
              {/* Ochre tint on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10"
                style={{ direction: "ltr" }} />
              {/* Hover overlay with detailed info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                style={{ direction: "ltr" }}>
                <p className="text-[var(--on-dark)] text-sm leading-relaxed max-w-md"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {item.body}
                </p>
              </div>
              {/* Category badge — staggered delay animation */}
              <div
                className="absolute top-6 left-6 z-10"
                style={{
                  direction: "ltr",
                  animation: `fade-slide-up 0.6s ease-out ${300 + i * 150}ms forwards`,
                }}
              >
                <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--on-dark)] bg-black/45 px-3 py-1.5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{item.categoryZh}</span>
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center px-10 py-14 md:px-14 md:py-16 bg-card rounded-[0_0_16px_16px] md:rounded-[0_16px_16px_0]"
              style={{ direction: "ltr" }}>
              <span className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-6"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", color: item.accent }}>
                {item.category}
              </span>
              <h3 className="text-foreground mb-5"
                style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)", fontWeight: 500, lineHeight: 1.25 }}>
                {item.title}
              </h3>
              <p className="text-[18px] text-muted-foreground leading-[1.8] mb-9"
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
                    className="inline-flex items-center gap-2 text-[14px] font-semibold px-5 py-2.5 border border-primary/40 text-primary transition-all duration-300 hover:gap-3"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
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
            <p className="text-[12px] tracking-[0.28em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px' }}>Momenti dai Workshop</p>
          </Reveal>
        </div>
        <Carousel slides={WORKSHOP_SLIDES} height="clamp(300px, 42vh, 520px)" interval={3800}
          overlayGradient="linear-gradient(to bottom, oklch(0% 0 0 / 0.05) 0%, oklch(0% 0 0 / 0.6) 100%)" />
        <div className="container pb-12 pt-8 text-center">
          <Reveal>
            <Link href="/workshop"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:opacity-70 hover:gap-3 transition-all duration-300"
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
    <section className="py-0 bg-foreground">
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
              {i === 0 && <div className="absolute top-0 bottom-0 right-0 w-px bg-primary/50" />}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="inline-block text-[11px] tracking-[0.24em] uppercase text-primary bg-black/40 px-3 py-1 mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.tag}</span>
                <h3 className="text-[var(--on-dark)] mb-1"
                  style={{ fontFamily: 'var(--font-display)', fontSize: "clamp(1.5rem, 2.8vw, 2rem)", fontWeight: 500 }}>
                  {city.name}
                </h3>
                <p className="text-[13px] tracking-[0.14em] text-primary mb-5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{city.subtitle}</p>
                <p className="text-[16px] text-[var(--on-dark)]/90 leading-[1.75] max-w-[400px]"
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
    <section className="py-28 relative overflow-hidden bg-muted">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 120% 80% at 80% 50%, rgba(205,133,63,0.3) 0%, transparent 70%)" }} />
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            {/* Filosofia come citazione incorniciata da un arco */}
            <div
              className="relative mx-auto max-w-xl px-8 py-10 bg-card"
              style={{
                borderRadius: "52px 52px 28px 28px",
                border: "2px solid rgba(139,69,19,0.35)",
                boxShadow: "0 20px 40px rgba(44,62,80,0.25)",
              }}
            >
              {/* Arco decorativo esterno */}
              <div
                className="absolute inset-x-6 -top-4 h-[60%] pointer-events-none"
                style={{
                  borderRadius: "60px 60px 30px 30px",
                  border: "2px solid rgba(139,69,19,0.35)",
                  borderBottom: "none",
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(205,133,63,0.16), transparent 70%)",
                }}
              />

              <p
                className="text-[14px] font-normal tracking-[0.22em] uppercase text-primary mb-4 relative z-10"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                La Nostra Filosofia
              </p>

              <p
                className="text-[18px] leading-[1.6] mb-5 italic relative z-10"
                style={{ fontFamily: "var(--font-body)", color: "#2C3E50" }}
              >
                “Trovare le differenze nell&apos;unità. Il nostro metodo parte
                sempre dalla stessa domanda: come rispondono culture diverse
                allo stesso bisogno umano?”
              </p>
              <p
                className="text-[18px] leading-[1.6] mb-6 relative z-10"
                style={{ fontFamily: "var(--font-body)", color: "#2C3E50" }}
              >
                Non per giudicare quale risposta sia migliore, ma per scoprire
                che la diversità stessa è la risposta più ricca che l&apos;umanità
                abbia mai prodotto.
              </p>
              <p
                className="text-right text-small text-primary relative z-10"
                style={{ fontFamily: "var(--font-small)" }}
              >
                同中求異
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex items-center justify-center">
              <div className="relative group" style={{ width: "280px" }}>
                <ArchImage src={IMG.teaSettle} alt="Cerimonia del tè — armonia" aspectRatio="3/4"
                  borderColor="rgba(139,69,19,0.5)" />
                <div className="absolute -bottom-4 -right-4 -z-10">
                  <ArchDecor size="lg" color="#8B4513" opacity={0.15} />
                </div>
                <p className="mt-4 text-center text-[13px] tracking-[0.18em] uppercase text-muted-foreground"
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
    { src: IMG.dadaochengBaroque, alt: "廟宇建築", label: "廟 · Tempio" },
  ];

  return (
    <section className="py-24 bg-foreground overflow-hidden">
      <div className="container">
        <Reveal className="text-center mb-16">
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-primary mb-4"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Attraverso il Portale</p>
          <h2 className="font-medium text-[var(--on-dark)]"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Ogni arco è una soglia
          </h2>
          <div className="w-10 h-0.5 bg-primary mt-5 mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end justify-items-center">
          {images.map((img, i) => (
            <Reveal key={img.label} delay={i * 120} className="flex flex-col items-center w-full">
              <div className="relative group w-full" style={{ maxWidth: i === 1 ? "340px" : "300px", marginTop: i === 1 ? "0" : "2.5rem" }}>
                <ArchImage src={img.src} alt={img.alt} aspectRatio={i === 1 ? "2/3" : "3/4"}
                  borderColor="rgba(139,69,19,0.5)" />
              </div>
              <p className="mt-5 text-[13px] tracking-[0.22em] uppercase text-primary"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{img.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED ARTICLES (from Sanity / Articoli page)
   ───────────────────────────────────────────────────────────────── */
interface ArticlePreview {
  _id: string;
  category?: string;
  title?: string;
  excerpt?: string;
  readTime?: string;
  color?: string;
}

function FeaturedArticlesSection() {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await client.fetch<ArticlePreview[]>(
          `*[_type == "article"] | order(_createdAt desc)[0...1]{ _id, category, "title": title.it, excerpt, readTime, color }`
        );
        setArticles(data ?? []);
      } catch (err) {
        console.error("Featured articles fetch error:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const accentColor = (color?: string) => color ?? "var(--secondary)";

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <Reveal className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div>
            <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-primary mb-4"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Articoli</p>
            <h2 className="font-medium text-foreground"
              style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>Letture Recenti</h2>
            <div className="w-10 h-0.5 bg-primary mt-5" />
          </div>
          <Link href="/articoli"
            className="inline-flex items-center gap-2 text-[15px] text-primary hover:opacity-70 hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Tutti gli articoli <ArrowRight size={14} />
          </Link>
        </Reveal>

        {loading ? (
          <div className="max-w-2xl">
            <div className="bg-card overflow-hidden rounded-2xl border border-border shadow-sm animate-pulse">
              <div className="h-1 bg-border" />
              <div className="p-8 flex flex-col gap-3">
                <div className="h-3 w-16 bg-border rounded" />
                <div className="h-5 w-full bg-border rounded" />
                <div className="h-4 w-full bg-border rounded" />
                <div className="h-4 w-3/4 bg-border rounded mt-2" />
                <div className="h-3 w-20 bg-border rounded mt-5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-2xl">
            {articles.map((article, i) => (
              <Reveal key={article._id} delay={i * 100}>
                <Link href={`/articoli/${article._id}`}
                  className="group bg-card overflow-hidden rounded-2xl border border-border shadow-sm flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:shadow-md">
                  <div className="h-1" style={{ backgroundColor: accentColor(article.color) }} />
                  <div className="p-8 flex flex-col flex-1">
                    <span className="text-[13px] font-semibold tracking-[0.18em] uppercase mb-5"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", color: accentColor(article.color) }}>
                      {article.category ?? "Articolo"}
                    </span>
                    <h3 className="text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 }}>
                      {article.title ?? ""}
                    </h3>
                    <p className="text-[17px] text-muted-foreground leading-[1.75] flex-1"
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{article.excerpt ?? ""}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[13px] text-muted-foreground"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                        {article.readTime ? `${article.readTime} di lettura` : "—"}
                      </span>
                      <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
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
    <section className="py-24 bg-muted">
      <div className="container">
        <Reveal className="max-w-[560px] mx-auto text-center">
          <div className="flex justify-center mb-8"><ArchDivider count={3} color="#8B4513" /></div>
          <p className="text-[15px] font-normal tracking-[0.22em] uppercase text-secondary mb-5"
            style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>Newsletter</p>
          <h2 className="font-medium text-foreground mb-5"
            style={{ fontFamily: "'Spectral', Georgia, serif", fontSize: "2rem", fontWeight: 500 }}>
            Una Prospettiva Diversa,<br />Ogni Mese
          </h2>
          <p className="text-[18px] text-muted-foreground leading-[1.8] mb-10"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Ricevi un articolo esclusivo, un'idea che cambierà come vedi qualcosa, e l'invito al prossimo evento. Niente spam. Solo cultura.
          </p>
          {submitted ? (
            <div className="py-6 px-8 bg-card border border-border rounded-xl text-center shadow-sm">
              <p className="text-[18px] text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                Grazie per l'iscrizione!
              </p>
              <p className="text-[15px] text-muted-foreground" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                Ti abbiamo inviato un'email di benvenuto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 text-[16px] bg-background border border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:outline-none focus:border-primary transition-colors"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }} />
              <button type="submit" disabled={subscribe.isPending}
                className="px-8 py-3.5 text-[16px] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-85 transition-opacity whitespace-nowrap disabled:opacity-50"
                style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
                {subscribe.isPending ? "..." : "Iscriviti"}
              </button>
            </form>
          )}
          {subscribe.error && (
            <p className="mt-3 text-sm text-primary" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
              {subscribe.error.message}
            </p>
          )}
          {!submitted && (
            <p className="mt-5 text-[15px] text-muted-foreground" style={{ fontFamily: "'Noto Sans', system-ui, sans-serif" }}>
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
  const [heroVisible, setHeroVisible] = useState(false);

  return (
    <main>
      <ScrollArchSection onRevealHero={() => setHeroVisible(true)} />
      {heroVisible && <HeroSection />}
      <BrandStoryStrip />
      <ArchGalleryStrip />
      <FeaturedArticlesSection />
      <NewsletterSection />
    </main>
  );
}
