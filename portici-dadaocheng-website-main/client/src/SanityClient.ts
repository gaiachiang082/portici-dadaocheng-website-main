import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'kchhwq30', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-03-01', 
});
