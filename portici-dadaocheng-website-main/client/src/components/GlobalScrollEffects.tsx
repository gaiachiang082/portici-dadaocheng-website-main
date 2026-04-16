import { useEffect } from "react";

/**
 * GlobalScrollEffects
 * ──────────────────────────────────────────────────────────────────────
 * Site-wide, attribute-driven scroll animations. Drop-in counterpart to
 * `<MotionReveal />` and `<ParallaxImage />`, but without per-element
 * framer-motion instances. This is the engine that powers every page.
 *
 *   data-reveal           → element fades + translates 20px on viewport enter.
 *                           Tune with:
 *                             data-reveal-delay="120"   (ms, default 0)
 *                             data-reveal-duration="800"(ms, default 800)
 *                             data-reveal-y="20"        (px, default 20)
 *
 *   data-parallax         → element's image child (or itself if it is an img)
 *                           is translated vertically with scroll progress.
 *                             data-parallax="60"        (px offset, default 60)
 *
 * Why one global component?
 *   • Single IntersectionObserver + single rAF loop = flat perf cost even
 *     with hundreds of elements across the site.
 *   • CSS transition does the heavy lifting for reveals (GPU composited).
 *   • Parallax uses `transform: translate3d(...)` written directly — no
 *     layout thrash, no React renders.
 *
 * Accessibility:
 *   • Honors `prefers-reduced-motion`: reveals become instant, parallax off.
 *   • Touch devices still get reveals (they're not interaction-dependent),
 *     but parallax is cheap enough that it stays on.
 */
export function GlobalScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("scroll-fx-ready");

    // ── Reveal: IntersectionObserver ─────────────────────────────────
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          const duration = Number(el.dataset.revealDuration ?? 800);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.style.setProperty("--reveal-duration", `${duration}ms`);
          el.classList.add("is-visible");
          revealObserver.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const registerReveals = (scope: ParentNode = document) => {
      const nodes = scope.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-visible):not([data-reveal-registered])",
      );
      nodes.forEach((el) => {
        const y = Number(el.dataset.revealY ?? 20);
        el.style.setProperty("--reveal-y", `${y}px`);
        el.dataset.revealRegistered = "true";
        if (reduced) {
          el.classList.add("is-visible");
          return;
        }
        revealObserver.observe(el);
      });
    };

    // ── Parallax: rAF loop ────────────────────────────────────────────
    const parallaxTargets = new Set<HTMLElement>();

    const registerParallax = (scope: ParentNode = document) => {
      if (reduced) return;
      const nodes = scope.querySelectorAll<HTMLElement>(
        "[data-parallax]:not([data-parallax-registered])",
      );
      nodes.forEach((el) => {
        el.dataset.parallaxRegistered = "true";
        parallaxTargets.add(el);
        // Best-effort: if the tagged element *has* an <img> child and isn't
        // itself the img, target that child so we only move the image pixels,
        // not the whole card. We cache it via data attribute for perf.
        if (el.tagName !== "IMG") {
          const img = el.querySelector<HTMLElement>("img, [data-parallax-layer]");
          if (img) el.dataset.parallaxChild = "yes";
        }
      });
    };

    let rafId = 0;
    const tick = () => {
      rafId = 0;
      const vh = window.innerHeight;
      for (const el of parallaxTargets) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const offset = Number(el.dataset.parallax || 60);
        // Progress: 0 when element's top is at viewport bottom,
        //           1 when element's bottom is at viewport top.
        const total = vh + rect.height;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / total));
        const y = (progress - 0.5) * -2 * offset; // maps to [+offset, -offset]
        const target =
          el.tagName === "IMG"
            ? el
            : (el.querySelector<HTMLElement>("img, [data-parallax-layer]") ?? el);
        target.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        target.style.willChange = "transform";
      }
    };
    const scheduleTick = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    };

    // ── Wire up ───────────────────────────────────────────────────────
    registerReveals();
    registerParallax();
    scheduleTick();

    window.addEventListener("scroll", scheduleTick, { passive: true });
    window.addEventListener("resize", scheduleTick);

    // Re-scan when the DOM changes (route transitions, async content).
    const mo = new MutationObserver((muts) => {
      let touched = false;
      for (const m of muts) {
        if (m.addedNodes.length) {
          touched = true;
          break;
        }
      }
      if (!touched) return;
      registerReveals();
      registerParallax();
      scheduleTick();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", scheduleTick);
      window.removeEventListener("resize", scheduleTick);
      if (rafId) cancelAnimationFrame(rafId);
      root.classList.remove("scroll-fx-ready");
    };
  }, []);

  return null;
}

export default GlobalScrollEffects;
