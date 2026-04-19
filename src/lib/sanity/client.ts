import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../../../sanity/env";

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

const readToken = process.env.SANITY_API_READ_TOKEN;

export const clientWithToken: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
});
