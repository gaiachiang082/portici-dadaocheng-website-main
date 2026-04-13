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

/** Strip `drafts.` so pasted draft URLs still resolve to the published id. */
export function normalizeArticleRouteParam(raw: string): string {
  const s = decodeURIComponent(raw).trim();
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

  const index = await client.fetch<ArticleIndexRow[]>(ARTICLE_SLUG_RESOLVE_INDEX);
  const row = index.find((r) => {
    const titles = [r.it, r.en, r.zh];
    return titles.some((t) => slugifyForArticlePath(t) === key);
  });
  if (!row) return null;

  return client.fetch<T | null>(ARTICLE_DETAIL_BY_ID_QUERY, {
    id: row._id,
    lang,
  });
}
