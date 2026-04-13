import { createClient } from '@sanity/client';

const projectId =
  (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined)?.trim() || 'kchhwq30';
const dataset =
  (import.meta.env.VITE_SANITY_DATASET as string | undefined)?.trim() || 'production';

export const client = createClient({
  projectId,
  dataset,
  /** Always hit API origin (no CDN cache). */
  useCdn: false,
  apiVersion: '2023-05-03',
});
