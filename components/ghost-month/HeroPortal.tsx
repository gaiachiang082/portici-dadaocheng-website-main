"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PortalArc } from "./ui/PortalArc";

export function HeroPortal() {
  const [isLit, setIsLit] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsLit(true);
    setIsExiting(true);

    window.setTimeout(() => {
      document.getElementById("soglia")?.scrollIntoView({ behavior: "smooth" });
      setIsExiting(false);
    }, 900);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center bg-bg-dark px-6 py-16"
    >
      <motion.div
        className="flex w-full max-w-lg flex-col items-center text-center"
        animate={isExiting ? { opacity: 0.85, scale: 0.98 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        <PortalArc isLit={isLit} />

        <header className="mt-10 space-y-6">
          <p className="font-label text-[10px] font-extralight uppercase tracking-[0.35em] text-ink-secondary">
            Portici DaDaocheng&nbsp;&nbsp;N°2
            <br />
            Estate 2026 · Bologna
          </p>

          <h1 className="font-display text-4xl font-normal leading-tight text-ink sm:text-5xl md:text-6xl">
            Il Mese dell&apos;Ospitalità Invisibile
          </h1>

          <p className="mx-auto max-w-md font-label text-[10px] font-extralight uppercase leading-relaxed tracking-[0.25em] text-ink-secondary">
            Un viaggio tra soglie, offerte e rituali
            <br />
            del settimo mese lunare
          </p>
        </header>

        <div className="mt-14 space-y-3">
          <p className="cta-pulse font-body text-base italic text-ink-secondary">
            — Stanotte le porte sono aperte. —
          </p>
          <button
            type="button"
            onClick={handleEnter}
            disabled={isExiting}
            className="entra-link font-display text-2xl text-ink transition-colors hover:text-gold-incense disabled:opacity-50 sm:text-3xl"
          >
            Entra.
          </button>
        </div>
      </motion.div>
    </section>
  );
}
