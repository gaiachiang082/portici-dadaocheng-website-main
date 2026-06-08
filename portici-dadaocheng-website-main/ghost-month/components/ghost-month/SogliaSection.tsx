"use client";

import { motion } from "framer-motion";
import { BacinellaImage } from "./ui/BacinellaImage";

const paragraphs = [
  `Il settimo mese lunare, gli Hoklo lo chiamano guǐyuè — il mese dei fantasmi. Durante le dinastie Ming e Qing, migliaia di migranti del Fujian lasciarono la costa verso Taiwan e il Sud-Est asiatico. Con sé portavano la lingua, le credenze — e una paura specifica: morire lontano da casa, senza che nessuno li ricordasse.`,
  `Di fronte agli spiriti senza dimora, gli Hoklo non scelsero l'oblio: costruirono un sistema. Un mese intero dedicato alla convivenza con i morti.`,
  `In quel sistema, due dettagli non ci hanno mai lasciato. Il primo è la bacinella e l'asciugamano — per le anime che hanno fatto un lungo viaggio: prima ci si lava via la polvere della strada, poi ci si siede a tavola. Il secondo è la zuppa di kangkong lasciata a metà cottura. Kōngxīn (空心) — il fusto è cavo, e lo è anche questa forma di accoglienza: ti ricevo volentieri, ma tra noi non c'è niente che valga la pena trattenere. Mangia. Poi vai.`,
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  },
};

export function SogliaSection() {
  return (
    <section id="soglia" className="bg-bg-dark px-6 py-[120px]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
        <motion.div
          className="w-full max-w-[680px] flex-shrink-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="mb-6 font-label text-[10px] font-extralight uppercase tracking-[0.35em] text-red-ritual"
          >
            Soglia
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="mb-10 font-display text-3xl leading-snug text-ink sm:text-4xl"
          >
            L&apos;acqua, l&apos;asciugamano
            <br />
            e la zuppa a metà cottura
          </motion.h2>

          <div className="space-y-6">
            {paragraphs.map((text, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="font-body text-[18px] leading-[1.8] text-ink-secondary"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.blockquote
            variants={itemVariants}
            className="mt-12 text-center font-body text-xl italic leading-relaxed text-gold-incense sm:text-2xl"
          >
            &ldquo;La generosità e il confine siedono in silenzio
            <br className="hidden sm:block" />
            {" "}sulla stessa tavola.&rdquo;
          </motion.blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="w-full max-w-sm flex-shrink-0 lg:max-w-xs lg:pt-16"
        >
          <BacinellaImage />
        </motion.div>
      </div>
    </section>
  );
}
