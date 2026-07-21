import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";

import { client, clientWithToken } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  draft,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  draft?: boolean;
}): Promise<T> {
  const isDraft = draft ?? (await draftMode()).isEnabled;

  if (isDraft && !process.env.SANITY_API_READ_TOKEN) {
    console.error(
      "[sanityFetch] Draft mode is on but SANITY_API_READ_TOKEN is not set.",
    );
  }

  const sanityClient = isDraft ? clientWithToken : client;

  try {
    if (isDraft) {
      return await sanityClient.fetch<T>(query, params, {
        perspective: "previewDrafts",
        useCdn: false,
        cache: "no-store",
      });
    }

    // Dev: always hit Sanity so Studio publishes show up immediately.
    // Prod: tag cache + 60s fallback until /api/revalidate webhook is configured.
    if (process.env.NODE_ENV === "development") {
      return await sanityClient.fetch<T>(query, params, {
        perspective: "published",
        cache: "no-store",
      });
    }

    return await sanityClient.fetch<T>(query, params, {
      perspective: "published",
      // Avoid Sanity API CDN lag after publishes; Next.js Data Cache still applies.
      useCdn: false,
      cache: "force-cache",
      next: { tags, revalidate: 60 },
    });
  } catch (error) {
    console.error("[sanityFetch]", error);
    throw error;
  }
}
