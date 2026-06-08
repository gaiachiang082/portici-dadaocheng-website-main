/**
 * Quarterly magazine issues — single source for /magazine and homepage teaser.
 * New season: prepend a new issue to MAGAZINE_ISSUES and add assets under `client/public/magazine/`
 * or link to ghost-month public paths for interactive issues.
 *
 * Issue No.1 assets under `client/public/magazine/`:
 * - Full issue PDF → `/magazine/portici-magazine-n1-v2.pdf`
 * - Cover → `/magazine/covers/issue-1-cover.png`
 *
 * Issue No.2 assets under `ghost-month/public/` (served at `/ghost-month/...`):
 * - PDF → `/ghost-month/pdf/vol2.pdf`
 * - Cover → `/ghost-month/images/cover.png`
 * - Interactive landing → `/ghost-month`
 */

import {
  ISSUE_NO1_PDF_PUBLIC_PATH,
  ISSUE_NO2_LANDING_PATH,
  ISSUE_NO2_PDF_FILENAME,
  ISSUE_NO2_PDF_PUBLIC_PATH,
} from "@shared/const";

/** Served from `client/public/magazine/portici-magazine-n1-v2.pdf` */
export const ISSUE_NO1_PDF_HREF = ISSUE_NO1_PDF_PUBLIC_PATH;

export const ISSUE_NO1_PDF_FILENAME = "portici-magazine-n1-v2.pdf";

/** Cover image (no PDF embed on /magazine). */
export const ISSUE_NO1_COVER_LOCAL = "/magazine/covers/issue-1-cover.png";

/**
 * Fallback URL if the local cover image fails to load (CDN or alternate asset).
 */
export const ISSUE_NO1_COVER_FALLBACK_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663051147795/bglhzhpRWfrDXIyk.png";

export type IssueSectionPreview = {
  id: string;
  /** Small rubric (mono / UI) */
  rubric: string;
  title: string;
  dek: string;
  /** Optional short line in Traditional Chinese */
  asideZh?: string;
};

export type MagazineIssue = {
  slug: string;
  issueNumber: number;
  seasonLabel: string;
  year: number;
  /** e.g. "Bologna · DaDaocheng" */
  cityLine: string;
  /** Main theme / cover line */
  themeTitle: string;
  themeSubtitle?: string;
  /** Public URL to cover image (.png / .jpg / .webp). */
  coverUrl: string;
  /** Fallback image URL if `coverUrl` fails to load. */
  coverFallbackUrl?: string;
  coverAlt: string;
  /** Public path to PDF */
  pdfHref: string;
  /** Suggested filename for the `download` attribute on “Scarica” links */
  pdfDownloadFilename?: string;
  /** Optional immersive landing (e.g. /ghost-month for Vol.2) */
  landingHref?: string;
  /** Short editorial intro — shown under hero */
  intro: string[];
  sectionPreviews: IssueSectionPreview[];
  nextIssueTeaser: {
    title: string;
    body: string;
  };
};

/**
 * Newest first. `issues[0]` is always the featured current issue on /magazine.
 * When a new quarter ships: add the new issue at index 0; the previous number moves into the archive block automatically.
 */
export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    slug: "no2-estate-2026",
    issueNumber: 2,
    seasonLabel: "Estate",
    year: 2026,
    cityLine: "Bologna · Taiwan · SE Asia",
    themeTitle: "Il Mese dell'Ospitalità Invisibile",
    themeSubtitle: "Soglie, offerte e rituali del settimo mese lunare.",
    coverUrl: "/ghost-month/images/cover.png",
    coverAlt: "Copertina — Portici Magazine numero 2, estate 2026",
    pdfHref: ISSUE_NO2_PDF_PUBLIC_PATH,
    pdfDownloadFilename: ISSUE_NO2_PDF_FILENAME,
    landingHref: ISSUE_NO2_LANDING_PATH,
    intro: [
      "Il settimo mese lunare — guǐyuè, il mese dei fantasmi — ci offre una cornice per osservare come culture diverse costruiscono ospitalità verso chi non ha dimora: bacinella e asciugamano, zuppa lasciata a metà cottura, lanterne sull'acqua.",
      "Questo numero segue il filo migratorio Hoklo dal Fujian a Taiwan, Malesia e Singapore, e apre anche un'esperienza interattiva sul sito: mappe, rituali, tavola — oltre al PDF del trimestrale.",
    ],
    sectionPreviews: [
      {
        id: "soglia",
        rubric: "Soglia",
        title: "L'acqua, l'asciugamano e la zuppa a metà cottura",
        dek: "Accoglienza verso le anime senza dimora: lavare la polvere del viaggio, poi sedersi a tavola — con un gesto che non trattiene.",
        asideZh: "空心：招待而不留",
      },
      {
        id: "saggio",
        rubric: "Saggio",
        title: "Un mese, tre luoghi",
        dek: "Taiwan · Malesia · Singapore: come il guǐyuè viaggia con le comunità Hoklo e cambia forma senza perdere la domanda di fondo.",
      },
      {
        id: "rituale",
        rubric: "Focus",
        title: "Il Rituale: Qianggu, Keelung, Donggang",
        dek: "Tre riti del settimo mese — dalla processione al mare — come modi diversi di restituire dignità ai morti e ai vivi.",
      },
      {
        id: "codici-tavola",
        rubric: "I Codici della Tavola",
        title: "Le offerte di Zhongyuan",
        dek: "Cosa si mette sul tavolo, in che ordine, con quale intenzione: lessico materiale del mese dei fantasmi.",
      },
      {
        id: "dolci",
        rubric: "A Tavola",
        title: "I dolci di Zhongyuan",
        dek: "Moha, Bitao, Migaozhan — dolci che attraversano il confine tra offerta e convivio.",
      },
    ],
    nextIssueTeaser: {
      title: "Prossimo numero — autunno",
      body: "Il trimestrale resta a ritmo stagionale; la newsletter annuncia quando un nuovo PDF è pronto — e, quando serve, un ingresso dedicato come questo numero.",
    },
  },
  {
    slug: "no1-primavera-2026",
    issueNumber: 1,
    seasonLabel: "Primavera",
    year: 2026,
    cityLine: "Bologna · DaDaocheng",
    themeTitle: "Sulla soglia: Capodanno lunare e comunità",
    themeSubtitle: "Tra Italia e Taiwan, stessi bisogni, risposte diverse.",
    coverUrl: ISSUE_NO1_COVER_LOCAL,
    coverFallbackUrl: ISSUE_NO1_COVER_FALLBACK_URL,
    coverAlt: "Copertina — Portici Magazine numero 1, primavera 2026",
    pdfHref: ISSUE_NO1_PDF_HREF,
    pdfDownloadFilename: ISSUE_NO1_PDF_FILENAME,
    intro: [
      "Questo numero è il primo capitolo stampato del nostro metodo 同中求異: partiamo da una stessa domanda umana — chi siamo insieme, a un anno che finisce e uno che comincia — e osserviamo come culture diverse la rispondono.",
      "Non è un dossier di notizie: è una soglia. Il Capodanno lunare ci serve come cornice per parlare di continuità (brodo madre, calendario, tavola condivisa), di gesti (Weiya, calligrafia, dolci portafortuna) e di lessico che spesso resta invisibile finché non lo nominiamo.",
    ],
    sectionPreviews: [
      {
        id: "soglia",
        rubric: "Saggio di apertura",
        title: "La soglia, non la data",
        dek: "Il Capodanno lunare come punto di passaggio: cosa significa attraversare l'anno assieme, lontani e vicini, tra Bologna e mondi che portiamo nelle stanze.",
        asideZh: "年節作為門檻",
      },
      {
        id: "brodo-madre",
        rubric: "Struttura condivisa",
        title: "Brodo madre",
        dek: "Un filo tra cucine: ciò che si ripete, si cura e si tramanda come cultura quotidiana — non ricetta unica, ma struttura comune da riconoscere.",
      },
      {
        id: "nian-gao",
        rubric: "Cibo · testo",
        title: "Nian Gao — dolce, tempo, augurio",
        dek: "Sul nian gao come oggetto editoriale: storia breve, tavola e una ricetta per portare il gesto anche in cucine che non lo hanno ereditato.",
        asideZh: "年糕：高度、黏度、祝願",
      },
      {
        id: "calligrabao-weiya",
        rubric: "Reportage",
        title: "Calligrabao · Weiya",
        dek: "Dal tavolo della festa alla calligrafia come presenza: note da un incontro tra pratica, mani e voce — cosa resta quando l'evento è finito.",
      },
      {
        id: "glossario",
        rubric: "Lessico",
        title: "Glossario minimo",
        dek: "Parole che compaiono nel numero, con contesto breve: per non lasciare il lettore solo di fronte a suoni e caratteri che già conoscete a orecchio.",
      },
    ],
    nextIssueTeaser: {
      title: "Prossimo numero — estate",
      body: "Stiamo già raccogliendo fili tra laboratorio, tavola e città: il Magazine resta trimestrale; la newsletter annuncia quando un nuovo PDF è pronto.",
    },
  },
];

export function getCurrentIssue(): MagazineIssue {
  const first = MAGAZINE_ISSUES[0];
  if (!first) {
    throw new Error("MAGAZINE_ISSUES must contain at least one issue");
  }
  return first;
}

/** Past issues only (everything after the current / featured issue). */
export function getArchivedIssues(): MagazineIssue[] {
  return MAGAZINE_ISSUES.slice(1);
}

export function formatIssueMeta(issue: MagazineIssue): string {
  return `N. ${issue.issueNumber} · ${issue.seasonLabel} ${issue.year} · ${issue.cityLine}`;
}
