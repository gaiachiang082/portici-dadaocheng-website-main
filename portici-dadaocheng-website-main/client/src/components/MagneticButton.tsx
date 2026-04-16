import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  /**
   * Activation radius around the button's bounding box (in px).
   * The magnet kicks in when the cursor is within this distance of the edge.
   * Defaults to 50 per spec.
   */
  distance?: number;
  /**
   * How much of the cursor offset (from the element center) is applied
   * as translation. 0.3–0.5 feels natural. Default 0.35.
   */
  strength?: number;
  /** Extra classes on the outer wrapper (keeps it inline-block by default). */
  className?: string;
  /** Accessibility / layout passthroughs for the wrapper. */
  style?: React.CSSProperties;
};

/**
 * MagneticButton
 *
 * Wrap an interactive element (e.g. a <Link> or <button>) to give it a
 * physical "pull" when the cursor approaches. Implementation notes:
 *
 *   1. A window-level `mousemove` listener measures the cursor's position
 *      relative to the wrapper's bounding rect.
 *   2. When the cursor is inside `rect` expanded by `distance` px on all
 *      sides, we translate the wrapper by `(cursor - center) * strength`.
 *   3. Otherwise we ease back to (0, 0). A framer-motion spring on the
 *      motion values gives the elastic, physical snap.
 *
 * The native interactive element stays inside the wrapper, so focus,
 * keyboard, and click behaviour are preserved.
 */
export function MagneticButton({
  children,
  distance = 50,
  strength = 0.35,
  className,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 18, mass: 0.45 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    // No magnet for touch devices — there's no hover/pointer to pull toward.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Respect users who opt out of motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const inField =
        e.clientX >= rect.left - distance &&
        e.clientX <= rect.right + distance &&
        e.clientY >= rect.top - distance &&
        e.clientY <= rect.bottom + distance;

      if (inField) {
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
      window.removeEventListener("blur", reset);
    };
  }, [distance, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform",
        x: springX,
        y: springY,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
