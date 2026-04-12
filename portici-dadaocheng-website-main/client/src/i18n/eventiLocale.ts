import type { Lang } from "@/contexts/LangContext";

export type EventiCopy = {
  interestSteps: readonly { n: string; title: string; text: string }[];
  headerEyebrow: string;
  headerMeta: string;
  headerTitle: string;
  headerP1: string;
  headerP2: string;
  headerOpenQ: string;
  howTitle: string;
  howSubtitle: string;
  raccontoTitle: string;
  raccontoReadingsK: string;
  raccontoReadingsP: string;
  raccontoReadingsLink: string;
  raccontoNewsK: string;
  raccontoNewsP: string;
  raccontoNewsLink: string;
  raccontoImgK: string;
  raccontoImgP: string;
  raccontoImgLink1: string;
  raccontoImgLink2: string;
  whereTitle: string;
  whereBody: string;
  whereLink: string;
  elsewhereLabel: string;
  elsewhereMagazine: string;
  elsewhereNewsletter: string;
  elsewhereContact: string;
};

const it: EventiCopy = {
  interestSteps: [
    {
      n: "1",
      title: "Linee curate",
      text: "Proponiamo laboratori e serate come prolungamenti del taccuino editoriale — non come catalogo tenuto aperto per abitudine.",
    },
    {
      n: "2",
      title: "Raccogliamo interesse",
      text: "Lasci email e, se vuoi, una nota: ci dice su quali temi vale la pena concentrare energie e stagioni.",
    },
    {
      n: "3",
      title: "Raggruppiamo la domanda",
      text: "Per ogni linea contiamo chi si è mosso. Quando ha senso, definiamo formato, durata e fascia di prezzo — altrimenti no.",
    },
    {
      n: "4",
      title: "Ti scriviamo con le date",
      text: "Chi ha lasciato nota riceve prima le informazioni sulle sessioni confermate. Il contributo economico arriva quando il programma è reale, non come primo gesto.",
    },
  ],
  headerEyebrow: "Sessioni dal vivo",
  headerMeta: "Bologna · incontri a tempo stabilito",
  headerTitle: "Il calendario segue la domanda — non l'urgenza di riempire sale",
  headerP1:
    "Gli incontri sono raduni di campo sullo stesso tavolo del Magazine: stesse domande, mani che piegano carta o tè. Il sito tiene il racconto e la posta rada; le sessioni si aprono quando la richiesta regge data e luogo.",
  headerP2:
    "Niente disponibilità continua promessa: linee possibili, note raccolte, poi stagioni e pilota. Il pagamento con acconto resta solo per chi ha già ricevuto invito — per tenere il posto su un giorno preciso.",
  headerOpenQ:
    'Cosa ti farebbe dire "questa data ha senso" — anche se il tema non è ancora perfetto per te?',
  howTitle: "Come funziona oggi",
  howSubtitle: "Dal tema all'invito — senza carrello in prima pagina.",
  raccontoTitle: "Racconto e programma",
  raccontoReadingsK: "Prima le letture",
  raccontoReadingsP:
    "Il Magazine è il luogo dove teniamo ferma la linea culturale. Da lì capite tono, immagini e perché certe sessioni esistono.",
  raccontoReadingsLink: "Apri il Magazine",
  raccontoNewsK: "Restare nel filo",
  raccontoNewsP:
    "Poche mail, stesso spirito del sito. Complementare rispetto alla nota che lasci sulle linee in calendario.",
  raccontoNewsLink: "Pagina newsletter",
  raccontoImgK: "Immagini e filosofia",
  raccontoImgP:
    "Per approfondire calligrafia, cucina e percorso visivo — senza passare dal calendario.",
  raccontoImgLink1: "Laboratori — visione d'insieme",
  raccontoImgLink2: "Calligrafia",
  whereTitle: "Dove siamo",
  whereBody:
    "La base è a Bologna; l'indirizzo preciso lo mandiamo quando una sessione ha data e posti tenuti. A volte spostiamo tavolo e materiali in pop-up altrove, sempre con annuncio scritto.",
  whereLink: "Contatti",
  elsewhereLabel: "Altrove sul sito",
  elsewhereMagazine: "Magazine",
  elsewhereNewsletter: "Newsletter",
  elsewhereContact: "Contatti",
};

const en: EventiCopy = {
  interestSteps: [
    {
      n: "1",
      title: "Curated lines",
      text: "We propose labs and evenings as extensions of the editorial notebook — not a catalogue left open by default.",
    },
    {
      n: "2",
      title: "We gather interest",
      text: "Leave an email and, if you like, a note: it tells us which themes deserve a season of attention.",
    },
    {
      n: "3",
      title: "We cluster demand",
      text: "For each line we count who has moved. When it makes sense, we set format, length, and a price band — otherwise we do not.",
    },
    {
      n: "4",
      title: "We write back with dates",
      text: "Those who left a note hear first about confirmed sessions. Money follows when the programme is real — not as the opening move.",
    },
  ],
  headerEyebrow: "Sessions in person",
  headerMeta: "Bologna · field gatherings at a set time",
  headerTitle: "The calendar follows demand — not the urge to fill a room",
  headerP1:
    "Meetings are field gatherings at the same table as the Magazine: the same questions, hands folding paper or pouring tea. The site holds the story and sparse mail; sessions open when demand can hold a date and a place.",
  headerP2:
    "We do not promise continuous availability: possible lines, notes collected, then seasons and pilots. Deposit payment stays for those already invited — to hold a place on a specific day.",
  headerOpenQ:
    "What would make you say this date holds weight — even if the theme is not quite right for you yet?",
  howTitle: "How it works now",
  howSubtitle: "From theme to invitation — no checkout on the landing page.",
  raccontoTitle: "Story and programme",
  raccontoReadingsK: "Read first",
  raccontoReadingsP:
    "The Magazine is where we keep the cultural line steady. From there you sense tone, images, and why certain sessions exist.",
  raccontoReadingsLink: "Open the Magazine",
  raccontoNewsK: "Stay in the thread",
  raccontoNewsP:
    "Sparse mail, same spirit as the site. It sits beside the note you leave on calendar lines.",
  raccontoNewsLink: "Newsletter page",
  raccontoImgK: "Images and line of thought",
  raccontoImgP:
    "To go deeper on calligraphy, food, and the visual path — without starting from the calendar grid.",
  raccontoImgLink1: "Labs — overview",
  raccontoImgLink2: "Calligraphy",
  whereTitle: "Where we are",
  whereBody:
    "Our base is in Bologna; we send the exact address when a session has a date and held places. Sometimes we move table and materials to a pop-up elsewhere — always with a written notice first.",
  whereLink: "Contact",
  elsewhereLabel: "Elsewhere on the site",
  elsewhereMagazine: "Magazine",
  elsewhereNewsletter: "Newsletter",
  elsewhereContact: "Contact",
};

export function getEventiCopy(lang: Lang): EventiCopy {
  return lang === "en" ? en : it;
}
