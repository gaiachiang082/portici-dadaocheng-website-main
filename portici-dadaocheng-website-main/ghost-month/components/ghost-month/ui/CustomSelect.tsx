"use client";

import { useEffect, useRef, useState } from "react";
import { countries } from "@/lib/ghost-month/countries";

type CustomSelectProps = {
  value: string | null;
  onChange: (code: string) => void;
  placeholder?: string;
};

const selectClassName =
  "w-full max-w-sm border border-[color-mix(in_srgb,var(--ink-secondary)_50%,transparent)] bg-transparent px-6 py-4 font-body text-xl text-ink outline-none transition-colors hover:border-gold-incense focus:border-gold-incense";

export function CustomSelect({
  value,
  onChange,
  placeholder = "Seleziona un paese...",
}: CustomSelectProps) {
  const [useNative, setUseNative] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = countries.find((c) => c.code === value);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setUseNative(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (useNative) {
    return (
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={selectClassName}
        aria-label={placeholder}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${selectClassName} text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.label ?? placeholder}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-1 max-h-64 w-full overflow-y-auto border border-[color-mix(in_srgb,var(--ink-secondary)_50%,transparent)] bg-bg-dark"
        >
          {countries.map((country) => (
            <li key={country.code} role="option" aria-selected={value === country.code}>
              <button
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setOpen(false);
                }}
                className="w-full px-6 py-3 text-left font-body text-lg text-ink transition-colors hover:bg-gold-dim hover:text-gold-incense"
              >
                {country.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
