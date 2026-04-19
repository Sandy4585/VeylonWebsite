import type { Metadata } from "next";
import { cache } from "react";

import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { CalculatorEmbed } from "@/components/veylon/hub/calculator-embed";
import { ComponentPartners } from "@/components/veylon/hub/component-partners";
import { HowItWorks } from "@/components/veylon/hub/how-it-works";
import { HubFaqs } from "@/components/veylon/hub/hub-faqs";
import { HubFeaturedProjects } from "@/components/veylon/hub/hub-featured-projects";
import { HubHero } from "@/components/veylon/hub/hub-hero";
import { ValueProps } from "@/components/veylon/hub/value-props";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { commercialHubQuery } from "@/lib/sanity/queries";
import type { CommercialHub, RichImage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const loadCommercialHub = cache(async () =>
  sanityFetch<CommercialHub | null>({
    query: commercialHubQuery,
    tags: ["commercial-hub"],
  }),
);

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadCommercialHub();
  const seo = data?.seo;
  const title = seo?.metaTitle?.trim() || "Commercial solar | Veylon Energy";
  const description = seo?.metaDescription?.trim();
  const og = ogImageUrl(seo?.ogImage);

  const base = createMetadata({
    title,
    description,
    path: "/commercial",
    ogImage: og,
  });

  return {
    ...base,
    ...(seo?.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CommercialPage() {
  const data = await loadCommercialHub();

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-24">
        <p className="text-center text-slate-600">Page not yet configured</p>
      </div>
    );
  }

  const heroUsesBackground = Boolean(data.hero.backgroundImage);

  return (
    <>
      <HubHero data={data.hero} priority={heroUsesBackground} />
      <ValueProps items={data.valueProps} segment="commercial" />
      <HowItWorks steps={data.howItWorks} />
      <CalculatorEmbed data={data.calculatorEmbed} segment="commercial" />
      <ComponentPartners partners={data.componentPartners} />
      <HubFeaturedProjects projects={data.featuredProjects} segment="commercial" />
      <HubFaqs faqs={data.faqs} segment="commercial" />
      <ClosingCta data={data.closingCta} />
    </>
  );
}
