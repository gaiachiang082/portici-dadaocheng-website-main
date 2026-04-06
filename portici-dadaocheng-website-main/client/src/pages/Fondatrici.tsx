import { useLang } from "@/contexts/LangContext";
import FondatriciEN from "./FondatriciEN";
import FondatriciIT from "./FondatriciIT";
import FondatriciZH from "./FondatriciZH";

export default function Fondatrici() {
  const lang = useLang();

  switch (lang) {
    case "zh":
      return <FondatriciZH />;
    case "en":
      return <FondatriciEN />;
    default:
      return <FondatriciIT />;
  }
}
