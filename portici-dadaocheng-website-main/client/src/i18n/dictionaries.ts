import type { Lang } from "@/contexts/LangContext";

/**
 * Fixed UI copy per locale. Use with {@link useLang}:
 * `dict[lang].nav.articles`
 */
export type I18nDict = {
  nav: {
    founders: string;
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
  };
};

export const dict: Record<Lang, I18nDict> = {
  it: {
    nav: {
      founders: "Fondatrici",
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
      newsletter_title: "Restate nel racconto",
      newsletter_subtitle:
        "Una mail al mese, senza spam. Per cosa riceverete e come ci iscriviamo noi, c'è la pagina dedicata.",
      newsletter_cta: "Leggi la promessa",
      entry_magazine_kicker: "I — Magazine",
      entry_magazine_title: "Letture, saggi e voci che attraversano confini.",
      entry_magazine_link: "Entra nel Magazine",
      entry_events_kicker: "II — Sessioni",
      entry_events_title: "Prossime sessioni, stagioni, interesse.",
      entry_events_link: "Vai alle sessioni",
      hero_ingressi: "Ingressi principali",
      hero_letture: "Letture",
      hero_resta: "Resta nel racconto",
      hero_alt_links: "Altri collegamenti",
    },
    footer: {
      tagline:
        "Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi.",
      explore: "Esplora",
      newsletter_heading: "Newsletter",
      newsletter_body: "Una mail al mese. Per il resto, la pagina dedicata.",
      newsletter_why: "Perché iscriversi",
      rights: "Tutti i diritti riservati.",
      instagram: "Instagram",
      back_to_top: "Torna su",
    },
    lang_switcher: {
      aria: "Lingua",
    },
    articoli: {
      eyebrow: "LETTURE",
      title: "Articoli e ricette",
      subtitle: "Saggi, ricette e voci che attraversano confini.",
      loading: "Caricamento…",
      error: "Impossibile caricare gli articoli.",
      retry: "Riprova",
      empty: "I primi articoli sono in arrivo.",
    },
    common: {
      read_more: "Leggi",
    },
  },
  zh: {
    nav: {
      founders: "關於創辦人",
      services: "服務項目",
      case_studies: "案例故事",
      magazine: "線上雜誌",
      articles: "市場情報",
      newsletter: "電子報",
      events: "近期活動",
      contact: "聯絡我們",
      open_magazine: "開啟雜誌",
      menu_open: "開啟選單",
      menu_close: "關閉選單",
      home_aria: "Portici DaDaocheng — 首頁",
    },
    home: {
      latest_reads_eyebrow: "閱讀",
      latest_reads_title: "編輯室",
      view_all_reads: "全部文章",
      newsletter_title: "訂閱電子報",
      newsletter_subtitle:
        "每月一封，不濫發。我們寄什麼、怎麼訂閱，專頁裡寫得很清楚。",
      newsletter_cta: "了解我們的承諾",
      entry_magazine_kicker: "I — 雜誌",
      entry_magazine_title: "跨越邊界的讀物、短文與聲音。",
      entry_magazine_link: "進入雜誌",
      entry_events_kicker: "II — 活動",
      entry_events_title: "即將登場的場次、季節與意願調查。",
      entry_events_link: "前往活動",
      hero_ingressi: "主要入口",
      hero_letture: "閱讀",
      hero_resta: "留在故事裡",
      hero_alt_links: "其他連結",
    },
    footer: {
      tagline: "不同的文化，用各自的方式回應同一個問題——我們在這裡把它們放在一起對話。",
      explore: "探索",
      newsletter_heading: "電子報",
      newsletter_body: "每月一封，其餘請見專頁。",
      newsletter_why: "為什麼要訂閱",
      rights: "版權所有。",
      instagram: "Instagram",
      back_to_top: "回到頂端",
    },
    lang_switcher: {
      aria: "語言",
    },
    articoli: {
      eyebrow: "閱讀",
      title: "文章與稿",
      subtitle: "短文、食譜與跨越邊界的聲音。",
      loading: "載入中…",
      error: "無法載入文章。",
      retry: "重試",
      empty: "文章即將推出。",
    },
    common: {
      read_more: "閱讀全文",
    },
  },
  en: {
    nav: {
      founders: "Founders",
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
      newsletter_title: "Stay in the loop",
      newsletter_subtitle:
        "One email a month, no spam. What you’ll get and how we subscribe ourselves — it’s on the dedicated page.",
      newsletter_cta: "Read the promise",
      entry_magazine_kicker: "I — Magazine",
      entry_magazine_title: "Essays, notes, and voices across borders.",
      entry_magazine_link: "Enter the Magazine",
      entry_events_kicker: "II — Sessions",
      entry_events_title: "Upcoming sessions, seasons, and interest.",
      entry_events_link: "Go to sessions",
      hero_ingressi: "Main entry points",
      hero_letture: "Reads",
      hero_resta: "Stay with the story",
      hero_alt_links: "More links",
    },
    footer: {
      tagline:
        "Where different cultures answer the same human questions in surprisingly different ways.",
      explore: "Explore",
      newsletter_heading: "Newsletter",
      newsletter_body: "One email a month. For everything else, the dedicated page.",
      newsletter_why: "Why subscribe",
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
      subtitle: "Essays, recipes, and voices across borders.",
      loading: "Loading…",
      error: "Couldn’t load articles.",
      retry: "Try again",
      empty: "First articles are on the way.",
    },
    common: {
      read_more: "Read",
    },
  },
};

/** Shorthand: `t("it", d => d.nav.articles)` or use with current lang in a hook later. */
export function pickDict<L extends Lang>(lang: L): I18nDict {
  return dict[lang];
}
