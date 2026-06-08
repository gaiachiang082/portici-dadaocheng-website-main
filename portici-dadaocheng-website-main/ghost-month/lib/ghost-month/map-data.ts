export type MigrationPoint = {
  id: string;
  label: string;
  labelIt: string;
  x: number;
  y: number;
  description: string;
  quote: string | null;
  ritual: string | null;
};

export type MigrationRoute = {
  from: string;
  to: string;
};

/** SVG placement of the migration-map.jpg background inside viewBox 0 0 100 80 */
export const MAP_IMAGE_BOUNDS = { x: 8, y: 2, width: 88, height: 74 };

/** Normalized position (0–1) on the map artwork → SVG coordinates */
export function mapImageToSvg(nx: number, ny: number): { x: number; y: number } {
  return {
    x: MAP_IMAGE_BOUNDS.x + nx * MAP_IMAGE_BOUNDS.width,
    y: MAP_IMAGE_BOUNDS.y + ny * MAP_IMAGE_BOUNDS.height,
  };
}

const q = mapImageToSvg(0.52, 0.35);
const tw = mapImageToSvg(0.68, 0.41);
const pg = mapImageToSvg(0.36, 0.65);
const sg = mapImageToSvg(0.38, 0.77);

export const migrationPoints: MigrationPoint[] = [
  {
    id: "quanzhou",
    label: "泉州 Quanzhou",
    labelIt: "Quanzhou",
    x: q.x,
    y: q.y,
    description:
      "Qui è cominciato tutto. Dal Fujian, migliaia di Hoklo partirono verso est e verso sud — portando con sé la lingua, i riti, e la paura di morire lontano da casa.",
    quote: null,
    ritual: null,
  },
  {
    id: "taiwan",
    label: "台灣 Taiwan",
    labelIt: "Taiwan",
    x: tw.x,
    y: tw.y,
    description:
      "Il Qianggu di Hengchun, le lanterne sull'acqua di Keelung, la barca del re bruciata a Donggang. Forme cresciute solo qui — nate dall'emergenza, non dalla devozione.",
    quote:
      "Il mese dei fantasmi più vivace non si trova nel luogo d'origine, ma dopo averlo lasciato.",
    ritual: "搶孤 · 放水燈 · 燒王船",
  },
  {
    id: "penang",
    label: "檳城 Penang",
    labelIt: "Penang, Malesia",
    x: pg.x,
    y: pg.y,
    description:
      "A Bukit Mertajam, ogni anno viene costruita un'effigie del re dei fantasmi alta quasi nove metri. L'ultima notte del mese, davanti a migliaia di persone, brucia.",
    quote: "Un fiore che ha aperto molte foglie.",
    ritual: "慶讚中元盂蘭勝會",
  },
  {
    id: "singapore",
    label: "新加坡 Singapore",
    labelIt: "Singapore",
    x: sg.x,
    y: sg.y,
    description:
      "I comitati di quartiere ingaggiano cantanti e orchestre. La prima fila — quella centrale, sotto i riflettori — resta sempre vuota, con banconote votive sulle sedie: è il posto riservato ai fratelli buoni.",
    quote: "Per quanto affollato, nessun vivo si siede lì.",
    ritual: "普渡 · getai",
  },
];

export const migrationRoutes: MigrationRoute[] = [
  { from: "quanzhou", to: "taiwan" },
  { from: "quanzhou", to: "penang" },
  { from: "penang", to: "singapore" },
];

export function getPointById(id: string): MigrationPoint | undefined {
  return migrationPoints.find((p) => p.id === id);
}

export function routePath(fromId: string, toId: string): string {
  const from = getPointById(fromId);
  const to = getPointById(toId);
  if (!from || !to) return "";

  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 4;

  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}
