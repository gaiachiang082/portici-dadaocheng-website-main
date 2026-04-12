import { useEffect } from "react";

/** Injects a JSON-LD script into `document.head`; removes it on unmount or when `json` changes. */
export function useJsonLd(scriptId: string, json: Record<string, unknown> | Record<string, unknown>[]) {
  const serialized = JSON.stringify(json);

  useEffect(() => {
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = scriptId;
    el.textContent = serialized;
    document.head.appendChild(el);

    return () => {
      el.remove();
    };
  }, [scriptId, serialized]);
}
