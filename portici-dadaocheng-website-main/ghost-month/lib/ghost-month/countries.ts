export type Country = {
  code: string;
  label: string;
  x: number;
  y: number;
};

export const countries: Country[] = [
  { code: "TW", label: "Taiwan", x: 78, y: 32 },
  { code: "IT", label: "Italia", x: 25, y: 20 },
  { code: "CN", label: "Cina", x: 70, y: 25 },
  { code: "MY", label: "Malesia", x: 65, y: 48 },
  { code: "SG", label: "Singapore", x: 67, y: 52 },
  { code: "JP", label: "Giappone", x: 82, y: 22 },
  { code: "KR", label: "Corea del Sud", x: 79, y: 22 },
  { code: "HK", label: "Hong Kong", x: 74, y: 36 },
  { code: "TH", label: "Tailandia", x: 62, y: 42 },
  { code: "ID", label: "Indonesia", x: 68, y: 56 },
  { code: "FR", label: "Francia", x: 22, y: 19 },
  { code: "DE", label: "Germania", x: 26, y: 16 },
  { code: "UK", label: "Regno Unito", x: 18, y: 14 },
  { code: "US", label: "Stati Uniti", x: 5, y: 28 },
  { code: "CA", label: "Canada", x: 4, y: 18 },
  { code: "AU", label: "Australia", x: 75, y: 68 },
  { code: "BR", label: "Brasile", x: 20, y: 58 },
  { code: "OTHER", label: "Altro", x: 50, y: 40 },
];

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}
