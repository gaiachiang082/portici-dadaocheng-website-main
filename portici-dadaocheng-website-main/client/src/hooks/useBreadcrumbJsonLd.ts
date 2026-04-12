import { useMemo } from "react";
import { useJsonLd } from "@/hooks/useJsonLd";

export type BreadcrumbCrumb = { name: string; path: string };

/**
 * Emits schema.org BreadcrumbList with absolute `item` URLs (`origin` + localized path).
 * `path` is a site suffix like `/` or `/glossario/zhengzong` (passed through `localizedHref`).
 */
export function useBreadcrumbJsonLd(
  scriptId: string,
  crumbs: readonly BreadcrumbCrumb[],
  localizedHref: (path: string) => string
) {
  const json = useMemo(() => {
    if (crumbs.length === 0) return null;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const itemListElement = crumbs.map((c, i) => {
      const localizedPath = localizedHref(c.path);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: origin ? `${origin}${localizedPath}` : localizedPath,
      };
    });
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement,
    };
  }, [crumbs, localizedHref]);

  useJsonLd(scriptId, json);
}
