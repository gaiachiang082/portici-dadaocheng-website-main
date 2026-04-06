import { useLang } from "@/contexts/LangContext";
import ContattiEN from "./ContattiEN";
import ContattiIT from "./ContattiIT";
import ContattiZH from "./ContattiZH";

export default function Contatti() {
  const lang = useLang();

  switch (lang) {
    case "zh":
      return <ContattiZH />;
    case "en":
      return <ContattiEN />;
    default:
      return <ContattiIT />;
  }
}
