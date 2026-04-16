import { useLang } from "@/contexts/LangContext";
import ContattiEN from "./ContattiEN";
import ContattiIT from "./ContattiIT";

export default function Contatti() {
  const lang = useLang();

  switch (lang) {
    case "en":
      return <ContattiEN />;
    default:
      return <ContattiIT />;
  }
}
