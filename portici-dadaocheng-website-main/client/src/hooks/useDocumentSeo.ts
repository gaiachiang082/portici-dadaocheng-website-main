import { useEffect } from "react";
import { wouterHrefToPublicPath } from "@/contexts/LangContext";

/** Mirrors `client/index.html` defaults — restored on unmount for SPA navigation. */
export const DEFAULT_DOCUMENT_TITLE =
  "Portici DaDaocheng — Esperienze Culturali tra Oriente e Occidente";
export const DEFAULT_DOCUMENT_DESCRIPTION =
  "Portici DaDaocheng crea esperienze culturali che rivelano come le culture dell'Asia orientale rispondono alle stesse domande umane in modi sorprendentemente diversi. Workshop, articoli e spazi fisici a Bologna.";

const CANONICAL_ID = "seo-canonical-link";

function resolveCanonicalHref(canonicalPath: string | undefined): string | null {
  if (typeof window === "undefined") return null;
  const origin = window.location.origin;
  const raw =
    (canonicalPath && canonicalPath.length > 0 ? canonicalPath : window.location.pathname) || "/";
  const path = wouterHrefToPublicPath(raw);
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/**
 * Updates `document.title`, `meta[name=description]`, Open Graph tags, and `<link rel="canonical">`.
 * Pass `canonicalPath` as the pathname including locale (e.g. `/it/magazine`); omit to use `window.location.pathname`.
 * Restores previous values when the component unmounts.
 */
export function useDocumentSeo(
  title: string,
  description: string,
  canonicalPath?: string | null
) {
  useEffect(() => {
    const prevTitle = document.title;
    const descNode = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = descNode?.getAttribute("content") ?? "";

    const ogTitleNode = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const prevOgTitle = ogTitleNode?.getAttribute("content") ?? "";

    const ogDescNode = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevOgDescription = ogDescNode?.getAttribute("content") ?? "";

    document.title = title;
    if (descNode) descNode.setAttribute("content", description);
    if (ogTitleNode) ogTitleNode.setAttribute("content", title);
    if (ogDescNode) ogDescNode.setAttribute("content", description);

    const canonicalHref = resolveCanonicalHref(canonicalPath ?? undefined);
    let canonicalEl = document.getElementById(CANONICAL_ID) as HTMLLinkElement | null;
    const prevCanonicalHref = canonicalEl?.getAttribute("href") ?? null;

    if (canonicalHref) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.id = CANONICAL_ID;
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonicalHref);
    }

    return () => {
      document.title = prevTitle || DEFAULT_DOCUMENT_TITLE;
      if (descNode) descNode.setAttribute("content", prevDescription || DEFAULT_DOCUMENT_DESCRIPTION);
      if (ogTitleNode) ogTitleNode.setAttribute("content", prevOgTitle || "Portici DaDaocheng");
      if (ogDescNode) {
        ogDescNode.setAttribute(
          "content",
          prevOgDescription ||
            "Dove culture diverse interpretano la stessa cosa in modi sorprendentemente diversi."
        );
      }
      const el = document.getElementById(CANONICAL_ID) as HTMLLinkElement | null;
      if (el) {
        if (prevCanonicalHref) el.setAttribute("href", prevCanonicalHref);
        else el.remove();
      }
    };
  }, [title, description, canonicalPath]);
}
