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

/**
 * Slug as it should appear in the URL / React state (decoded, drafts stripped), **without** forcing lowercase.
 */
export function normalizeArticleRouteParam(raw: string): string {
  const s = decodeArticleSlugParam(raw);
  return s.startsWith("drafts.") ? s.slice(7) : s;
}

/**
 * Value sent as GROQ `$slug`: URI 解碼 → 轉小寫 → 去頭尾空白 → 去掉 `drafts.` 前綴（對齊 Content Lake 小寫 slug / `_id`）。
 */
export function toSafeSlugForSanityLookup(raw: string): string {
  let s = decodeArticleSlugParam(raw).toLowerCase().trim();
  if (s.startsWith("drafts.")) s = s.slice(7);
  return s;
}

export async function fetchArticleDetail<T>(
  slugParam: string,
  lang: Lang,
): Promise<T | null> {
  const safeSlug = toSafeSlugForSanityLookup(slugParam);

  console.log("🔥 送給 Sanity 的最終 slug:", safeSlug);
  console.log("Sanity Config:", client.config());

  const direct = await client.fetch<T | null>(ARTICLE_DETAIL_QUERY, {
    slug: safeSlug,
    lang,
  });
  if (direct) return direct;

  if (import.meta.env.DEV) {
    console.warn(
      `[ArticoloDetail] No article found in GROQ with slug "${safeSlug}" or id "${safeSlug}" (direct query). Trying title-slug fallback…`,
    );
  }

  const index = await client.fetch<ArticleIndexRow[]>(ARTICLE_SLUG_RESOLVE_INDEX);
  const row = index.find((r) => {
    if (r.slug && r.slug.toLowerCase() === safeSlug) return true;
    const titles = [r.it, r.en, r.zh];
    return titles.some((t) => slugifyForArticlePath(t) === slugifyForArticlePath(safeSlug));
  });
  if (!row) {
    if (import.meta.env.DEV) {
      console.warn(`[ArticoloDetail] Fallback slug resolution failed for "${safeSlug}"`);
    }
    return null;
  }

  return client.fetch<T | null>(ARTICLE_DETAIL_BY_ID_QUERY, {
    id: row._id,
    lang,
  });
}
