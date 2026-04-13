import type { Lang } from "@/contexts/LangContext";
import {
  ARTICLE_DETAIL_BY_ID_QUERY,
  ARTICLE_DETAIL_QUERY,
  ARTICLE_SLUG_RESOLVE_INDEX,
} from "@/sanity/articleQueries";
import { slugifyForArticlePath } from "@/sanity/articlePath";
import { client } from "@/SanityClient";

export interface ArticleIndexRow {
  _id: string;
  slug: string | null;
  it?: string | null;
  en?: string | null;
  zh?: string | null;
}

/** Decode path segment (`%20`, `+`, Unicode escapes) without throwing on malformed sequences. */
export function decodeArticleSlugParam(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  try {
    return decodeURIComponent(t.replace(/\+/g, " "));
  } catch {
    return t;
  }
}

/** Strip `drafts.` so pasted draft URLs still resolve to the published id. */
export function normalizeArticleRouteParam(raw: string): string {
  const s = decodeArticleSlugParam(raw);
  return s.startsWith("drafts.") ? s.slice(7) : s;
}

export async function fetchArticleDetail<T>(
  slugParam: string,
  lang: Lang,
): Promise<T | null> {
  const key = normalizeArticleRouteParam(slugParam);

  const direct = await client.fetch<T | null>(ARTICLE_DETAIL_QUERY, {
    slug: key,
    lang,
  });
  if (direct) return direct;

  if (import.meta.env.DEV) {
    console.warn(
      `[ArticoloDetail] No article found in GROQ with slug "${key}" or id "${key}" (direct query). Trying title-slug fallback…`,
    );
  }

  const index = await client.fetch<ArticleIndexRow[]>(ARTICLE_SLUG_RESOLVE_INDEX);
  const row = index.find((r) => {
    if (r.slug && r.slug.toLowerCase() === key.toLowerCase()) return true;
    const titles = [r.it, r.en, r.zh];
    return titles.some((t) => slugifyForArticlePath(t) === slugifyForArticlePath(key));
  });
  if (!row) {
    if (import.meta.env.DEV) {
      console.warn(`[ArticoloDetail] Fallback slug resolution failed for "${key}"`);
    }
    return null;
  }

  return client.fetch<T | null>(ARTICLE_DETAIL_BY_ID_QUERY, {
    id: row._id,
    lang,
  });
}
