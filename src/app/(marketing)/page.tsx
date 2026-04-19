import type { Metadata } from "next";
import { cache } from "react";

import { CalculatorTeaserSection } from "@/components/veylon/home/calculator-teaser";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { FeaturedProjects } from "@/components/veylon/home/featured-projects";
import { FeaturedResources } from "@/components/veylon/home/featured-resources";
import { Hero } from "@/components/veylon/home/hero";
import { SegmentCards } from "@/components/veylon/home/segment-cards";
import { TestimonialsStrip } from "@/components/veylon/home/testimonials-strip";
import { TrustSignalsBar } from "@/components/veylon/home/trust-signals-bar";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { homePageQuery } from "@/lib/sanity/queries";
import type { HomePage, RichImage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const loadHomePage = cache(async () =>
  sanityFetch<HomePage | null>({ query: homePageQuery, tags: ["homePage"] }),
);

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateMetadata(): Promise<Metadata> {
  const homePage = await loadHomePage();
  const seo = homePage?.seo;
  const title = seo?.metaTitle?.trim() || "Veylon Energy";
  const description = seo?.metaDescription?.trim();
  const og = ogImageUrl(seo?.ogImage);

  const base = createMetadata({
    title,
    description,
    path: "/",
    ogImage: og,
  });

  return {
    ...base,
    ...(seo?.canonicalUrl
      ? { alternates: { canonical: seo.canonicalUrl } }
      : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function HomePage() {
  const homePage = await loadHomePage();

  if (!homePage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-24">
        <p className="text-center text-slate-600">Home page content not yet configured</p>
      </div>
    );
  }

  const heroUsesBackground = Boolean(homePage.hero.backgroundImage);
  const firstImagePriority = heroUsesBackground;

  return (
    <>
      <Hero data={homePage.hero} priority={firstImagePriority} />
      <SegmentCards
        cards={homePage.segmentCards ?? []}
        firstImagePriority={!heroUsesBackground}
      />
      <TrustSignalsBar signals={homePage.trustSignals} />
      <CalculatorTeaserSection data={homePage.calculatorTeaser} />
      <FeaturedProjects projects={homePage.featuredProjects} />
      <TestimonialsStrip testimonials={homePage.testimonials} />
      <FeaturedResources resources={homePage.featuredResources} />
      <ClosingCta data={homePage.closingCta} />
    </>
  );
}
