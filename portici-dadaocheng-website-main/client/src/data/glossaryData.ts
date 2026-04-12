/**
 * Static glossary entries for /glossario — SEO long-tail & internal links to theme hubs.
 * Inline body uses segments so React can render localized wouter `<Link>`s (no HTML injection).
 */

export type GlossaryTextSegment = { type: "text"; text: string };

export type GlossaryLinkSegment = {
  type: "link";
  /** Site path after locale, e.g. `/cultura-taiwanese` */
  to: string;
  label: string;
};

export type GlossarySegment = GlossaryTextSegment | GlossaryLinkSegment;

export type GlossaryEntry = {
  /** URL slug under /glossario/:term */
  id: string;
  /** Display headword (keep 原名 + transliteration as needed) */
  term: string;
  shortDefinition: string;
  /** Paragraphs; each paragraph is a sequence of inline segments (text + optional internal links) */
  body: GlossarySegment[][];
  /** Primary hub path for editorial / SEO clustering (same shape as App routes) */
  relatedHub: string;
  /** Short label for UI (indice + scheda) */
  relatedHubTitle: string;
};

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: "zhengzong",
    term: "Zhengzong 正宗",
    shortDefinition:
      "Lessico del gusto che, in Taiwan, spesso misura distanza da un centro immaginato — non una semplice etichetta di qualità.",
    relatedHub: "/cultura-taiwanese",
    relatedHubTitle: "Cultura taiwanese",
    body: [
      [
        {
          type: "text",
          text: "Il termine zhengzong (正宗), in italiano spesso accostato a «canonico» o «di origine», in contesti taiwanesi non chiude un dibattito sul gusto: lo apre verso un ",
        },
        { type: "link", to: "/cultura-taiwanese", label: "orizzonte di identità" },
        {
          type: "text",
          text: ". Chiedere il piatto «giusto» può voler dire confrontarsi con un centro — cucina metropolitana, brand noto, scena mediatica — e sentirsi giudicati da una periferia che non ha sempre voce ufficiale. Non è solo estetica del cibo: è tensione politica tradotta in menu, recensioni e battute da banco.",
        },
      ],
      [
        {
          type: "text",
          text: "La parola circola dove la tavola fa da tribunale di appartenenza: chi può dire come si prepara «davvero», chi resta fuori racconto. Nel traffico dei menu e delle chat può sembrare innocua; sul campo, segnala spesso chi rivendica il diritto di fissare il gusto «ufficiale». Osservare zhengzong significa notare confini mobili tra continuità vissuta e tradizione inventata — senza fermarsi a un sinonimo comodo.",
        },
      ],
    ],
  },
  {
    id: "nian-gao",
    term: "Nian gao 年糕",
    shortDefinition:
      "Dolce di riso glutinoso dal morbido che «ti attacca ai denti»: segno di continuità nel tempo lunare, mai chiuso in una sola ricetta.",
    relatedHub: "/antropologia-del-cibo",
    relatedHubTitle: "Antropologia del cibo",
    body: [
      [
        {
          type: "text",
          text: "Il nian gao (年糕) si riconosce spesso per la pasta dolce e viscosa che oppone resistenza al morso: quella consistenza è parte del gioco — l’anno che «sale», la continuità che non si taglia netta. Il capodanno lunare resta la cornice, ma il dolce non è un manuale unico: forma, ripieno, cereale e cottura cambiano con le famiglie, le dispense e le onde migratorie.",
        },
      ],
      [
        {
          type: "text",
          text: "Attraverso Fujian, Taiwan, il sud-est asiatico e le cucine della diaspora, il nian gao si piega senza smettere di portare il tempo festivo come memoria condivisa, anche quando il calendario civile segna altrove. Per seguire il cibo come traccia di spostamenti e potere simbolico, continua nella ",
        },
        { type: "link", to: "/antropologia-del-cibo", label: "antropologia del cibo" },
        { type: "text", text: " — dove trattiamo ricette come documenti, non come repliche fisse." },
      ],
    ],
  },
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  const key = decodeURIComponent(slug).trim().toLowerCase();
  return GLOSSARY_ENTRIES.find((e) => e.id === key);
}

export function getAllGlossaryEntriesSorted(): GlossaryEntry[] {
  return [...GLOSSARY_ENTRIES].sort((a, b) => a.term.localeCompare(b.term, "it", { sensitivity: "base" }));
}
