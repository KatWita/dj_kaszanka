import { createClient } from "@sanity/client";

// Public, read-only access to the published content (no token needed).
// Project ID / dataset can be overridden with VITE_SANITY_* env vars.
export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "ilsbdrk7",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: "2026-10-01",
  useCdn: true,
});
