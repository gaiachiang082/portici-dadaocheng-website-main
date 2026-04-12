import type { Lang } from "@/contexts/LangContext";

export type NewsletterValueBlock = { title: string; text: string; closing: string };

export type NewsletterPageCopy = {
  seoTitle: string;
  seoDescription: string;
  jsonLdSubscribeName: string;
  headerEyebrow: string;
  headerMeta: string;
  headerTitle: string;
  headerP1: string;
  headerP2: string;
  headerOpenQ: string;
  formHeading: string;
  formIntro: string;
  submitButtonLabel: string;
  valueBlocks: NewsletterValueBlock[];
};

const it: NewsletterPageCopy = {
  seoTitle: "Newsletter | Portici DaDaocheng — Note dalla redazione",
  seoDescription:
    "Iscriviti alla newsletter di Portici DaDaocheng per ricevere note editoriali, approfondimenti di antropologia del cibo e anteprime del magazine.",
  jsonLdSubscribeName: "Iscriviti alla newsletter di Portici DaDaocheng",
  headerEyebrow: "Newsletter",
  headerMeta: "Lettera dal taccuino · Portici",
  headerTitle: "Posta rada, materiale da leggere con calma",
  headerP1:
    "Ti scriviamo quando abbiamo una nota che non sta bene solo sul sito: testo lungo, aggiornamento sul trimestrale, o un invito a una sessione con data e posto.",
  headerP2: "Niente catene di promozioni: se non c'è nulla da aggiungere al taccuino, non inventiamo urgenza.",
  headerOpenQ: "Cosa vorresti che restasse fuori da questa casella — anche se il progetto ti interessa?",
  formHeading: "Una riga nel quaderno",
  formIntro:
    "Lasci qui l'indirizzo come un segnalibro tra le pagine del taccuino: quando avremo una nota pronta — testo lungo, aggiornamento sul trimestrale, invito con data e luogo — te la spediamo. Niente calendario da rispettare dall'altra parte; solo materiale che regge la lettura.",
  submitButtonLabel: "Registra l'indirizzo",
  valueBlocks: [
    {
      title: "Profondità",
      text: "Un tema alla volta, su carta o in sala: testi che chiedono di fermarsi, non di scorrere.",
      closing: "Quanto tempo riesci a tenere una lettura lunga oggi, senza doverlo giustificare a nessuno?",
    },
    {
      title: "Ritmo",
      text: "Non teniamo un calendario di posta fisso: a volte due note vicine, a volte settimane senza nulla in casella.",
      closing: "Cosa ti fa più diffidenza — un silenzio lungo o una mail che arriva troppo prevedibile?",
    },
    {
      title: "Inviti",
      text: "Quando una sessione ha data e luogo a Bologna te lo segniamo qui; non è un carrello sempre aperto.",
      closing: "Preferisci sapere prima il tema o prima il giorno sul calendario?",
    },
  ],
};

const en: NewsletterPageCopy = {
  seoTitle: "Newsletter | Portici DaDaocheng — Notes from the desk",
  seoDescription:
    "Rare mail from Portici DaDaocheng: long reads, quarterly updates, and session notes when a date and place are set — no filler, no drumbeat.",
  jsonLdSubscribeName: "Subscribe to the Portici DaDaocheng newsletter",
  headerEyebrow: "Newsletter",
  headerMeta: "Letter from the notebook · Portici",
  headerTitle: "Sparse mail, matter worth reading slowly",
  headerP1:
    "We write when a note does not belong only on the site: a long text, news about the quarterly, or an invitation to a session with a date and a room.",
  headerP2:
    "No chains of promotions: if the notebook has nothing to add, we do not invent urgency.",
  headerOpenQ: "What would you want left outside this inbox — even if the project still draws you?",
  formHeading: "A line in the notebook",
  formIntro:
    "Leave your address like a bookmark between pages: when we have a note ready — long text, quarterly update, invitation with date and place — we send it. No schedule you must keep on your side; only material that holds a slow read.",
  submitButtonLabel: "Save this address",
  valueBlocks: [
    {
      title: "Depth",
      text: "One theme at a time, on paper or in the room: text that asks you to stay still, not to scroll.",
      closing: "How long can you hold a long read today, without owing anyone an explanation?",
    },
    {
      title: "Cadence",
      text: "We do not keep a fixed mail calendar: sometimes two notes close together, sometimes weeks with nothing in the box.",
      closing: "Which makes you more wary — a long silence or mail that arrives too predictably?",
    },
    {
      title: "Invitations",
      text: "When a session has a date and a place in Bologna, we mark it here; it is not a checkout left open.",
      closing: "Would you rather know the theme first, or the day on the calendar first?",
    },
  ],
};

export function getNewsletterPageCopy(lang: Lang): NewsletterPageCopy {
  return lang === "en" ? en : it;
}
