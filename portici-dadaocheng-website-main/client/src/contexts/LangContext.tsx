import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useLocation } from "wouter";

export const SUPPORTED_LANGS = ["it", "zh", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function isLang(value: string | undefined): value is Lang {
  return value === "it" || value === "zh" || value === "en";
}

const LANG_SEGMENT = new Set<string>(SUPPORTED_LANGS);

/** Remove one or more leading `/it|zh|en` segments so we never produce `/it/it/...`. Preserves `?query`. */
export function stripLocalePathPrefixes(path: string): string {
  const raw = path.trim();
  if (!raw || raw === "/") return "/";
  const qIndex = raw.indexOf("?");
  const pathPart = qIndex >= 0 ? raw.slice(0, qIndex) : raw;
  const searchPart = qIndex >= 0 ? raw.slice(qIndex) : "";
  const normalized = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const segments = normalized.split("/").filter(Boolean);
  while (segments.length > 0 && LANG_SEGMENT.has(segments[0])) {
    segments.shift();
  }
  if (segments.length === 0) return searchPart ? `/${searchPart}` : "/";
  if (searchPart) return `/${segments.join("/")}${searchPart}`;
  return `/${segments.join("/")}`;
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

/**
 * Prefix with current locale: `/magazine` → `/it/magazine`.
 * Strips any leading `it|zh|en` segments first so `/it/articoli` or `it/articoli` never becomes `/it/it/articoli`.
 */
export function useLocalizedHref(): (path: string) => string {
  const lang = useLang();
  return useCallback((path: string) => {
    if (!path || path === "/") return `/${lang}`;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const sitePath = stripLocalePathPrefixes(normalized);
    if (sitePath === "/" || sitePath === "") return `/${lang}`;
    return `/${lang}${sitePath}`;
  }, [lang]);
}
