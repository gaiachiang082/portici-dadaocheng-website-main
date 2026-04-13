import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'kchhwq30',
  dataset: 'production',
  /** Always hit API origin (no CDN cache) — fresh reads from Content Lake in dev and prod. */
  useCdn: false,
  apiVersion: '2023-05-03',
});
