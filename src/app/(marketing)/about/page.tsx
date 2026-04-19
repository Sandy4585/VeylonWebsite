import type { Metadata } from "next";
import { cache } from "react";

import { AboutHero } from "@/components/veylon/about/about-hero";
import { CompanyStatement } from "@/components/veylon/about/company-statement";
import { FounderStory } from "@/components/veylon/about/founder-story";
import { Milestones } from "@/components/veylon/about/milestones";
import { Principles } from "@/components/veylon/about/principles";
import { Team } from "@/components/veylon/about/team";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { aboutPageQuery } from "@/lib/sanity/queries";
import type { AboutPage, RichImage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const loadAboutPage = cache(async () =>
  sanityFetch<AboutPage | null>({ query: aboutPageQuery, tags: ["aboutPage"] }),
);

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await loadAboutPage();
  const seo = aboutPage?.seo;
  const title = seo?.metaTitle?.trim() || "About Veylon Energy";
  const description = seo?.metaDescription?.trim();
  const og = ogImageUrl(seo?.ogImage);

  const base = createMetadata({
    title,
    description,
    path: "/about",
    ogImage: og,
  });

  return {
    ...base,
    ...(seo?.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function AboutPageRoute() {
  const aboutPage = await loadAboutPage();

  if (!aboutPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-24">
        <p className="text-center text-slate-600">Page not yet configured</p>
      </div>
    );
  }

  return (
    <>
      <AboutHero data={aboutPage.hero} />
      <FounderStory founderStory={aboutPage.founderStory} />
      <CompanyStatement companyStatement={aboutPage.companyStatement} />
      <Principles principles={aboutPage.missionPrinciples ?? []} />
      <Team team={aboutPage.team ?? []} />
      <Milestones milestones={aboutPage.milestones ?? []} />
      <ClosingCta data={aboutPage.closingCta} />
    </>
  );
}
