import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Container } from "@/components/veylon/container";
import {
  FeaturedResourceCard,
  resourceTypeLabel,
} from "@/components/veylon/featured-resource-card";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { PortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import { Eyebrow, Headline } from "@/components/veylon/typography";
import { VeylonImage } from "@/components/veylon/veylon-image";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  homePageQuery,
  resourceBySlugQuery,
  resourceRelatedQuery,
  resourceSlugsQuery,
} from "@/lib/sanity/queries";
import type { HomePage, ResourceDoc, RichImage } from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

function formatDate(dateString: string | undefined): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return fullDateFormatter.format(date);
}

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

function bodyToPlainText(resource: ResourceDoc): string {
  const blocks = (resource.body ?? []).filter(
    (block): block is PortableTextBlock => block._type === "block",
  );

  return blocks
    .map((block) =>
      (block.children ?? [])
        .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

const loadResource = cache(async (slug: string) =>
  sanityFetch<ResourceDoc | null>({
    query: resourceBySlugQuery,
    params: { slug },
    tags: [`resource:${slug}`],
  }),
);

type ResourceDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: resourceSlugsQuery,
    draft: false,
    tags: ["resources"],
  });

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResourceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await loadResource(slug);

  if (!resource) {
    return {};
  }

  const title = resource.seo?.metaTitle?.trim() || resource.title;
  const description =
    resource.seo?.metaDescription?.trim() ||
    resource.excerpt?.trim() ||
    bodyToPlainText(resource) ||
    undefined;
  const og = ogImageUrl(resource.heroImage);

  const base = createMetadata({
    title,
    description,
    path: `/resources/${resource.slug.current}`,
    ogImage: og,
  });

  return {
    ...base,
    ...(resource.seo?.canonicalUrl
      ? { alternates: { canonical: resource.seo.canonicalUrl } }
      : {}),
    ...(resource.seo?.noIndex
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function ResourceDetailPage({
  params,
}: ResourceDetailProps) {
  const { slug } = await params;
  const resource = await loadResource(slug);

  if (!resource) {
    notFound();
  }

  const [relatedResources, homePage] = await Promise.all([
    sanityFetch<ResourceDoc[]>({
      query: resourceRelatedQuery,
      params: { resourceId: resource._id },
      tags: ["resources"],
    }),
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
  ]);

  const published = formatDate(resource.publishedAt);
  const authorName = resource.author?.name?.trim();
  const metaLine = [
    authorName ? `by ${authorName}` : null,
    published ? `Published ${published}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const downloadableFileUrl = resource.downloadableAsset?.file?.asset?.url;
  const authorBio = resource.author?.bioPlainText?.trim();

  return (
    <>
      <Section tone="navy" spacing="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 font-sans text-xs font-medium text-amber-700">
              {resourceTypeLabel(resource.type)}
            </span>
            <Headline level={1} className="mt-4">
              {resource.title}
            </Headline>
            {metaLine ? <p className="mt-5 text-slate-300">{metaLine}</p> : null}
          </div>
        </Container>
      </Section>

      {resource.heroImage ? (
        <Section tone="default" spacing="sm">
          <Container>
            <div className="overflow-hidden rounded-2xl">
              <VeylonImage
                image={resource.heroImage}
                className="[&_figure]:m-0 [&_figure>div]:aspect-[16/9] [&_figure>div]:rounded-none [&_figcaption]:hidden"
                sizes="(max-width: 768px) 100vw, 85vw"
              />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="default" spacing="lg">
        <Container size="md">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              <PortableText value={resource.body} variant="resource" />
            </div>
            {downloadableFileUrl ? (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <Eyebrow>{resourceTypeLabel(resource.type)}</Eyebrow>
                  {resource.downloadableAsset?.pageCount ? (
                    <p className="mt-4 text-sm text-slate-600">
                      {resource.downloadableAsset.pageCount} pages
                    </p>
                  ) : null}
                  <a
                    href={downloadableFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800"
                  >
                    Download PDF
                  </a>
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      {resource.author ? (
        <Section tone="slate" spacing="md">
          <Container size="sm">
            <div className="rounded-2xl bg-white p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {resource.author.photo ? (
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <VeylonImage
                      image={resource.author.photo}
                      className="[&_figure]:m-0 [&_figure>div]:h-20 [&_figure>div]:w-20 [&_figure>div]:rounded-full [&_figcaption]:hidden [&_img]:h-full [&_img]:w-full"
                      sizes="80px"
                    />
                  </div>
                ) : null}
                <div>
                  <p className="font-serif text-2xl text-navy-900">
                    {resource.author.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {resource.author.role}
                  </p>
                  {authorBio ? <p className="mt-3 text-slate-700">{authorBio}</p> : null}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedResources.length ? (
        <Section tone="default" spacing="lg">
          <Container>
            <h2 className="font-serif text-3xl text-navy-900">
              Related resources
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((relatedResource) => (
                <li key={relatedResource._id}>
                  <FeaturedResourceCard
                    resource={relatedResource}
                    showDate
                    imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ClosingCta data={homePage?.closingCta} />
    </>
  );
}
