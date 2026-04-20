import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Container } from "@/components/veylon/container";
import { FeaturedProjectCard } from "@/components/veylon/featured-project-card";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { PortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import {
  Eyebrow,
  Headline,
  Subheadline,
} from "@/components/veylon/typography";
import { VeylonImage } from "@/components/veylon/veylon-image";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  homePageQuery,
  projectBySlugQuery,
  projectRelatedQuery,
  projectSlugsQuery,
} from "@/lib/sanity/queries";
import type {
  HomePage,
  ProjectComponent,
  ProjectDoc,
  ProjectSegment,
  RichImage,
} from "@/lib/sanity/types";
import { createMetadata } from "@/lib/seo/metadata";

const segmentLabel: Record<ProjectSegment, string> = {
  residential: "Residential",
  commercial: "Commercial",
  utility: "Utility-scale",
};

const componentRoleOrder: Record<ProjectComponent["role"], number> = {
  module: 0,
  inverter: 1,
  battery: 2,
  monitoring: 3,
  mounting: 4,
};

const commissionedDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

function formatDate(dateString: string | undefined): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return commissionedDateFormatter.format(date);
}

function locationLabel(project: ProjectDoc): string {
  return [project.location?.city, project.location?.state]
    .filter(Boolean)
    .join(", ");
}

function heroMetaLine(project: ProjectDoc): string {
  const details: string[] = [];
  const location = locationLabel(project);
  const kw = project.systemDetails?.capacityKw;
  const commissioned = formatDate(project.systemDetails?.commissionedDate);

  if (location) details.push(location);

  const systemBits: string[] = [];
  if (kw != null) systemBits.push(`${kw} kW`);
  if (commissioned) systemBits.push(`Commissioned ${commissioned}`);
  if (systemBits.length) details.push(systemBits.join(" · "));

  return details.join(" · ");
}

function hasResults(project: ProjectDoc): boolean {
  return Boolean(
    project.results &&
      (project.results.annualGenerationKwh != null ||
        project.results.co2OffsetTonnes != null ||
        project.results.paybackYears != null ||
        project.results.customerSavingsInr != null),
  );
}

function narrativeToPlainText(project: ProjectDoc): string {
  const blocks = (project.narrative ?? []).filter(
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

function ogImageUrl(image: RichImage | undefined): string | undefined {
  if (!image?.image) return undefined;
  return urlFor(image.image).width(1200).height(630).fit("crop").auto("format").url();
}

const loadProject = cache(async (slug: string) =>
  sanityFetch<ProjectDoc | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
  }),
);

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: projectSlugsQuery,
    draft: false,
    tags: ["projects"],
  });

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) {
    return {};
  }

  const location = locationLabel(project);
  const title =
    project.seo?.metaTitle?.trim() ||
    [project.title, location].filter(Boolean).join(" — ");
  const description =
    project.seo?.metaDescription?.trim() ||
    narrativeToPlainText(project) ||
    undefined;
  const og = ogImageUrl(project.heroImage);

  const base = createMetadata({
    title,
    description,
    path: `/projects/${project.slug.current}`,
    ogImage: og,
  });

  return {
    ...base,
    ...(project.seo?.canonicalUrl
      ? { alternates: { canonical: project.seo.canonicalUrl } }
      : {}),
    ...(project.seo?.noIndex
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) {
    notFound();
  }

  const [relatedProjects, homePage] = await Promise.all([
    sanityFetch<ProjectDoc[]>({
      query: projectRelatedQuery,
      params: { segment: project.segment, projectId: project._id },
      tags: ["projects"],
    }),
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
  ]);

  const components = [...(project.systemDetails?.components ?? [])].sort(
    (a, b) => componentRoleOrder[a.role] - componentRoleOrder[b.role],
  );

  const location = locationLabel(project);
  const commissioned = formatDate(project.systemDetails?.commissionedDate);
  const heroMeta = heroMetaLine(project);
  const description =
    project.seo?.metaDescription?.trim() ||
    narrativeToPlainText(project) ||
    project.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description,
    datePublished: project.publishedAt,
    dateModified: project._updatedAt,
    image: project.heroImage ? [ogImageUrl(project.heroImage)] : undefined,
    author: project.testimonial?.author?.name
      ? [{ "@type": "Person", name: project.testimonial.author.name }]
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/projects/${project.slug.current}`,
    },
  };

  return (
    <>
      <Section tone="navy" spacing="lg">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>{segmentLabel[project.segment]}</Eyebrow>
            <Headline level={1} className="mt-3">
              {project.title}
            </Headline>
            {heroMeta ? (
              <Subheadline className="mx-auto mt-6">{heroMeta}</Subheadline>
            ) : null}
          </div>
        </Container>
      </Section>

      {project.heroImage ? (
        <Section tone="default" spacing="sm">
          <Container>
            <div className="overflow-hidden rounded-2xl">
              <VeylonImage
                image={project.heroImage}
                priority
                className="[&_figure]:m-0 [&_figure>div]:aspect-[4/5] md:[&_figure>div]:aspect-[16/9] [&_figure>div]:rounded-none [&_figcaption]:hidden"
                sizes="(max-width: 768px) 100vw, 85vw"
              />
            </div>
            {project.heroImage.caption ? (
              <p className="mt-3 text-sm italic text-slate-500">
                {project.heroImage.caption}
              </p>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <Section tone="default" spacing="lg">
        <Container size="md">
          <div className="mx-auto max-w-4xl">
            <Eyebrow>System specifications</Eyebrow>
            <Headline className="mt-3">What&apos;s on this roof</Headline>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <dl className="space-y-4 text-slate-700">
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    DC capacity
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {project.systemDetails?.capacityKw != null
                      ? `${project.systemDetails.capacityKw} kW`
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    Configuration
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {project.systemDetails?.configuration || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    Commissioned
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {commissioned || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    Location
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {location || "—"}
                  </dd>
                </div>
              </dl>

              <div className="space-y-4">
                {components.length ? (
                  components.map((component) => (
                    <div
                      key={`${component.role}-${component.brand}-${component.model}`}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <p className="font-sans text-xs font-medium tracking-widest text-amber-700 uppercase">
                        {component.role}
                      </p>
                      <p className="mt-1 text-slate-700">
                        {component.brand} {component.model}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">Components not listed.</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {hasResults(project) ? (
        <Section tone="slate" spacing="lg">
          <Container>
            <div className="max-w-4xl">
              <Eyebrow>Results</Eyebrow>
              <Headline className="mt-3">What the system does</Headline>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.results?.annualGenerationKwh != null ? (
                <div className="rounded-xl bg-white p-6">
                  <p className="font-sans text-sm text-slate-500">
                    Annual generation
                  </p>
                  <p className="mt-2 font-serif text-2xl text-navy-900">
                    {project.results.annualGenerationKwh.toLocaleString()} kWh/year
                  </p>
                </div>
              ) : null}
              {project.results?.co2OffsetTonnes != null ? (
                <div className="rounded-xl bg-white p-6">
                  <p className="font-sans text-sm text-slate-500">CO2 offset</p>
                  <p className="mt-2 font-serif text-2xl text-navy-900">
                    {project.results.co2OffsetTonnes} tonnes/year
                  </p>
                </div>
              ) : null}
              {project.results?.paybackYears != null ? (
                <div className="rounded-xl bg-white p-6">
                  <p className="font-sans text-sm text-slate-500">Payback</p>
                  <p className="mt-2 font-serif text-2xl text-navy-900">
                    {project.results.paybackYears} years
                  </p>
                </div>
              ) : null}
              {project.results?.customerSavingsInr != null ? (
                <div className="rounded-xl bg-white p-6">
                  <p className="font-sans text-sm text-slate-500">
                    Customer savings
                  </p>
                  <p className="mt-2 font-serif text-2xl text-navy-900">
                    ₹{project.results.customerSavingsInr.toLocaleString()} (25-year estimated)
                  </p>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {project.narrative?.length ? (
        <Section tone="default" spacing="lg">
          <Container size="sm">
            <Eyebrow>Story</Eyebrow>
            <Headline className="mt-3">How we approached it</Headline>
            <PortableText
              value={project.narrative}
              variant="page"
              className="mt-8"
            />
          </Container>
        </Section>
      ) : null}

      {(project.gallery ?? []).length ? (
        <Section tone="default" spacing="lg">
          <Container>
            <h2 className="font-serif text-3xl text-navy-900">Photos</h2>
            <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {(project.gallery ?? []).map((image, index) => (
                <li key={`gallery-${index}`} className="overflow-hidden rounded-xl">
                  <VeylonImage
                    image={image}
                    className="[&_figure]:m-0 [&_figure>div]:aspect-[4/3] [&_figure>div]:rounded-none [&_figcaption]:hidden"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {project.testimonial?.quote ? (
        <Section tone="navy" spacing="lg">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <blockquote className="font-serif text-3xl italic text-white md:text-4xl">
                “{project.testimonial.quote}”
              </blockquote>
              <p className="mt-6 text-slate-300">
                {project.testimonial.author.name}, {project.testimonial.author.role}
                {project.testimonial.author.location
                  ? `, ${project.testimonial.author.location}`
                  : ""}
              </p>
            </div>
          </Container>
        </Section>
      ) : null}

      {relatedProjects.length ? (
        <Section tone="slate" spacing="lg">
          <Container>
            <h2 className="font-serif text-3xl text-navy-900">
              Other {segmentLabel[project.segment]} work
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <li key={relatedProject._id}>
                  <FeaturedProjectCard
                    project={relatedProject}
                    imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <ClosingCta data={homePage?.closingCta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
