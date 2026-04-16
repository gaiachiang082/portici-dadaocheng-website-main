import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A global, fixed-position custom cursor.
 *
 * - Behaviour: a small dot tracks the pointer with a subtle spring.
 * - Hover state: expands into a soft ring when over interactive elements
 *   (links, buttons, form controls, or anything tagged `data-cursor-hover`).
 * - `mix-blend-difference` keeps it legible over any background.
 * - Disabled on coarse-pointer devices (touch) to avoid stray dots.
 */
export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 32, mass: 0.25 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip touch / coarse pointers — native touch interactions shouldn't see a dot.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]",
      );
      setHovering(!!interactive);
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled) return null;

  const size = hovering ? 36 : 8;
  const scale = pressed ? 0.75 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full bg-white mix-blend-difference"
        animate={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          opacity: visible ? (hovering ? 0.55 : 0.95) : 0,
          scale,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.3 }}
      />
    </motion.div>
  );
}

export default CustomCursor;
