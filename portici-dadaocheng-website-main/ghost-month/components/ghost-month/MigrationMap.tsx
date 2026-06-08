"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MAP_IMAGE_BOUNDS,
  migrationPoints,
  migrationRoutes,
  routePath,
  type MigrationPoint,
} from "@/lib/ghost-month/map-data";
import { ghostMonthAsset } from "@/lib/paths";

function MapPoint({
  point,
  isActive,
  onSelect,
  onHover,
}: {
  point: MigrationPoint;
  isActive: boolean;
  onSelect: (id: string) => void;
  onHover?: (id: string) => void;
}) {
  return (
    <g
      className="cursor-pointer"
      data-map-point
      onClick={(e) => {
        e.stopPropagation();
        onSelect(point.id);
      }}
      onMouseEnter={() => onHover?.(point.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(point.id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={point.labelIt}
      aria-pressed={isActive}
    >
      <circle
        cx={point.x}
        cy={point.y}
        r={isActive ? 2.4 : 1.2}
        fill="var(--red-ritual)"
        className={isActive ? "" : "map-point-pulse"}
        style={{
          filter: isActive
            ? "drop-shadow(0 0 6px var(--gold-incense))"
            : undefined,
        }}
      />
      <text
        x={point.x}
        y={point.y - 3}
        textAnchor="middle"
        className="pointer-events-none fill-ink font-label font-extralight"
        style={{ fontSize: "2.5px" }}
      >
        {point.label.split(" ")[0]}
      </text>
    </g>
  );
}

function PointPanel({
  point,
  onClose,
}: {
  point: MigrationPoint;
  onClose: () => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute right-0 top-0 z-20 flex h-full w-full max-w-md flex-col border-l border-ritual bg-bg-dark/95 p-8 backdrop-blur-sm md:relative md:h-auto md:min-h-[420px]"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 font-label text-lg font-extralight text-ink-secondary transition-colors hover:text-ink"
        aria-label="Chiudi pannello"
      >
        ×
      </button>

      <p className="font-chinese text-lg text-ink">{point.label}</p>
      <p className="mt-1 font-label text-xs font-extralight uppercase tracking-[0.2em] text-ink-secondary">
        {point.labelIt}
      </p>

      <p className="mt-6 font-body text-base leading-relaxed text-ink-secondary">
        {point.description}
      </p>

      {point.quote && (
        <blockquote className="mt-6 border-l border-gold-incense/40 pl-4 font-body text-base italic leading-relaxed text-ink">
          &ldquo;{point.quote}&rdquo;
        </blockquote>
      )}

      {point.ritual && (
        <p className="mt-6 font-chinese text-sm text-red-ritual">{point.ritual}</p>
      )}
    </motion.aside>
  );
}

export function MigrationMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activePoint = migrationPoints.find((p) => p.id === activeId) ?? null;

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleClose = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!activeId) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("[data-map-panel]") || target.closest("[data-map-point]")) {
        return;
      }
      setActiveId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeId]);

  return (
    <section
      id="migrazione"
      ref={sectionRef}
      className="relative min-h-screen bg-bg-medium px-6 py-[120px]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <p className="mb-4 font-label text-[10px] font-extralight uppercase tracking-[0.35em] text-red-ritual">
            Saggio · La migrazione Hoklo
            <br />
            da Taiwan a Malesia a Singapore
          </p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl">
            Un mese, tre luoghi
          </h2>
        </header>

        <div className="relative flex flex-col gap-8 lg:flex-row">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 100 80"
              className="mx-auto h-auto w-full max-w-4xl"
              aria-label="Mappa stilizzata della migrazione Hoklo"
            >
              {/* Base map illustration */}
              <image
                href={ghostMonthAsset("/images/migration-map.jpg")}
                x={MAP_IMAGE_BOUNDS.x}
                y={MAP_IMAGE_BOUNDS.y}
                width={MAP_IMAGE_BOUNDS.width}
                height={MAP_IMAGE_BOUNDS.height}
                preserveAspectRatio="xMidYMid meet"
                opacity={0.28}
                className="hidden md:block"
              />

              {/* Migration routes — desktop only */}
              <g className="hidden md:block">
                {migrationRoutes.map((route, i) => (
                  <motion.path
                    key={`${route.from}-${route.to}`}
                    d={routePath(route.from, route.to)}
                    fill="none"
                    stroke="var(--gold-incense)"
                    strokeOpacity={0.4}
                    strokeWidth={0.4}
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 2,
                      delay: 0.3 + i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </g>

              {/* Points */}
              <g>
                {migrationPoints.map((point) => (
                  <MapPoint
                    key={point.id}
                    point={point}
                    isActive={activeId === point.id}
                    onSelect={handleSelect}
                    onHover={(id) => {
                      if (window.matchMedia("(min-width: 768px)").matches) {
                        setActiveId(id);
                      }
                    }}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* Desktop side panel */}
          <div
            className="relative hidden min-h-[420px] w-full max-w-md lg:block"
            data-map-panel
          >
            <AnimatePresence mode="wait">
              {activePoint ? (
                <PointPanel key={activePoint.id} point={activePoint} onClose={handleClose} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[420px] items-center justify-center border border-ritual p-8"
                >
                  <p className="text-center font-body text-base italic text-ink-secondary">
                    Seleziona un luogo sulla mappa
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile overlay panel */}
        <AnimatePresence>
          {activePoint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-end bg-bg-dark/60 backdrop-blur-sm lg:hidden"
              onClick={handleClose}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-h-[70vh] w-full overflow-y-auto border-t border-ritual bg-bg-dark"
                onClick={(e) => e.stopPropagation()}
                data-map-panel
              >
                <PointPanel point={activePoint} onClose={handleClose} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile scrollable list */}
        <ul className="mt-8 space-y-3 md:hidden">
          {migrationPoints.map((point) => (
            <li key={point.id}>
              <button
                type="button"
                onClick={() => handleSelect(point.id)}
                className={`w-full border border-ritual px-4 py-3 text-left transition-colors ${
                  activeId === point.id
                    ? "border-red-ritual bg-gold-dim"
                    : "hover:border-ink-secondary/50"
                }`}
              >
                <span className="font-chinese text-sm text-ink">{point.label}</span>
                <span className="mt-1 block font-label text-[10px] font-extralight uppercase tracking-[0.15em] text-ink-secondary">
                  {point.labelIt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
