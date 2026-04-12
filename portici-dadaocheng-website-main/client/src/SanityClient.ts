import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'kchhwq30',
  dataset: 'production',
  // false: bypass CDN so newly published docs appear immediately while debugging
  useCdn: false,
  apiVersion: '2024-03-01',
});
