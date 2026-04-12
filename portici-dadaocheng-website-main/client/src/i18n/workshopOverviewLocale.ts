import type { Lang } from "@/contexts/LangContext";

const IMG = {
  calligroupA:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/vLnJyrtRLIpbvnYg.png",
  calliInkBrush:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/dFdjgXVTblMasniP.png",
  calliEuroMan:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/EizOfazFNGcbaYxm.png",
  calliFlowerGirls:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/CWqYQNYqpYltaUBn.png",
  calliClassroom:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/pmoSxbLCOlhTAXWL.png",
  inkFlower:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/PAfFLmeFyGztnQqK.png",
  dumplingWorkshop:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/YMRvdgKpLhmaPWyF.png",
  baozi: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/TyMWdcUtnQcKPoYO.png",
  teaTrayCloseup:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/VmUsguHFlqXOZXyu.png",
  teaCeremony:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/FvnvFYxyZBtkoWGM.png",
};

export type WorkshopFeatureItem = {
  category: string;
  categoryZh: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  src: string;
  alt: string;
  reverse: boolean;
  accent: string;
};

export type WorkshopOverviewCopy = {
  workshopSlides: { src: string; label: string; caption: string }[];
  workshopFeatures: WorkshopFeatureItem[];
  highlightKicker: string;
  highlightTitle: string;
  tableImagesKicker: string;
  linesAndDatesLink: string;
  calligraphyGalleryLink: string;
  categoryLabels: Record<string, string>;
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2Em: string;
  heroP1: string;
  heroOpenQ: string;
  steps: { step: string; title: string; desc: string }[];
  sectionDbKicker: string;
  sectionLabsTitle: string;
  filterLead: string;
  filterAllMonths: string;
  filterClear: (n: number) => string;
  categoryFilters: { value: string; label: string }[];
  emptyFiltered: string;
  clearAllFilters: string;
  resultCount: (n: number) => string;
  resultCountFiltered: (n: number) => string;
  badgeOnCalendar: string;
  badgeFull: string;
  sessionDatesLead: string;
  spotsFull: string;
  spotsN: (n: number) => string;
  moreDates: (n: number) => string;
  noPublicDates: string;
  maxParticipants: (n: number) => string;
  depositBlurb: string;
  leaveNoteCta: string;
  inviteDepositLink: string;
  writeUs: string;
  whenYouHaveDateKicker: string;
  whenYouHaveDateTitle: string;
  whenYouHaveDateP1: string;
  whenYouHaveDateOpenQ: string;
};

const it: WorkshopOverviewCopy = {
  workshopSlides: [
    { src: IMG.calligroupA, label: "書法", caption: "Calligrafia — inchiostro, polso, carta che assorbe" },
    { src: IMG.calliEuroMan, label: "水墨", caption: "Inchiostro diluito — acqua che ferma il nero a strati" },
    { src: IMG.calliClassroom, label: "課堂", caption: "Tavoli stretti — mani che correggono il gesto" },
    { src: IMG.calliFlowerGirls, label: "花鳥", caption: "Ramo, fiore, uccello — lessico disegnato" },
    { src: IMG.calliInkBrush, label: "筆", caption: "Pennello consumato — setole piegate da uso" },
    { src: IMG.inkFlower, label: "梅", caption: "Susino — poche linee, molto vuoto sulla carta" },
    { src: IMG.dumplingWorkshop, label: "餃子", caption: "Impasto e pieghe — contano i millimetri" },
    { src: IMG.baozi, label: "包子", caption: "Baozi — chiusura a gironi, vapore che sale" },
    { src: IMG.teaTrayCloseup, label: "茶", caption: "Stessa acqua bollente — tre modi di sedersi intorno" },
    { src: IMG.teaCeremony, label: "茶道", caption: "Cerimonia — sequenza ripetuta finché il corpo la ricorda" },
  ],
  workshopFeatures: [
    {
      category: "Calligrafia & Inchiostro",
      categoryZh: "書法水墨",
      title: "Mano, pennello, carta assorbente",
      body: "Annotiamo come il polso piega il tratto e come l'inchiostro penetra la fibra. Non è una gara di copia: è un'ora sotto i portici o in sala dove il corpo regola la velocità.",
      cta: "Lascia una nota sulla linea",
      href: "/eventi?interesse=calligraphy-ink",
      src: IMG.calligroupA,
      alt: "Laboratorio di calligrafia — gruppo intorno al tavolo",
      reverse: false,
      accent: "var(--primary)",
    },
    {
      category: "Pittura ad Inchiostro",
      categoryZh: "水墨畫",
      title: "Acqua e nero senza correzione",
      body: "Ogni strato resta visibile: togliamo l'idea di 'rifare' e teniamo il foglio come campo di prove. Utile per chi vuole misurare quanta paura ha del primo segno.",
      cta: "Vedi sessioni e linee",
      href: "/eventi",
      src: IMG.inkFlower,
      alt: "Mano che dipinge fiori di susino con inchiostro",
      reverse: true,
      accent: "var(--secondary)",
    },
    {
      category: "Cucina Culturale",
      categoryZh: "飲食文化",
      title: "Piega, impasto, vapore",
      body: "Impastare e chiudere ravioli o baozi è un modo di leggere gesti tramandati senza volerli congelare in folklore. Contano spessore, piega, tempo di cottura — cose che si misurano in mano.",
      cta: "Lascia una nota sul tema",
      href: "/eventi?interesse=food-cultural",
      src: IMG.dumplingWorkshop,
      alt: "Tavolo con impasto e ravioli",
      reverse: false,
      accent: "var(--accent)",
    },
  ],
  highlightKicker: "Laboratori",
  highlightTitle: "Incontri a tempo stabilito, stesse domande del trimestrale",
  tableImagesKicker: "Immagini dal tavolo",
  linesAndDatesLink: "Linee e date",
  calligraphyGalleryLink: "Galleria calligrafia",
  categoryLabels: {
    calligraphy: "書法 · Calligrafia",
    ink: "水墨 · Inchiostro",
    tea: "茶道 · Cerimonia del Tè",
    food: "飲食 · Cucina",
  },
  heroEyebrow: "Laboratori dal vivo",
  heroTitle1: "Raduni di campo",
  heroTitle2Em: "sullo stesso tavolo del Magazine.",
  heroP1:
    "Ogni linea parte dalle stesse domande del trimestrale. Il calendario non è vetrina: si compone per stagioni, quando chi lascia nota basta a tenere in piedi data e luogo.",
  heroOpenQ: "Cosa ti serve sapere prima di tenere fermo un posto — tema, orario, o chi sarà seduto accanto a te?",
  steps: [
    {
      step: "01",
      title: "Leggi il filo",
      desc: "Magazine e posta rada tengono ferma la bussola — capisci perché certe linee esistono.",
    },
    {
      step: "02",
      title: "Lascia una nota",
      desc: "Sulla pagina Sessioni registri tema e email: noi costruiamo il programma quando la domanda regge il tavolo.",
    },
    {
      step: "03",
      title: "Poi data e luogo",
      desc: "Ricevi formato, luogo e contributo solo quando la sessione è reale. L'acconto non è il primo gesto sul sito.",
    },
  ],
  sectionDbKicker: "Linee dal database",
  sectionLabsTitle: "Possibili laboratori",
  filterLead: "Filtra:",
  filterAllMonths: "Tutti i mesi",
  filterClear: (n) => `Rimuovi filtri (${n})`,
  categoryFilters: [
    { value: "all", label: "Tutti i tipi" },
    { value: "calligraphy", label: "書法 Calligrafia" },
    { value: "ink", label: "水墨 Inchiostro" },
    { value: "tea", label: "茶道 Tè" },
    { value: "food", label: "飲食 Cucina" },
  ],
  emptyFiltered: "Nessun workshop trovato con i filtri selezionati.",
  clearAllFilters: "Rimuovi tutti i filtri →",
  resultCount: (n) => `${n} workshop ${n === 1 ? "trovato" : "trovati"}`,
  resultCountFiltered: (n) => `${n} workshop ${n === 1 ? "trovato" : "trovati"} con i filtri applicati`,
  badgeOnCalendar: "In calendario",
  badgeFull: "Completo",
  sessionDatesLead: "Date in calendario (soggette a conferma collettiva)",
  spotsFull: "Completo",
  spotsN: (n) => `${n} posti`,
  moreDates: (n) => `+ ${n} altre date disponibili`,
  noPublicDates:
    "Nessuna data pubblica al momento: raccogliamo interesse e apriamo il calendario quando la domanda regge la sessione.",
  maxParticipants: (n) => `Max ${n} partecipanti`,
  depositBlurb:
    "Contributi e depositi si comunicano quando il formato è confermato — non come primo passo sul sito.",
  leaveNoteCta: "Lascia una nota",
  inviteDepositLink: "Ho un invito — conferma partecipazione e acconto",
  writeUs: "Scrivici",
  whenYouHaveDateKicker: "Quando hai già una data",
  whenYouHaveDateTitle: "Acconto e punti restano per chi conferma su invito.",
  whenYouHaveDateP1:
    "Per chi ha già ricevuto una sessione confermata, teniamo le stesse regole di acconto e flessibilità. Non sono il modo in cui entri oggi nel programma — parti dalla pagina Sessioni con una nota.",
  whenYouHaveDateOpenQ: 'Cosa ti manca ancora sapere prima di considerare il posto "tenuto" sul serio?',
};

const en: WorkshopOverviewCopy = {
  workshopSlides: [
    { src: IMG.calligroupA, label: "書法", caption: "Calligraphy — ink, wrist, paper that drinks" },
    { src: IMG.calliEuroMan, label: "水墨", caption: "Diluted ink — water holding black in layers" },
    { src: IMG.calliClassroom, label: "課堂", caption: "Narrow tables — hands adjusting the gesture" },
    { src: IMG.calliFlowerGirls, label: "花鳥", caption: "Branch, flower, bird — a drawn vocabulary" },
    { src: IMG.calliInkBrush, label: "筆", caption: "A worn brush — bristles bent by use" },
    { src: IMG.inkFlower, label: "梅", caption: "Plum — few lines, much empty paper" },
    { src: IMG.dumplingWorkshop, label: "餃子", caption: "Dough and folds — millimetres matter" },
    { src: IMG.baozi, label: "包子", caption: "Baozi — pleated closure, steam rising" },
    { src: IMG.teaTrayCloseup, label: "茶", caption: "The same boiling water — three ways to sit around it" },
    { src: IMG.teaCeremony, label: "茶道", caption: "A sequence repeated until the body remembers" },
  ],
  workshopFeatures: [
    {
      category: "Calligraphy & ink",
      categoryZh: "書法水墨",
      title: "Hand, brush, paper that takes the stroke",
      body: "We note how the wrist bends the line and how ink enters the fibre. It is not a copying contest: it is an hour under the porticoes or in the room, where the body sets the pace.",
      cta: "Leave a note on this line",
      href: "/eventi?interesse=calligraphy-ink",
      src: IMG.calligroupA,
      alt: "Calligraphy lab — group around the table",
      reverse: false,
      accent: "var(--primary)",
    },
    {
      category: "Ink painting",
      categoryZh: "水墨畫",
      title: "Water and black without undo",
      body: "Each layer stays visible: we drop the idea of 'redoing' and keep the sheet as a test field. For anyone who wants to measure their fear of the first mark.",
      cta: "See sessions and lines",
      href: "/eventi",
      src: IMG.inkFlower,
      alt: "Hand painting plum blossoms in ink",
      reverse: true,
      accent: "var(--secondary)",
    },
    {
      category: "Food culture",
      categoryZh: "飲食文化",
      title: "Fold, dough, steam",
      body: "Kneading and closing dumplings or baozi is one way to read handed-down gestures without freezing them as display. Thickness, fold, cooking time — things we measure in the hand.",
      cta: "Leave a note on the theme",
      href: "/eventi?interesse=food-cultural",
      src: IMG.dumplingWorkshop,
      alt: "Table with dough and dumplings",
      reverse: false,
      accent: "var(--accent)",
    },
  ],
  highlightKicker: "Labs",
  highlightTitle: "Meetings at a set time — same questions as the quarterly",
  tableImagesKicker: "Images from the table",
  linesAndDatesLink: "Lines and dates",
  calligraphyGalleryLink: "Calligraphy gallery",
  categoryLabels: {
    calligraphy: "書法 · Calligraphy",
    ink: "水墨 · Ink",
    tea: "茶道 · Tea",
    food: "飲食 · Food",
  },
  heroEyebrow: "Labs in person",
  heroTitle1: "Field gatherings",
  heroTitle2Em: "at the same table as the Magazine.",
  heroP1:
    "Each line starts from the same questions as the quarterly. The calendar is not a shop window: it is built by seasons, when those who left a note are enough to hold a date and a place.",
  heroOpenQ: "What do you need to know before we hold a place — theme, time, or who sits beside you?",
  steps: [
    {
      step: "01",
      title: "Read the thread",
      desc: "The Magazine and sparse mail keep the compass steady — you see why certain lines exist.",
    },
    {
      step: "02",
      title: "Leave a note",
      desc: "On the Sessions page you register theme and email; we shape the programme when demand holds the table.",
    },
    {
      step: "03",
      title: "Then date and place",
      desc: "You receive format, place, and contribution only when the session is real. The deposit is not the first move on the site.",
    },
  ],
  sectionDbKicker: "Lines from the database",
  sectionLabsTitle: "Possible labs",
  filterLead: "Filter:",
  filterAllMonths: "All months",
  filterClear: (n) => `Clear filters (${n})`,
  categoryFilters: [
    { value: "all", label: "All types" },
    { value: "calligraphy", label: "書法 Calligraphy" },
    { value: "ink", label: "水墨 Ink" },
    { value: "tea", label: "茶道 Tea" },
    { value: "food", label: "飲食 Food" },
  ],
  emptyFiltered: "No labs match these filters.",
  clearAllFilters: "Clear all filters →",
  resultCount: (n) => `${n} ${n === 1 ? "lab" : "labs"} listed`,
  resultCountFiltered: (n) => `${n} ${n === 1 ? "lab" : "labs"} with filters applied`,
  badgeOnCalendar: "On the calendar",
  badgeFull: "Full",
  sessionDatesLead: "Dates on the calendar (subject to collective confirmation)",
  spotsFull: "Full",
  spotsN: (n) => `${n} places`,
  moreDates: (n) => `+ ${n} more dates`,
  noPublicDates:
    "No public date for now: we gather interest and open the calendar when demand can carry the session.",
  maxParticipants: (n) => `Up to ${n} people`,
  depositBlurb:
    "We spell out contributions and deposits once the format is confirmed — not as the first step on the site.",
  leaveNoteCta: "Leave a note",
  inviteDepositLink: "I have an invite — confirm participation and deposit",
  writeUs: "Write to us",
  whenYouHaveDateKicker: "When you already have a date",
  whenYouHaveDateTitle: "Deposits and points stay for those who confirm by invitation.",
  whenYouHaveDateP1:
    "If a session has already been confirmed for you, we keep the same deposit and flexibility rules. That is not how you enter the programme today — start from Sessions with a note.",
  whenYouHaveDateOpenQ: 'What is still missing before you would call the place "held" in earnest?',
};

export function getWorkshopOverviewCopy(lang: Lang): WorkshopOverviewCopy {
  return lang === "en" ? en : it;
}
