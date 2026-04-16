import { useLang } from "@/contexts/LangContext";
import FondatriciEN from "./FondatriciEN";
import FondatriciIT from "./FondatriciIT";

export default function Fondatrici() {
  const lang = useLang();

  switch (lang) {
    case "en":
      return <FondatriciEN />;
    default:
      return <FondatriciIT />;
  }
}
