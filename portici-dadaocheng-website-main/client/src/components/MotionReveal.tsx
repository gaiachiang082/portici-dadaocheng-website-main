import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds, used when a parent orchestrates a cascade. */
  delay?: number;
  /** Override the default 0.8s duration if a specific section needs a faster feel. */
  duration?: number;
  /** Extra classes on the motion wrapper. */
  className?: string;
  /**
   * Tag the motion element. Defaults to `div`. Use `section`, `article`, etc.
   * when semantic structure matters.
   */
  as?: "div" | "section" | "article" | "header" | "footer" | "p" | "span" | "li";
  /**
   * Forward inline styles. Kept as a thin passthrough — avoid animating style
   * properties here; compose additional motion if you need more choreography.
   */
  style?: React.CSSProperties;
  /**
   * Viewport margin in px (CSS `rootMargin` shorthand) to tune when the reveal
   * fires relative to the viewport edge. Negative values trigger later.
   */
  amount?: number | "some" | "all";
};

/**
 * MotionReveal
 *
 * Elegant scroll-in animation for editorial content: translates up 20px while
 * fading from 0 → 1 opacity over ~0.8s. Triggers once per element via
 * `whileInView`, respecting `prefers-reduced-motion`.
 *
 * Intended for text blocks, article rows, and section containers. For images
 * that need continuous scroll coupling, pair with `<ParallaxImage />`.
 */
export function MotionReveal({
  children,
  delay = 0,
  duration = 0.8,
  className,
  as = "div",
  style,
  amount = 0.2,
}: MotionRevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        delay,
        // Cubic bezier close to "ease-out-quart" — refined editorial feel.
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export default MotionReveal;
