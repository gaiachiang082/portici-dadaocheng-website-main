/** Absolute public URL for ghost-month static assets (Express mount + Next basePath). */
export function ghostMonthAsset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/ghost-month${normalized}`;
}
