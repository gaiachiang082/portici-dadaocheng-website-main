/**
 * GROQ for `article` documents (field-level i18n: `title` localeString, `content_it` / `content_en`, etc.).
 * No document-level `language` filter — lists are `*[_type == "article"]`.
 * Projections use `$lang`: always pass `fetch(..., { lang: 'it' | 'zh' | 'en', ... })`.
 * `content_zh` is optional in the schema; coalesce keeps zh usable before the field exists.
 */

const localizedTitle = `
  "title": coalesce(
    select(
      $lang == "it" => title.it,
      $lang == "en" => title.en,
      $lang == "zh" => title.zh
    ),
    title.it,
    title.en,
    title.zh
  )
`;

const localizedBody = `
  "body": select(
    $lang == "en" => content_en,
    $lang == "zh" => coalesce(content_zh, content_it),
    content_it
  )
`;

const localizedExcerptPt = `
  "excerpt": pt::text(select(
    $lang == "en" => content_en,
    $lang == "zh" => coalesce(content_zh, content_it),
    content_it
  ))
`;

export const ARTICLES_LIST_QUERY = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  ${localizedTitle},
  category,
  mainImage { asset->{ url } },
  ${localizedExcerptPt}
}`;

export const ARTICLES_LATEST_THREE_QUERY = `*[_type == "article"] | order(_createdAt desc) [0...3] {
  _id,
  "slug": slug.current,
  ${localizedTitle},
  category,
  mainImage { asset->{ url } },
  ${localizedExcerptPt}
}`;

/** Magazine page grid: field-localized title via `$lang` + CMS-only fields (`excerpt`, `readTime`, …). */
export const MAGAZINE_ARTICLES_QUERY = `*[_type == "article"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  _createdAt,
  category,
  ${localizedTitle},
  excerpt,
  readTime,
  color,
  mainImage {
    asset->{ url }
  }
}`;

const articleDetailProjection = `
  _id,
  "slug": slug.current,
  ${localizedTitle},
  ${localizedExcerptPt},
  ${localizedBody},
  category,
  mainImage { asset->{ url } }
`;

/**
 * Detail document: `slug.current` or `_id` only — no `language` / document-locale filter (field-level i18n).
 * `lower()` branch covers Studio slugs that differ only by case from the URL segment.
 */
export const ARTICLE_DETAIL_QUERY = `*[_type == "article" && (
  slug.current == $slug ||
  _id == $slug ||
  (defined(slug.current) && lower(slug.current) == lower($slug))
)][0]{
  ${articleDetailProjection}
}`;

/** Same body as detail query, keyed by document `_id` (used after slug-resolve fallback). */
export const ARTICLE_DETAIL_BY_ID_QUERY = `*[_type == "article" && _id == $id][0]{
  ${articleDetailProjection}
}`;

/** Lightweight index to match URL segments to a document when `slug.current` is empty. */
export const ARTICLE_SLUG_RESOLVE_INDEX = `*[_type == "article"]{
  _id,
  "slug": slug.current,
  "it": title.it,
  "en": title.en,
  "zh": title.zh
}`;
