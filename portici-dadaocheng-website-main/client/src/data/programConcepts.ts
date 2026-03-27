/** Curated program lines — editorial framing; not a fixed commerce catalog. */
export type ProgramConcept = {
  slug: string;
  title: string;
  titleZh?: string;
  blurb: string;
  /** "cultural" | "hybrid" | "exploratory" */
  kind: "cultural" | "hybrid" | "exploratory";
};

export const PROGRAM_CONCEPTS: ProgramConcept[] = [
  {
    slug: "calligraphy-ink",
    title: "Calligrafia e inchiostro",
    titleZh: "書法水墨",
    blurb:
      "Laboratori sul gesto, il respiro e la scrittura come pratica interculturale. Sessioni in piccolo gruppo quando la domanda lo rende sostenibile.",
    kind: "cultural",
  },
  {
    slug: "tea-ceremony",
    title: "Cerimonia del tè",
    titleZh: "茶道",
    blurb:
      "Il tè come dialogo tra filosofie e rituali. Proposte curate, legate al racconto del Magazine e alle stagioni.",
    kind: "cultural",
  },
  {
    slug: "food-cultural",
    title: "Cucina e convivialità",
    titleZh: "飲食文化",
    blurb:
      "Mani in pasta, racconti attorno al tavolo: ravioli, lievitati, tavolate che uniscono memoria italiana e tecniche dell’Asia orientale.",
    kind: "cultural",
  },
  {
    slug: "disegno-aperitivo",
    title: "Disegno a mano + aperitivo asiatico",
    titleZh: "手繪小食",
    blurb:
      "Serate ibride in esplorazione: schizzo dal vero o da oggetti curati, poi tavolo conviviale con piccoli piatti e bevande ispirate all’Asia. Formato e calendario dipendono dagli interessi raccolti.",
    kind: "hybrid",
  },
];
