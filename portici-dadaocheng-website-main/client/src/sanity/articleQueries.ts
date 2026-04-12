/**
 * GROQ for `article` documents. All queries expect `fetch(..., { lang: 'it' | 'zh' | 'en', ... })`.
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

export const ARTICLES_LIST_QUERY = `*[_type == "article" && language == $lang] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  ${localizedTitle},
  category,
  mainImage { asset->{ url } },
  ${localizedExcerptPt}
}`;

export const ARTICLES_LATEST_THREE_QUERY = `*[_type == "article" && language == $lang] | order(_createdAt desc) [0...3] {
  _id,
  "slug": slug.current,
  ${localizedTitle},
  category,
  mainImage { asset->{ url } },
  ${localizedExcerptPt}
}`;

/** Magazine page grid: same language filter + CMS fields. */
export const MAGAZINE_ARTICLES_QUERY = `*[_type == "article" && language == $lang] | order(_createdAt desc) {
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

/** Resolve by `slug.current` (SEO URL); fall back to `_id` for legacy bookmarks. */
export const ARTICLE_DETAIL_QUERY = `*[_type == "article" && language == $lang && (slug.current == $slug || _id == $slug)][0]{
  _id,
  "slug": slug.current,
  ${localizedTitle},
  ${localizedExcerptPt},
  ${localizedBody},
  category,
  mainImage { asset->{ url } }
}`;
