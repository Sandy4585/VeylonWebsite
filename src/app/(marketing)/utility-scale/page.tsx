import type { Metadata } from "next";
import { cache } from "react";

import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { Capabilities } from "@/components/veylon/utility/capabilities";
import { Credentials } from "@/components/veylon/utility/credentials";
import { UtilityContact } from "@/components/veylon/utility/utility-contact";
import { UtilityHero } from "@/components/veylon/utility/utility-hero";
import { sanityFetch } from "@/lib/sanity/fetch";
import { getSiteConfig } from "@/lib/sanity/fetch-helpers";
import { urlFor } from "@/lib/sanity/image";
import { utilityScalePageQuery } from "@/lib/sanity/queries";
import type { RichImage, UtilityScalePage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const loadUtilityScalePage = cache(async () =>
  sanityFetch<UtilityScalePage | null>({
    query: utilityScalePageQuery,
    tags: ["utility-scale-page"],
  }),
);

const loadSiteConfig = cache(async () => getSiteConfig());

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadUtilityScalePage();
  const seo = data?.seo;
  const title = seo?.metaTitle?.trim() || "Utility-scale solar | Veylon Energy";
  const description = seo?.metaDescription?.trim();
  const og = ogImageUrl(seo?.ogImage);

  const base = createMetadata({
    title,
    description,
    path: "/utility-scale",
    ogImage: og,
  });

  return {
    ...base,
    ...(seo?.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function UtilityScalePageRoute() {
  const [data, siteConfig] = await Promise.all([loadUtilityScalePage(), loadSiteConfig()]);

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-24">
        <p className="text-center text-slate-600">Page not yet configured</p>
      </div>
    );
  }

  const heroUsesBackground = Boolean(data.hero.backgroundImage);
  const contactEmail = siteConfig?.contactEmail ?? "";

  return (
    <>
      <UtilityHero data={data.hero} priority={heroUsesBackground} />
      <Capabilities capabilities={data.capabilities} />
      <Credentials credentials={data.credentials} />
      <UtilityContact contactForm={data.contactForm} contactEmail={contactEmail} />
      <ClosingCta data={data.closingCta} />
    </>
  );
}
