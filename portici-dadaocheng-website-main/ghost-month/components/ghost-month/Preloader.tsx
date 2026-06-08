"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PreloaderSmoke } from "./ui/PreloaderSmoke";

type PreloaderProps = {
  onComplete: () => void;
};

function PreloaderBrazier() {
  return (
    <svg
      viewBox="0 0 80 80"
      height={80}
      width={80}
      aria-hidden="true"
      className="relative z-10"
    >
      <PreloaderSmoke />

      {/* Tripod legs */}
      <path
        d="M 28 58 L 22 72 M 40 58 L 40 72 M 52 58 L 58 72"
        fill="none"
        stroke="var(--ink)"
        strokeOpacity={0.6}
        strokeWidth={1}
        strokeLinecap="round"
      />
      <ellipse
        cx="40"
        cy="56"
        rx="18"
        ry="4"
        fill="none"
        stroke="var(--ink)"
        strokeOpacity={0.6}
        strokeWidth={1}
      />

      {/* Incense sticks */}
      <line
        x1="34"
        y1="56"
        x2="33"
        y2="38"
        stroke="var(--ink-secondary)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="56"
        x2="40"
        y2="34"
        stroke="var(--ink-secondary)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <line
        x1="46"
        y1="56"
        x2="47"
        y2="40"
        stroke="var(--ink-secondary)"
        strokeWidth={1}
        strokeLinecap="round"
      />

      <circle cx="33" cy="37" r="1.5" fill="var(--gold-incense)" opacity={0.8} />
      <circle cx="40" cy="33" r="1.8" fill="var(--gold-incense)" opacity={0.9} />
      <circle cx="47" cy="39" r="1.5" fill="var(--gold-incense)" opacity={0.8} />
    </svg>
  );
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setExiting(true);
    };

    const timeout = window.setTimeout(finish, 2200);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;

    document.body.style.overflow = "";
  }, [exiting]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (exiting) onComplete();
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-dark"
      aria-live="polite"
      aria-busy={!exiting}
    >
      <PreloaderBrazier />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="font-label text-[10px] font-extralight uppercase tracking-[0.4em] text-ink-secondary">
          Portici DaDaocheng
        </p>
        <p className="mt-1.5 font-chinese text-xs text-ink-secondary/60">
          大稻埕亭仔腳
        </p>
      </motion.div>

      <div className="relative mt-10 h-px w-[120px] bg-[color-mix(in_srgb,var(--ink)_15%,transparent)]">
        <div className="preloader-progress absolute left-0 top-0 h-full bg-gold-incense" />
      </div>
    </motion.div>
  );
}
