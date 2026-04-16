import { useLang } from "@/contexts/LangContext";
import HomeEN from "./HomeEN";
import HomeIT from "./HomeIT";

export default function Home() {
  const lang = useLang();

  switch (lang) {
    case "en":
      return <HomeEN />;
    default:
      return <HomeIT />;
  }
}
