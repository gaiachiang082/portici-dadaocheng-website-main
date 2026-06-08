"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lantern } from "./ui/Lantern";

type FloatingLantern = {
  id: number;
  y: number;
  startX: number;
  duration: number;
  delay: number;
  scale: number;
};

function generateFloatingLanterns(count: number): FloatingLantern[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    y: 60 + Math.random() * 20,
    startX: -30 - Math.random() * 70,
    duration: 25 + Math.random() * 15,
    delay: Math.random() * 15,
    scale: 0.7 + Math.random() * 0.5,
  }));
}

const introContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const introItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  },
};

function WaterWaves() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 overflow-hidden">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path
          className="water-wave water-wave-1"
          d="M0,60 C150,90 300,30 450,60 C600,90 750,30 900,60 C1050,90 1200,30 1200,60 L1200,120 L0,120 Z"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
        <path
          className="water-wave water-wave-2"
          d="M0,75 C200,45 400,95 600,75 C800,55 1000,95 1200,75 L1200,120 L0,120 Z"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.08}
          strokeWidth={0.8}
        />
        <path
          className="water-wave water-wave-3"
          d="M0,85 C180,105 360,65 540,85 C720,105 900,65 1080,85 C1140,95 1200,85 1200,85 L1200,120 L0,120 Z"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity={0.12}
          strokeWidth={0.6}
        />
      </svg>
    </div>
  );
}

export function LanternsSection() {
  const [floatingLanterns, setFloatingLanterns] = useState<FloatingLantern[]>([]);
  const [lanternLit, setLanternLit] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [readerMoving, setReaderMoving] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    const getCount = () =>
      window.matchMedia("(max-width: 767px)").matches ? 3 : 5;

    const generate = () => {
      setFloatingLanterns(generateFloatingLanterns(getCount()));
    };

    generate();

    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", generate);
    return () => mq.removeEventListener("change", generate);
  }, []);

  const handleLightLantern = useCallback(() => {
    if (lanternLit) return;

    setLanternLit(true);

    window.setTimeout(() => setButtonHidden(true), 400);

    window.setTimeout(() => setShowFinalText(true), 800);

    window.setTimeout(() => setReaderMoving(true), 1200);
  }, [lanternLit]);

  return (
    <section
      id="lanterne"
      className="relative min-h-screen overflow-hidden bg-water-dark"
    >
      <WaterWaves />

      {/* Pre-lit floating lanterns */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        {floatingLanterns.map((lantern) => (
          <div
            key={lantern.id}
            className="floating-lantern absolute left-0"
            style={{
              top: `${lantern.y}%`,
              ["--lantern-start-x" as string]: `${lantern.startX}vw`,
              ["--lantern-duration" as string]: `${lantern.duration}s`,
              ["--lantern-delay" as string]: `${lantern.delay}s`,
            }}
          >
            <div style={{ transform: `scale(${lantern.scale})` }}>
              <Lantern lit width={40} height={54} />
            </div>
          </div>
        ))}
      </div>

      {/* Intro text — fades out when final quote appears */}
      <motion.div
        className="relative z-20 mx-auto max-w-2xl px-6 pt-24 pb-[45vh] text-center md:pb-[40vh]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={introContainerVariants}
        animate={{
          opacity: showFinalText ? 0 : 1,
          y: showFinalText ? -24 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ pointerEvents: showFinalText ? "none" : "auto" }}
        aria-hidden={showFinalText}
      >
        <motion.p
          variants={introItemVariants}
          className="mb-6 font-label text-[10px] font-extralight uppercase tracking-[0.35em] text-red-ritual"
        >
          Keelung · 基隆 · 放水燈
        </motion.p>

        <motion.h2
          variants={introItemVariants}
          className="mb-8 font-display text-3xl leading-snug text-ink sm:text-4xl md:text-[2.5rem]"
        >
          La notte del quattordicesimo giorno
          <br />
          del settimo mese lunare,
          <br />
          le lanterne vengono accese una a una
          <br />
          e spinte in mare.
        </motion.h2>

        <motion.p
          variants={introItemVariants}
          className="mx-auto max-w-lg font-body text-lg italic leading-relaxed text-ink-secondary sm:text-xl"
        >
          Per chi sono accese? Per chi è morto in mare —
          <br className="hidden sm:block" />
          le anime affondate, quelle che non trovano
          <br className="hidden sm:block" />
          la strada per risalire.
        </motion.p>
      </motion.div>

      {/* Reader lantern + CTA */}
      <motion.div
        className="absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
        style={{ top: "75%" }}
        animate={
          readerMoving
            ? {
                x: "120vw",
                opacity: [1, 1, 1, 0],
              }
            : {
                x: 0,
                opacity: 1,
              }
        }
        transition={
          readerMoving
            ? {
                x: { duration: 30, ease: "linear" },
                opacity: {
                  duration: 30,
                  times: [0, 0.75, 0.8, 1],
                  ease: "linear",
                },
              }
            : { duration: 0.6, ease: "easeInOut" }
        }
      >
        <button
          type="button"
          onClick={handleLightLantern}
          disabled={lanternLit}
          className="mb-3 cursor-pointer disabled:cursor-default"
          aria-label="Accendi la lanterna"
        >
          <motion.div
            animate={{ opacity: lanternLit ? 1 : 0.85 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Lantern lit={lanternLit} width={56} height={74} />
          </motion.div>
        </button>

        {!buttonHidden && (
          <motion.button
            type="button"
            onClick={handleLightLantern}
            disabled={lanternLit}
            initial={{ opacity: 1 }}
            animate={{ opacity: lanternLit ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="mt-2 border border-gold-incense px-8 py-3 font-label text-[10px] font-extralight uppercase tracking-[0.25em] text-ink transition-colors hover:bg-gold-dim disabled:pointer-events-none"
          >
            Accendi la lanterna
          </motion.button>
        )}
      </motion.div>

      {/* Final text */}
      {showFinalText && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-40 mx-auto max-w-[600px] -translate-y-1/2 px-6 text-center"
        >
          <blockquote className="font-body text-xl italic leading-relaxed text-ink sm:text-2xl">
            &ldquo;I vivi restano sulla riva e guardano
            <br />
            le luci allontanarsi,
            <br />
            fino a sparire in un posto che non si vede.&rdquo;
          </blockquote>
          <p className="mt-6 font-label text-[10px] font-extralight tracking-[0.2em] text-ink-secondary">
            — Portici DaDaocheng, Vol. 2, Estate 2026
          </p>
        </motion.div>
      )}
    </section>
  );
}
