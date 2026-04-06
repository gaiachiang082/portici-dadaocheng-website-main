import { useLang } from "@/contexts/LangContext";
import HomeEN from "./HomeEN";
import HomeIT from "./HomeIT";
import HomeZH from "./HomeZH";

export default function Home() {
  const lang = useLang();

  switch (lang) {
    case "zh":
      return <HomeZH />;
    case "en":
      return <HomeEN />;
    default:
      return <HomeIT />;
  }
}
