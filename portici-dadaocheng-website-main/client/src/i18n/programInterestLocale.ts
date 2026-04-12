import type { Lang } from "@/contexts/LangContext";
import type { ProgramConcept } from "@/data/programConcepts";

export type ProgramInterestCopy = {
  kindLabel: Record<ProgramConcept["kind"], string>;
  kicker: string;
  title: string;
  intro: string;
  refFromSite: string;
  formTitle: string;
  selectedTopicLead: string;
  labelEmail: string;
  labelName: string;
  labelNote: string;
  notePlaceholder: string;
  newsletterCheckbox: string;
  submit: string;
  submitting: string;
  legacyHintBefore: string;
  legacyHintLink: string;
  legacyHintAfter: string;
  toastSuccessTitle: string;
  toastSuccessBody: string;
  toastExtraAlreadySub: string;
  toastExtraSubscribed: string;
  toastExtraNewsletterFail: string;
  toastErrorGeneric: string;
  openQuestion: string;
};

const it: ProgramInterestCopy = {
  kindLabel: {
    cultural: "Linea culturale",
    hybrid: "Ibrido conviviale",
    exploratory: "In esplorazione",
  },
  kicker: "Prossime sessioni",
  title: "Linee possibili — raccogliamo interesse prima del calendario",
  intro:
    "Il programma dal vivo è stagionale e guidato dalla domanda. Scegli una linea: quando la richiesta regge il tavolo, scriviamo a chi ha lasciato nota con data, formato e dettagli pratici — non prima.",
  refFromSite: "Linea dal sito",
  formTitle: "Lascia una nota",
  selectedTopicLead: "Tema selezionato:",
  labelEmail: "Email *",
  labelName: "Nome (facoltativo)",
  labelNote: "Nota (facoltativo)",
  notePlaceholder: "Es. sere feriali, livello principiante, gruppo di 3 persone…",
  newsletterCheckbox:
    "Registra anche l'indirizzo per la posta rada: Magazine e aggiornamenti sulle sessioni, solo quando c'è materiale da aggiungere al taccuino.",
  submit: "Lascia una nota",
  submitting: "Invio…",
  legacyHintBefore: "Se hai già ricevuto un invito con link al pagamento, puoi aprire il",
  legacyHintLink: "passaggio per confermare la partecipazione e l'acconto",
  legacyHintAfter: ".",
  toastSuccessTitle: "Abbiamo registrato il tuo interesse.",
  toastSuccessBody:
    "Ti scriveremo quando questa linea avrà una data o un formato da appuntare — senza promettere continuità.",
  toastExtraAlreadySub: " Sei già nella lista della posta: non abbiamo aperto un secondo canale.",
  toastExtraSubscribed:
    " Abbiamo anche registrato l'indirizzo per la posta rada del Magazine e delle sessioni — solo quando il taccuino ha qualcosa da aggiungere.",
  toastExtraNewsletterFail:
    " L'interesse è salvato. Per la newsletter, se vuoi completare, passa dalla pagina dedicata quando ti è comodo.",
  toastErrorGeneric: "Invio non riuscito. Riprova tra poco.",
  openQuestion:
    "Quale vincolo — tempo, tema, trasporto — dovremmo tenere presente quando ricontiamo questa richiesta?",
};

const en: ProgramInterestCopy = {
  kindLabel: {
    cultural: "Cultural line",
    hybrid: "Convivial hybrid",
    exploratory: "In exploration",
  },
  kicker: "Upcoming sessions",
  title: "Possible lines — we gather interest before the calendar",
  intro:
    "Our in-person programme is seasonal and demand-led. Pick a line: when the table holds, we write to those who left a note with date, format, and practical detail — not before.",
  refFromSite: "Line from the site",
  formTitle: "Leave a note",
  selectedTopicLead: "Selected theme:",
  labelEmail: "Email *",
  labelName: "Name (optional)",
  labelNote: "Note (optional)",
  notePlaceholder: "E.g. weekday evenings, beginner level, group of three…",
  newsletterCheckbox:
    "Also register this address for sparse mail: Magazine and session updates only when the notebook has something to add.",
  submit: "Leave a note",
  submitting: "Sending…",
  legacyHintBefore: "If you already received an invite with a payment link, you can open the",
  legacyHintLink: "path to confirm participation and deposit",
  legacyHintAfter: ".",
  toastSuccessTitle: "We have registered your interest.",
  toastSuccessBody:
    "We will write when this line has a date or a shape worth pinning down — without promising a steady drumbeat.",
  toastExtraAlreadySub: " You are already on the mail list: we did not open a second channel.",
  toastExtraSubscribed:
    " We also saved your address for sparse Magazine and session mail — only when the notebook has something to add.",
  toastExtraNewsletterFail:
    " Your interest is saved. For the newsletter, if you want to finish, use the dedicated page when it suits you.",
  toastErrorGeneric: "The note did not go through. Try again shortly.",
  openQuestion: "What should we keep in mind — time, theme, travel — when we return to this request?",
};

export function getProgramInterestCopy(lang: Lang): ProgramInterestCopy {
  return lang === "en" ? en : it;
}
