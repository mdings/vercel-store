import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: process.env.NODE_ENV != "development",
  apiVersion: process.env.SANITY_API_VERSION,
});

// Get a pre-configured url-builder from your sanity client
export const imageBuilder = imageUrlBuilder(client);

export default client;
