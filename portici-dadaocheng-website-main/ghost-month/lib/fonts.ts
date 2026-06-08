import {
  Cormorant_Garamond,
  IM_Fell_English,
  Montserrat,
  Noto_Serif_TC,
} from "next/font/google";

export const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  variable: "--font-im-fell",
  weight: "400",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400"],
});

export const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  variable: "--font-noto-tc",
  weight: ["400", "500"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "300"],
});

export const fontVariables = [
  imFellEnglish.variable,
  cormorantGaramond.variable,
  notoSerifTC.variable,
  montserrat.variable,
].join(" ");
