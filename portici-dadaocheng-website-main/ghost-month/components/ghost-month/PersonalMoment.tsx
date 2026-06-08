"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCountryByCode } from "@/lib/ghost-month/countries";
import { CustomSelect } from "./ui/CustomSelect";

type Phase = "origin" | "current" | "result";

function MiniRouteMap({
  originCode,
  currentCode,
}: {
  originCode: string;
  currentCode: string;
}) {
  const origin = getCountryByCode(originCode);
  const current = getCountryByCode(currentCode);

  if (!origin || !current) return null;

  const pathD = `M ${origin.x} ${origin.y} L ${current.x} ${current.y}`;
  const pathLength = Math.hypot(current.x - origin.x, current.y - origin.y) * 2;

  return (
    <motion.svg
      viewBox="0 0 100 60"
      className="mx-auto hidden h-auto w-full max-w-[400px] min-[480px]:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-hidden="true"
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--gold-incense)"
        strokeOpacity={0.6}
        strokeWidth={0.5}
        strokeDasharray="1 2"
        initial={{ strokeDashoffset: pathLength }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {(
        [
          { id: "origin", point: origin },
          { id: "current", point: current },
        ] as const
      ).map(({ id, point }) => (
        <g key={id}>
          <circle
            cx={point.x}
            cy={point.y}
            r={3}
            fill="var(--red-ritual)"
            opacity={0.3}
            style={{ filter: "drop-shadow(0 0 4px var(--red-ritual))" }}
          />
          <circle
            cx={point.x}
            cy={point.y}
            r={2}
            fill="var(--red-ritual)"
            style={{ filter: "drop-shadow(0 0 6px var(--red-glow))" }}
          />
          <text
            x={point.x}
            y={point.y - 4}
            textAnchor="middle"
            className="fill-ink-secondary font-label font-extralight"
            style={{ fontSize: "3px" }}
          >
            {point.label}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}

export function PersonalMoment() {
  const [originCountry, setOriginCountry] = useState<string | null>(null);
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("origin");

  const originLabel = originCountry
    ? getCountryByCode(originCountry)?.label
    : null;

  const handleOriginSelect = (code: string) => {
    setOriginCountry(code);
    setPhase("current");
  };

  const handleCurrentSelect = (code: string) => {
    setCurrentCountry(code);
    setPhase("result");
  };

  const handleReset = () => {
    setOriginCountry(null);
    setCurrentCountry(null);
    setPhase("origin");
  };

  return (
    <section
      id="momento-personale"
      className="flex min-h-screen flex-col items-center justify-center bg-bg-dark px-6 py-24"
    >
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === "origin" && (
            <motion.div
              key="origin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col items-center gap-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="font-display text-4xl text-ink sm:text-5xl"
              >
                Dove sei cresciuto?
              </motion.h2>
              <CustomSelect
                value={originCountry}
                onChange={handleOriginSelect}
                placeholder="Seleziona un paese..."
              />
            </motion.div>
          )}

          {phase === "current" && (
            <motion.div
              key="current"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col items-center gap-8"
            >
              <h2 className="font-display text-4xl text-ink sm:text-5xl">
                Dove sei adesso?
              </h2>
              <CustomSelect
                value={currentCountry}
                onChange={handleCurrentSelect}
                placeholder="Seleziona un paese..."
              />
              {originLabel && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-label text-[10px] font-extralight tracking-[0.2em] text-ink-secondary"
                >
                  Sei cresciuto in {originLabel}
                </motion.p>
              )}
            </motion.div>
          )}

          {phase === "result" && originCountry && currentCountry && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col items-center gap-10"
            >
              <MiniRouteMap
                originCode={originCountry}
                currentCode={currentCountry}
              />

              <motion.blockquote
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="max-w-[560px] font-body text-2xl italic leading-relaxed text-ink"
              >
                &ldquo;Il mese dei fantasmi più vivace
                <br />
                non si trova nel luogo d&apos;origine,
                <br />
                ma dopo averlo lasciato.&rdquo;
              </motion.blockquote>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-4 font-label text-[10px] font-extralight tracking-[0.2em] text-ink-secondary"
              >
                — Portici DaDaocheng, Vol. 2, Estate 2026
              </motion.p>

              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                onClick={handleReset}
                className="mt-10 font-label text-[10px] font-extralight tracking-[0.2em] text-ink-secondary transition-opacity hover:text-ink"
              >
                Ricomincia ↺
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
