import type { Lang } from "@/contexts/LangContext";

/**
 * Fixed UI copy per locale. Use with {@link useLang}:
 * `dict[lang].nav.articles`
 */
export type I18nDict = {
  nav: {
    founders: string;
    space: string;
    services: string;
    case_studies: string;
    magazine: string;
    articles: string;
    newsletter: string;
    events: string;
    contact: string;
    open_magazine: string;
    menu_open: string;
    menu_close: string;
    home_aria: string;
  };
  home: {
    latest_reads_eyebrow: string;
    latest_reads_title: string;
    view_all_reads: string;
    newsletter_title: string;
    newsletter_subtitle: string;
    newsletter_cta: string;
    entry_magazine_kicker: string;
    entry_magazine_title: string;
    entry_magazine_link: string;
    entry_events_kicker: string;
    entry_events_title: string;
    entry_events_link: string;
    hero_ingressi: string;
    hero_letture: string;
    hero_resta: string;
    hero_alt_links: string;
  };
  footer: {
    tagline: string;
    explore: string;
    newsletter_heading: string;
    newsletter_body: string;
    newsletter_why: string;
    rights: string;
    instagram: string;
    back_to_top: string;
  };
  lang_switcher: {
    aria: string;
  };
  articoli: {
    eyebrow: string;
    title: string;
    subtitle: string;
    loading: string;
    error: string;
    retry: string;
    empty: string;
  };
  common: {
    read_more: string;
    untitled: string;
  };
};

export const dict: Record<Lang, I18nDict> = {
  it: {
    nav: {
      founders: "Fondatrici",
      space: "Spazio",
      services: "Servizi",
      case_studies: "Casi Studio",
      magazine: "Magazine",
      articles: "Articoli",
      newsletter: "Newsletter",
      events: "Sessioni",
      contact: "Contatti",
      open_magazine: "Apri il Magazine",
      menu_open: "Apri menu",
      menu_close: "Chiudi menu",
      home_aria: "Portici DaDaocheng — Home",
    },
    home: {
      latest_reads_eyebrow: "LETTURE",
      latest_reads_title: "Dalla redazione",
      view_all_reads: "Tutte le letture",
      newsletter_title: "Resta nel racconto",
      newsletter_subtitle:
        "Poche mail, solo quando c'è materiale da aggiungere al taccuino. Frequenza e contenuti sono sulla pagina dedicata.",
      newsletter_cta: "Note su cosa inviamo",
      entry_magazine_kicker: "I — Magazine",
      entry_magazine_title: "Letture, saggi e voci che attraversano confini.",
      entry_magazine_link: "Apri il Magazine",
      entry_events_kicker: "II — Sessioni",
      entry_events_title: "Prossime sessioni, stagioni, interesse.",
      entry_events_link: "Vai alle sessioni",
      hero_ingressi: "Ingressi principali",
      hero_letture: "Letture",
      hero_resta: "Note dalla redazione",
      hero_alt_links: "Altri collegamenti",
    },
    footer: {
      tagline:
        "Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.",
      explore: "Esplora",
      newsletter_heading: "Newsletter",
      newsletter_body: "Poche mail dal taccuino. Dettagli e ritmo sulla pagina dedicata.",
      newsletter_why: "Cosa c'è nella mail",
      rights: "Tutti i diritti riservati.",
      instagram: "Instagram",
      back_to_top: "Torna su",
    },
    lang_switcher: {
      aria: "Lingua",
    },
    articoli: {
      eyebrow: "LETTURE",
      title: "Articoli e note",
      subtitle: "Saggi, voci e materiali che attraversano confini.",
      loading: "Caricamento…",
      error: "Impossibile caricare gli articoli.",
      retry: "Riprova",
      empty: "I primi articoli sono in arrivo.",
    },
    common: {
      read_more: "Leggi",
      untitled: "Senza titolo",
    },
  },
  en: {
    nav: {
      founders: "Founders",
      space: "Space",
      services: "Services",
      case_studies: "Case Studies",
      magazine: "Magazine",
      articles: "Articles",
      newsletter: "Newsletter",
      events: "Sessions",
      contact: "Contact",
      open_magazine: "Open Magazine",
      menu_open: "Open menu",
      menu_close: "Close menu",
      home_aria: "Portici DaDaocheng — Home",
    },
    home: {
      latest_reads_eyebrow: "READS",
      latest_reads_title: "From the desk",
      view_all_reads: "All reads",
      newsletter_title: "Stay in the narrative",
      newsletter_subtitle:
        "Few letters, only when the notebook has something to add. Cadence and contents are on the dedicated page.",
      newsletter_cta: "Notes on what we send",
      entry_magazine_kicker: "I — Magazine",
      entry_magazine_title: "Essays, notes, and voices across borders.",
      entry_magazine_link: "Open the Magazine",
      entry_events_kicker: "II — Sessions",
      entry_events_title: "Upcoming sessions, seasons, and interest.",
      entry_events_link: "Go to sessions",
      hero_ingressi: "Main entry points",
      hero_letture: "Reads",
      hero_resta: "Notes from the editors",
      hero_alt_links: "More links",
    },
    footer: {
      tagline:
        "Where different cultures answer the same human questions in surprisingly different ways.",
      explore: "Explore",
      newsletter_heading: "Newsletter",
      newsletter_body: "Rare mail from the desk. Details and rhythm on the dedicated page.",
      newsletter_why: "What’s in the email",
      rights: "All rights reserved.",
      instagram: "Instagram",
      back_to_top: "Back to top",
    },
    lang_switcher: {
      aria: "Language",
    },
    articoli: {
      eyebrow: "READS",
      title: "Articles & notes",
      subtitle: "Essays, voices, and materials across borders.",
      loading: "Loading…",
      error: "Couldn’t load articles.",
      retry: "Try again",
      empty: "First articles are on the way.",
    },
    common: {
      read_more: "Read",
      untitled: "Untitled",
    },
  },
};

/** Shorthand: `t("it", d => d.nav.articles)` or use with current lang in a hook later. */
export function pickDict<L extends Lang>(lang: L): I18nDict {
  return dict[lang];
}
