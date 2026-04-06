import { useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import { pickDict, type I18nDict } from "./dictionaries";

/** Current locale UI strings from `dictionaries.ts` (via {@link pickDict}). */
export function useUiDict(): I18nDict {
  const lang = useLang();
  return useMemo(() => pickDict(lang), [lang]);
}
