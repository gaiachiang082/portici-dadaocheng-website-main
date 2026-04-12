import type { Lang } from "@/contexts/LangContext";

export type SpazioSense = { sense: string; kanji: string; desc: string };

export type SpazioCopy = {
  heroEyebrow: string;
  heroTitle1: string;
  heroTitle2Accent: string;
  heroP1: string;
  heroOpenQ: string;
  sensesKicker: string;
  sensesTitle: string;
  senses: SpazioSense[];
  locationsKicker: string;
  locationsTitle: string;
  bolognaTitle: string;
  bolognaBody: string;
  popTitle: string;
  popBody: string;
  instagramCta: string;
  galleryLabel: string;
  closingP1: string;
  closingP2: string;
  galleryCaptions: string[];
};

const galleryCaptionsIt = [
  "Dadaocheng: archi, botteghe, pietra bagnata dopo la pioggia",
  "Sotto i portici: ombra fissa, passo che cambia con la luce",
  "Tetto a curve, incenso, scale consumate dal tempo",
  "Mattoni, intonaco, ferro: materiali che portano date diverse",
  "Inchiostro e peso del polso sul foglio",
  "Acqua che fonde il nero in strati trasparenti",
  "Foglia, ramo, uccello: lessico disegnato a mano",
  "Tavoli stretti, carta condivisa, mani che correggono il gesto",
  "Ramo secco, fiore bianco: poche linee, molto spazio vuoto",
  "Stessa acqua bollente, tre modi diversi di sedersi intorno",
  "Gest ripetuto finché il corpo ricorda la sequenza",
  "Tavola con piatti piccoli, odori che non chiedono di essere nominati",
  "Argilla, smalto, bordo consumato dal passaggio delle mani",
  "Due città sullo stesso tavolo: cosa lasci fuori dalla foto?",
];

const galleryCaptionsEn = [
  "Dadaocheng: arcades, shops, stone wet after rain",
  "Under Bologna's porticoes: steady shade, a stride that shifts with the light",
  "Curved rooflines, incense, steps worn by time",
  "Brick, plaster, iron: materials that carry different dates",
  "Ink and the wrist's weight on paper",
  "Water loosening black into clear layers",
  "Leaf, branch, bird: a vocabulary drawn by hand",
  "Narrow tables, shared paper, hands correcting the gesture",
  "Dry branch, white flower: few lines, much empty space",
  "The same boiling water, three ways of sitting around it",
  "Gesture repeated until the body remembers the sequence",
  "A table of small dishes, smells that do not need naming",
  "Clay, glaze, a rim worn by passing hands",
  "Two cities at one table: what do you leave outside the frame?",
];

const it: SpazioCopy = {
  heroEyebrow: "Spazio",
  heroTitle1: "Spazio fisso e pop-up.",
  heroTitle2Accent: "Materiale da toccare, non vetrina chiusa.",
  heroP1:
    "Allestiamo stanze e tavoli con carta, ceramica, tè versato in piccole porzioni: circa 15–30 minuti per passare, fermarsi, annotare cosa resta addosso quando esci.",
  heroOpenQ: "Cosa vorresti lasciare fuori da questo attraversamento — anche se ti interessa restare?",
  sensesKicker: "Appunto in sala",
  sensesTitle: "Cinque modi di entrare nel materiale",
  senses: [
    { sense: "Vista", kanji: "視", desc: "40% spazio vuoto. Colori Moon White dominanti. Le copertine come opere d'arte." },
    { sense: "Udito", kanji: "聽", desc: "Playlist curata: Ryuichi Sakamoto, Lim Giong. Volume appena percettibile." },
    { sense: "Olfatto", kanji: "嗅", desc: "Hinoki (cipresso giapponese) e tè verde. Percezione graduale, non immediata." },
    { sense: "Tatto", kanji: "觸", desc: "Una scatola di materiali da toccare: carta, legno, lino, ceramica." },
    { sense: "Gusto", kanji: "味", desc: "All'entrata: 30ml di oolong freddo taiwanese in tazze ceramiche uniche." },
  ],
  locationsKicker: "Dove Siamo",
  locationsTitle: "Bologna & Pop-up in Europa",
  bolognaTitle: "Bologna — Sede Principale",
  bolognaBody:
    "Il nostro spazio fisso a Bologna. Qui si tengono i workshop regolari e lo spazio è aperto durante gli eventi. Indirizzo esatto comunicato ai partecipanti confermati.",
  popTitle: "Pop-up — Milano, Berlino, Parigi",
  popBody:
    "Di tanto in tanto spostiamo tavoli e cassetti in altre città europee. Su Instagram annotiamo date e città quando sono confermate — senza promettere un calendario continuo.",
  instagramCta: "Apri il profilo — note su date e luoghi",
  galleryLabel: "Galleria Fotografica",
  closingP1:
    "Noi teniamo il locale aperto quando c'è qualcosa da mostrare in mano; quando è vuoto, preferiamo dirlo.",
  closingP2:
    "Quale dettaglio fisico — suono, odore, peso — ti farebbe capire che sei nel posto giusto, senza bisogno di slogan?",
  galleryCaptions: galleryCaptionsIt,
};

const en: SpazioCopy = {
  heroEyebrow: "Space",
  heroTitle1: "Fixed space and pop-up.",
  heroTitle2Accent: "Material to touch, not a sealed display.",
  heroP1:
    "We set rooms and tables with paper, ceramic, tea poured in small portions: about fifteen to thirty minutes to pass through, pause, and note what stays on you when you leave.",
  heroOpenQ: "What would you leave outside this crossing — even if you want to stay?",
  sensesKicker: "Note in the room",
  sensesTitle: "Five ways into the material",
  senses: [
    {
      sense: "Sight",
      kanji: "視",
      desc: "Roughly forty percent empty space. Moon White tones dominant. Covers treated like printed matter, not filler.",
    },
    {
      sense: "Hearing",
      kanji: "聽",
      desc: "A quiet playlist — Ryuichi Sakamoto, Lim Giong. Volume low enough to miss if you are not listening.",
    },
    {
      sense: "Smell",
      kanji: "嗅",
      desc: "Hinoki and green tea. The scent arrives gradually — not a hit at the door.",
    },
    {
      sense: "Touch",
      kanji: "觸",
      desc: "A box of things to handle: paper, wood, linen, ceramic.",
    },
    {
      sense: "Taste",
      kanji: "味",
      desc: "At the door: thirty millilitres of cold Taiwanese oolong in cups that do not match.",
    },
  ],
  locationsKicker: "Where we are",
  locationsTitle: "Bologna and pop-ups in Europe",
  bolognaTitle: "Bologna — main base",
  bolognaBody:
    "Our fixed space in Bologna. Regular labs meet here; the room opens during announced events. We send the exact address once participation is confirmed.",
  popTitle: "Pop-up — Milan, Berlin, Paris",
  popBody:
    "From time to time we move tables and drawers to other European cities. On Instagram we log dates and cities when they are firm — not a promise of a full-year tour.",
  instagramCta: "Open the profile — notes on dates and places",
  galleryLabel: "Photo gallery",
  closingP1:
    "We keep the place open when there is something to show in the hand; when it is empty, we say so.",
  closingP2:
    "Which physical detail — sound, smell, weight — would tell you you are in the right room, without a slogan?",
  galleryCaptions: galleryCaptionsEn,
};

export function getSpazioCopy(lang: Lang): SpazioCopy {
  return lang === "en" ? en : it;
}
