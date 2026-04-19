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

    return await sanityClient.fetch<T>(query, params, {
      perspective: "published",
      cache: "force-cache",
      next: { tags, revalidate: false },
    });
  } catch (error) {
    console.error("[sanityFetch]", error);
    throw error;
  }
}
