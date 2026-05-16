import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '7898q55i',
  dataset: 'production',
  useCdn: false, // disabled for real-time updates during editing
  apiVersion: '2024-05-09',
});

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
