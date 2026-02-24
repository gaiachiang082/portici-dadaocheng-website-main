import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselSlide {
  src: string;
  label: string;
  caption: string;
}

interface PhotoCarouselProps {
  slides: CarouselSlide[];
  height?: string;
  interval?: number;
  showDots?: boolean;
  showProgress?: boolean;
  showCounter?: boolean;
  overlayGradient?: string;
}

export default function PhotoCarousel({
  slides,
  height = "clamp(380px, 52vh, 620px)",
  interval = 4500,
  showDots = true,
  showProgress = true,
  showCounter = true,
  overlayGradient = "linear-gradient(to bottom, oklch(0% 0 0 / 0.1) 0%, oklch(0% 0 0 / 0.55) 100%)",
}: PhotoCarouselProps) {
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

      {/* Progress bar */}
      {showProgress && (
        <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-[oklch(100%_0_0/0.15)]">
          <div className="h-full bg-[oklch(55.0%_0.075_55)]"
            style={{ width: `${((current + 1) / total) * 100}%`, transition: "width 0.5s ease" }} />
        </div>
      )}

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
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[oklch(0%_0_0/0.35)] hover:bg-[oklch(0%_0_0/0.55)] transition-colors"
        style={{ backdropFilter: "blur(4px)" }}>
        <ChevronLeft size={18} className="text-[oklch(96.5%_0.006_85)]" />
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-[oklch(0%_0_0/0.35)] hover:bg-[oklch(0%_0_0/0.55)] transition-colors"
        style={{ backdropFilter: "blur(4px)" }}>
        <ChevronRight size={18} className="text-[oklch(96.5%_0.006_85)]" />
      </button>

      {/* Dots */}
      {showDots && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? "oklch(55.0% 0.075 55)" : "oklch(100% 0 0 / 0.4)",
              }} />
          ))}
        </div>
      )}
    </div>
  );
}
