import { useEffect } from "react";

/** Mirrors `client/index.html` defaults — restored on unmount for SPA navigation. */
export const DEFAULT_DOCUMENT_TITLE =
  "Portici DaDaocheng — Esperienze Culturali tra Oriente e Occidente";
export const DEFAULT_DOCUMENT_DESCRIPTION =
  "Portici DaDaocheng crea esperienze culturali che rivelano come le culture dell'Asia orientale rispondono alle stesse domande umane in modi sorprendentemente diversi. Workshop, articoli e spazi fisici a Bologna.";

/**
 * Updates `document.title`, `meta[name=description]`, and matching Open Graph tags.
 * Restores previous values when the component unmounts.
 */
export function useDocumentSeo(title: string, description: string) {
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
    };
  }, [title, description]);
}
