import { useEffect } from "react";

/**
 * GlobalMagneticEffects
 * ──────────────────────────────────────────────────────────────────────
 * Site-wide counterpart to `<MagneticButton>`: every element tagged
 * `data-magnetic` gets the same "pull toward cursor" feel without having
 * to wrap it in a React component.
 *
 *   data-magnetic                  → opt in with default distance=50 / strength=0.35
 *   data-magnetic-distance="60"    → override activation radius (px from edge)
 *   data-magnetic-strength="0.25"  → override pull strength (0..1)
 *
 * Implementation notes:
 *   • One global `mousemove` listener iterates the registered element set.
 *   • We cache each element's bounding rect, refreshing on scroll/resize,
 *     so the mouse move path is O(n) arithmetic only.
 *   • Transition is CSS-based (`will-change: transform` + transition) so
 *     we stay away from per-element springs while still feeling elastic.
 *   • Disabled on coarse-pointer devices and when users opt out of motion.
 *
 * Note: this does NOT conflict with the existing `<MagneticButton>` JSX
 * wrapper — they produce the same effect but via different mechanisms.
 * Use the wrapper when you need tight React control; use `data-magnetic`
 * for broad-reach adoption (CTAs inside shared components, CMS content).
 */
export function GlobalMagneticEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Entry = { el: HTMLElement; rect: DOMRect; distance: number; strength: number };
    const targets = new Map<HTMLElement, Entry>();

    const measure = (el: HTMLElement): Entry => ({
      el,
      rect: el.getBoundingClientRect(),
      distance: Number(el.dataset.magneticDistance ?? 50),
      strength: Number(el.dataset.magneticStrength ?? 0.35),
    });

    const register = (el: HTMLElement) => {
      if (targets.has(el)) return;
      el.dataset.magneticRegistered = "true";
      // Apply the transition once, so return-to-origin feels elastic.
      el.style.transition = (el.style.transition ? el.style.transition + ", " : "") +
        "transform 360ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.willChange = "transform";
      targets.set(el, measure(el));
    };

    const unregister = (el: HTMLElement) => {
      const entry = targets.get(el);
      if (!entry) return;
      targets.delete(el);
      el.style.transform = "";
    };

    const scan = (scope: ParentNode = document) => {
      scope.querySelectorAll<HTMLElement>(
        "[data-magnetic]:not([data-magnetic-registered])",
      ).forEach(register);
    };

    const remeasure = () => {
      targets.forEach((entry, el) => {
        entry.rect = el.getBoundingClientRect();
      });
    };

    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      targets.forEach((entry) => {
        const { rect, distance, strength, el } = entry;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const inField =
          x >= rect.left - distance &&
          x <= rect.right + distance &&
          y >= rect.top - distance &&
          y <= rect.bottom + distance;
        if (inField) {
          const dx = (x - cx) * strength;
          const dy = (y - cy) * strength;
          el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        } else if (el.style.transform) {
          el.style.transform = "translate3d(0, 0, 0)";
        }
      });
    };

    scan();

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);

    // Re-scan on DOM changes (route transitions, async renders).
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if ((node as HTMLElement).matches?.("[data-magnetic]")) {
            register(node as HTMLElement);
          } else {
            scan(node as HTMLElement);
          }
        });
        m.removedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const host = node as HTMLElement;
          if (host.matches?.("[data-magnetic-registered]")) {
            unregister(host);
          }
          const inner = host.querySelectorAll?.("[data-magnetic-registered]") as
            | NodeListOf<HTMLElement>
            | undefined;
          inner?.forEach(unregister);
        });
      }
      remeasure();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
      mo.disconnect();
      targets.forEach((_, el) => {
        el.style.transform = "";
        el.style.willChange = "";
        delete el.dataset.magneticRegistered;
      });
      targets.clear();
    };
  }, []);

  return null;
}

export default GlobalMagneticEffects;
