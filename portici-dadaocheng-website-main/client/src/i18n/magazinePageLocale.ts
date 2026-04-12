import type { Lang } from "@/contexts/LangContext";

export type MagazinePageCopy = {
  seoTitle: string;
  seoDescription: string;
  jsonLdPeriodicalDescription: string;
  headerEyebrow: string;
  headerMeta: string;
  titleLine1: string;
  titleLine2Em: string;
  headerP1Before: string;
  headerP1Strong: string;
  headerP1After: string;
  headerP2: string;
  headerOpenQ: string;
  currentKicker: string;
  receiveCurrentAria: string;
  pdfByEmailLead: string;
  newsletterSubmit: string;
  newsletterSuccessTitle: string;
  newsletterSuccessBody: string;
  newsletterAlreadyTitle: string;
  newsletterAlreadyBody: string;
  newsletterEmailFailSupplement: string;
  sessionsLink: string;
  samePdfInBrowser: string;
  samePdfNote: string;
  highlightsKicker: string;
  highlightsTitle: string;
  highlightsIntro: string;
  nextChapterKicker: string;
  archiveKicker: string;
  archiveTitle: string;
  archiveIntro: string;
  archiveEmpty: string;
  openPdfInBrowser: string;
  downloadPdf: string;
  coverAlt: (issueNumber: number) => string;
  webKicker: string;
  webTitle: string;
  webIntro: string;
  webCategoryFallback: string;
  readMore: string;
  imageAltArticle: (title: string) => string;
  imageAltGeneric: string;
  bottomKicker: string;
  bottomTitle: string;
  bottomBody: string;
  bottomLink: string;
};

const it: MagazinePageCopy = {
  seoTitle: "Magazine & Archivio | Portici DaDaocheng — Cultura e Identità",
  seoDescription:
    "Sfoglia l'archivio dei numeri di Portici DaDaocheng. Rivista indipendente che esplora la cultura taiwanese e dell'Asia orientale attraverso il cibo.",
  jsonLdPeriodicalDescription: "Trimestrale in PDF di Portici DaDaocheng.",
  headerEyebrow: "Portici Magazine",
  headerMeta: "Pubblicazione trimestrale",
  titleLine1: "Un numero per stagione:",
  titleLine2Em: "testo più lento del feed.",
  headerP1Before: "Il Magazine è il ",
  headerP1Strong: "trimestrale",
  headerP1After:
    " in PDF di Portici DaDaocheng: un oggetto per stagione — stesse premesse umane, risposte culturali che non coincidono (同中求異).",
  headerP2: "In questa pagina: edizione corrente, archivio dei numeri usciti, poi una selezione di testi nati per il web.",
  headerOpenQ: "Quale sezione del PDF ti accompagneresti via, se dovessi lasciare indietro il resto — e perché?",
  currentKicker: "Trimestrale · edizione corrente",
  receiveCurrentAria: "Ricevere il numero attuale",
  pdfByEmailLead:
    "Ti mandiamo il PDF del primo numero e, se vorrai, note sui numeri successivi — senza promettere un ritmo fisso.",
  newsletterSubmit: "Registra l'indirizzo per il Nº1",
  newsletterSuccessTitle: "Registrato — ti inviamo il Nº1 via email.",
  newsletterSuccessBody: "Controlla la casella: a breve il link al PDF del primo numero.",
  newsletterAlreadyTitle: "Sei già nella lista.",
  newsletterAlreadyBody:
    "Ti rimandiamo il messaggio con il link al PDF del numero 1: controlla la posta, anche in spam, quando ti è comodo.",
  newsletterEmailFailSupplement:
    "L'iscrizione è registrata, ma l'email non è partita da qui. Puoi riprovare tra poco o passare dalla pagina",
  sessionsLink: "Sessioni e laboratori",
  samePdfInBrowser: "Stesso PDF nel browser",
  samePdfNote: "per chi preferisce non usare la posta",
  highlightsKicker: "Stesso numero · sommario",
  highlightsTitle: "Cosa trovi nel PDF",
  highlightsIntro:
    "Anteprima delle sezioni: saggio, tavola, reportage e glossario restano nel file; qui solo la mappa per orientarti sul numero.",
  nextChapterKicker: "Prossimo capitolo",
  archiveKicker: "Pubblicazione · archivio",
  archiveTitle: "Numeri già pubblicati",
  archiveIntro:
    "L'archivio del trimestrale: ogni stagione resta scaricabile. Quando esce un nuovo numero, quello precedente si sposta qui — stessa pagina, stesso sistema.",
  archiveEmpty:
    "È online il primo numero del trimestrale; quando ne uscirà un altro, quello precedente comparirà qui come scheda d'archivio — stesso URL, stesso sistema.",
  openPdfInBrowser: "Apri il PDF nel browser",
  downloadPdf: "Scarica",
  coverAlt: (n) => `Copertina Portici Magazine Numero ${n}`,
  webKicker: "Sul sito · fuori dal PDF",
  webTitle: "Speciali e articoli scelti",
  webIntro:
    "Approfondimenti, collaborazioni e pezzi nativi per il web: affiancano il trimestrale, non lo sostituiscono.",
  webCategoryFallback: "Sul sito",
  readMore: "Leggi",
  imageAltArticle: (title) => `Anteprima articolo: ${title}`,
  imageAltGeneric: "Anteprima articolo",
  bottomKicker: "Restare nel racconto",
  bottomTitle: "Ricevi una mail quando il PDF è pronto",
  bottomBody:
    "Raramente, solo quando c'è un numero o una nota che vale la pena allegare — senza riempire la casella per abitudine.",
  bottomLink: "Ricevi i prossimi numeri direttamente nella tua posta.",
};

const en: MagazinePageCopy = {
  seoTitle: "Magazine & archive | Portici DaDaocheng",
  seoDescription:
    "Quarterly PDF issues from Portici DaDaocheng — one object per season, and an archive of past numbers. Companion web pieces sit beside the file, not in its place.",
  jsonLdPeriodicalDescription: "Quarterly PDF periodical from Portici DaDaocheng.",
  headerEyebrow: "Portici Magazine",
  headerMeta: "Quarterly publication",
  titleLine1: "One issue per season:",
  titleLine2Em: "slower text than the feed.",
  headerP1Before: "The Magazine is our ",
  headerP1Strong: "quarterly",
  headerP1After:
    " PDF from Portici DaDaocheng — one object per season, the same human questions, cultural answers that do not line up (同中求異).",
  headerP2: "On this page: the current issue, the archive of published numbers, then a handful of pieces born for the web.",
  headerOpenQ: "Which section of the PDF would you take with you if you had to leave the rest behind — and why?",
  currentKicker: "Quarterly · current issue",
  receiveCurrentAria: "Receive the current issue",
  pdfByEmailLead:
    "We send the PDF of the first issue and, if you wish, notes on later numbers — without promising a fixed rhythm.",
  newsletterSubmit: "Save this address for issue no. 1",
  newsletterSuccessTitle: "Saved — we will email you issue no. 1.",
  newsletterSuccessBody: "Check your inbox: the link to the first PDF will follow shortly.",
  newsletterAlreadyTitle: "You are already on the list.",
  newsletterAlreadyBody:
    "We will resend the message with the link to issue no. 1 — check mail, including spam, when it suits you.",
  newsletterEmailFailSupplement:
    "Your signup is saved, but the email did not send from here. Try again shortly, or open",
  sessionsLink: "Sessions and labs",
  samePdfInBrowser: "Same PDF in the browser",
  samePdfNote: "for those who prefer not to use mail",
  highlightsKicker: "Same issue · contents",
  highlightsTitle: "What you will find in the PDF",
  highlightsIntro:
    "A map of the sections — essay, table, reportage, and glossary stay inside the file; here we only orient you on this number.",
  nextChapterKicker: "Next chapter",
  archiveKicker: "Publication · archive",
  archiveTitle: "Issues already published",
  archiveIntro:
    "The quarterly archive: each season stays downloadable. When a new number appears, the previous one moves here — same page, same system.",
  archiveEmpty:
    "Only the first quarterly issue is online so far; when another appears, the earlier one will show here as an archive card — same URL, same system.",
  openPdfInBrowser: "Open the PDF in the browser",
  downloadPdf: "Download",
  coverAlt: (n) => `Cover of Portici Magazine issue ${n}`,
  webKicker: "On the site · outside the PDF",
  webTitle: "Features and selected articles",
  webIntro:
    "Longer pieces, collaborations, and web-native work: they walk beside the quarterly, they do not replace it.",
  webCategoryFallback: "On the site",
  readMore: "Read",
  imageAltArticle: (title) => `Article preview: ${title}`,
  imageAltGeneric: "Article preview",
  bottomKicker: "Stay in the thread",
  bottomTitle: "A letter when the PDF is ready",
  bottomBody:
    "Rarely, only when there is an issue or a note worth attaching — not to fill the inbox by habit.",
  bottomLink: "Receive later issues directly by mail.",
};

export function getMagazinePageCopy(lang: Lang): MagazinePageCopy {
  return lang === "en" ? en : it;
}
