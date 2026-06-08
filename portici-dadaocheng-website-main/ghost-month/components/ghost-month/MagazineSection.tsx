"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const contents = [
  "Soglia — L'acqua, l'asciugamano e la zuppa a metà cottura",
  "Saggio — Un mese, tre luoghi: Taiwan · Malesia · Singapore",
  "Focus — Il Rituale: Qianggu, Keelung, Donggang",
  "I Codici della Tavola — Le offerte di Zhongyuan",
  "A Tavola — I dolci di Zhongyuan: Moha, Bitao, Migaozhan",
];

export function MagazineSection() {
  return (
    <section id="rivista" className="bg-bg-dark px-6 py-[120px]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full shrink-0 lg:w-[40%]"
        >
          <div className="group relative mx-auto aspect-[3/4] max-w-sm overflow-hidden border border-red-ritual transition-[transform,box-shadow] duration-[400ms] hover:scale-[1.02] hover:shadow-[0_0_24px_var(--red-glow)]">
            <Image
              src="/images/cover.png"
              alt="Portici DaDaocheng N°2 — Il Mese dell'Ospitalità Invisibile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[60%]"
        >
          <p className="font-label text-[10px] font-extralight uppercase tracking-[0.35em] text-red-ritual">
            Portici DaDaocheng · N°2
          </p>

          <h2 className="mt-4 font-display text-4xl text-ink">
            Il Mese dell&apos;Ospitalità Invisibile
          </h2>

          <p className="mt-2 font-body text-lg text-ink-secondary">
            Tiratura limitata · 50 copie · Distribuzione gratuita
            <br />
            Bologna, Estate 2026
          </p>

          <hr className="my-6 border-0 border-t border-red-ritual/30" />

          <ul className="space-y-2">
            {contents.map((item) => (
              <li key={item} className="font-body text-base text-ink-secondary">
                <span className="text-red-ritual">· </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="/it/magazine"
            className="mt-8 inline-block bg-red-ritual px-9 py-3.5 font-label text-xs font-light uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-85"
          >
            Leggi il numero completo →
          </a>

          <a
            href="/it/newsletter"
            className="mt-4 block font-label text-[10px] font-extralight tracking-[0.2em] text-ink-secondary transition-colors hover:text-gold-incense"
          >
            Iscriviti per ricevere il Vol.3 ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
