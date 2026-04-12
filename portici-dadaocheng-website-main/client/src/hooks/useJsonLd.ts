import { useEffect } from "react";

/** Injects a JSON-LD script into `document.head`; removes it on unmount or when `json` changes. Pass `null` to skip. */
export function useJsonLd(
  scriptId: string,
  json: Record<string, unknown> | Record<string, unknown>[] | null
) {
  const serialized = json == null ? "" : JSON.stringify(json);

  useEffect(() => {
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (json == null) return;

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = scriptId;
    el.textContent = serialized;
    document.head.appendChild(el);

    return () => {
      el.remove();
    };
  }, [scriptId, serialized, json]);
}
