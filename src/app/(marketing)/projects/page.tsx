import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { FeaturedProjectCard } from "@/components/veylon/featured-project-card";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { Section } from "@/components/veylon/section";
import {
  Eyebrow,
  Headline,
  Subheadline,
} from "@/components/veylon/typography";
import { sanityFetch } from "@/lib/sanity/fetch";
import { homePageQuery, projectListQuery } from "@/lib/sanity/queries";
import type {
  HomePage,
  ProjectDoc,
  ProjectSegment,
} from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const segmentOptions = [
  { label: "All", href: "/projects" },
  { label: "Residential", href: "/projects?segment=residential" },
  { label: "Commercial", href: "/projects?segment=commercial" },
  { label: "Utility-scale", href: "/projects?segment=utility-scale" },
] as const;

function parseSegment(
  rawSegment: string | undefined,
): ProjectSegment | null {
  if (rawSegment === "residential") return "residential";
  if (rawSegment === "commercial") return "commercial";
  if (rawSegment === "utility" || rawSegment === "utility-scale") {
    return "utility";
  }
  return null;
}

type ProjectsPageProps = {
  searchParams: Promise<{ segment?: string }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { segment: segmentParam } = await searchParams;
  const selectedSegment = parseSegment(segmentParam);

  const [projects, homePage] = await Promise.all([
    sanityFetch<ProjectDoc[]>({
      query: projectListQuery,
      tags: ["projects"],
      params: { segment: null },
    }),
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
  ]);

  const filteredProjects = selectedSegment
    ? projects.filter((project) => project.segment === selectedSegment)
    : projects;

  const hasAnyProjects = projects.length > 0;

  return (
    <>
      <Section tone="navy" spacing="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>Our work</Eyebrow>
            <Headline level={1} className="mt-3">
              Projects we&apos;ve built
            </Headline>
            <Subheadline className="mx-auto mt-6">
              Selected installations across residential, commercial, and
              utility-scale. Every project, engineered and documented.
            </Subheadline>
          </div>
        </Container>
      </Section>

      <Section tone="default" spacing="sm">
        <Container>
          <nav
            aria-label="Filter projects by segment"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {segmentOptions.map((option) => {
              const isActive =
                option.label === "All"
                  ? selectedSegment === null
                  : option.href.includes(
                      `segment=${segmentParam ?? "__none__"}`,
                    );

              return (
                <Link
                  key={option.href}
                  href={option.href}
                  className={cn(
                    "rounded-full border border-slate-200 px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-navy-900 text-white"
                      : "text-slate-700 hover:text-navy-900",
                  )}
                >
                  {option.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      <Section tone="default" spacing="lg">
        <Container>
          {filteredProjects.length > 0 ? (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <li key={project._id}>
                  <FeaturedProjectCard
                    project={project}
                    imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          ) : hasAnyProjects ? (
            <p className="text-center text-slate-700">
              No projects yet in this segment.{" "}
              <Link
                href="/projects"
                className="font-medium text-navy-900 underline-offset-4 hover:underline"
              >
                See other work →
              </Link>
            </p>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-slate-700">No projects published yet</p>
              <p>
                <Link
                  href="/contact"
                  className="font-medium text-navy-900 underline-offset-4 hover:underline"
                >
                  Want to be our next case study?
                </Link>
              </p>
            </div>
          )}
        </Container>
      </Section>

      <ClosingCta data={homePage?.closingCta} />
    </>
  );
}
