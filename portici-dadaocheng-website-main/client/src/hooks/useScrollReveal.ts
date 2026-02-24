import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — triggers visibility when element enters viewport.
 * Inspired by chioushan.com's scroll-based fade-in animations.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * useParallax — returns a translateY offset based on scroll position.
 * Used for Hero background parallax (0.4x speed = subtle depth).
 */
export function useParallax(speed = 0.4) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return offset;
}
