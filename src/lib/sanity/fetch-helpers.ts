import { sanityFetch } from "./fetch";
import { homePageQuery, siteConfigQuery } from "./queries";
import type { HomePage, SiteConfig } from "./types";

export async function getSiteConfig(): Promise<SiteConfig | null> {
  return sanityFetch<SiteConfig | null>({
    query: siteConfigQuery,
    tags: ["siteConfig"],
  });
}

export async function getHomePage(): Promise<HomePage | null> {
  return sanityFetch<HomePage | null>({
    query: homePageQuery,
    tags: ["homePage"],
  });
}
