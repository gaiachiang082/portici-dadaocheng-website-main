/**
 * URL segment for `/articoli/:segment` (and `/magazine/:segment`).
 * Mirrors Sanity slug behaviour enough to match titles when `slug.current` is still empty in the CMS.
 */
export function slugifyForArticlePath(input: string | undefined | null): string {
  if (!input || typeof input !== "string") return "";
  const ascii = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return ascii
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function articlePathSegment(article: {
  _id: string;
  slug?: string | null;
  title?: string | null;
}): string {
  const fromSlug = typeof article.slug === "string" ? article.slug.trim() : "";
  if (fromSlug.length > 0) return fromSlug;
  const fromTitle = slugifyForArticlePath(article.title);
  if (fromTitle.length > 0) return fromTitle;
  return article._id;
}
