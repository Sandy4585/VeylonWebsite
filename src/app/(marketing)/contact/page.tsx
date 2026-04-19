import type { Metadata } from "next";
import { cache } from "react";

import { ContactChannels } from "@/components/veylon/contact/contact-channels";
import { ContactForm } from "@/components/veylon/contact/contact-form";
import { ContactHero } from "@/components/veylon/contact/contact-hero";
import { ContactOffice } from "@/components/veylon/contact/contact-office";
import { resolveContactChannels } from "@/lib/contact/resolve-channels";
import { sanityFetch } from "@/lib/sanity/fetch";
import { getSiteConfig } from "@/lib/sanity/fetch-helpers";
import { urlFor } from "@/lib/sanity/image";
import { contactPageQuery } from "@/lib/sanity/queries";
import type { ContactPage, RichImage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const loadContactPage = cache(async () =>
  sanityFetch<ContactPage | null>({ query: contactPageQuery, tags: ["contactPage"] }),
);

const loadSiteConfig = cache(async () => getSiteConfig());

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await loadContactPage();
  const seo = contactPage?.seo;
  const title = seo?.metaTitle?.trim() || "Contact Veylon Energy";
  const description = seo?.metaDescription?.trim();
  const og = ogImageUrl(seo?.ogImage);

  const base = createMetadata({
    title,
    description,
    path: "/contact",
    ogImage: og,
  });

  return {
    ...base,
    ...(seo?.canonicalUrl ? { alternates: { canonical: seo.canonicalUrl } } : {}),
    ...(seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ContactPageRoute() {
  const [contactPage, siteConfig] = await Promise.all([loadContactPage(), loadSiteConfig()]);

  if (!contactPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-slate-50 px-6 py-24">
        <p className="text-center text-slate-600">Page not yet configured</p>
      </div>
    );
  }

  const channels = resolveContactChannels(contactPage, siteConfig);

  return (
    <>
      <ContactHero data={contactPage.hero} />
      <ContactChannels channels={channels} />
      <ContactForm departmentOptions={contactPage.formConfig.departmentOptions ?? []} />
      <ContactOffice
        officeAddress={contactPage.officeAddress}
        mapEmbedUrl={contactPage.mapEmbedUrl}
      />
    </>
  );
}
