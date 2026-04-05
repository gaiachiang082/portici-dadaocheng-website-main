import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "wouter";

export const SUPPORTED_LANGS = ["it", "zh", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function isLang(value: string | undefined): value is Lang {
  return value === "it" || value === "zh" || value === "en";
}

/**
 * Split `/it/foo` → { lang: 'it', suffix: '/foo' }; `/it` → { lang: 'it', suffix: '' }.
 * Non-localized paths (e.g. `/admin`) → { lang: null, suffix: pathname }.
 */
export function parseLocalizedPath(pathname: string): { lang: Lang | null; suffix: string } {
  const m = pathname.match(/^\/(it|zh|en)(\/.*)?$/);
  if (!m || !isLang(m[1])) return { lang: null, suffix: pathname };
  return { lang: m[1], suffix: m[2] ?? "" };
}

/** Build localized URL when switching language while keeping the path after the lang segment. */
export function switchLangInPath(currentPathname: string, newLang: Lang): string {
  const { lang, suffix } = parseLocalizedPath(currentPathname);
  if (lang) {
    if (suffix === "" || suffix === "/") return `/${newLang}`;
    return `/${newLang}${suffix}`;
  }
  return `/${newLang}`;
}

const LangContext = createContext<Lang>("it");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

/** Derives `lang` from the browser path (`/it/...`); defaults to `it` for `/admin`, `/booking/success`, etc. */
export function LangProviderFromLocation({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const { lang } = parseLocalizedPath(path);
  return <LangProvider lang={lang ?? "it"}>{children}</LangProvider>;
}

/** Prefix a site path with the current locale: `/magazine` → `/it/magazine`. */
export function useLocalizedHref(): (path: string) => string {
  const lang = useLang();
  return (path: string) => {
    if (!path || path === "/") return `/${lang}`;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `/${lang}${normalized}`;
  };
}
