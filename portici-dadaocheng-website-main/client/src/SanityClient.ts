import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'kchhwq30',
  dataset: 'production',
  /** Dev: always hit API origin (fresh publishes). Prod: CDN for performance. */
  useCdn: import.meta.env.PROD,
  apiVersion: '2024-03-01',
});
