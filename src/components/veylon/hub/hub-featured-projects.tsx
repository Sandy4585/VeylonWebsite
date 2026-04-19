import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { FeaturedProjectCard } from "@/components/veylon/featured-project-card";
import { Section } from "@/components/veylon/section";
import type { HubSegment, ProjectDoc } from "@/lib/sanity/types";

const segmentLabel: Record<HubSegment, string> = {
  residential: "residential",
  commercial: "commercial",
};

export type HubFeaturedProjectsProps = {
  projects: ProjectDoc[] | undefined;
  segment: HubSegment;
};

export function HubFeaturedProjects({ projects, segment }: HubFeaturedProjectsProps) {
  const list = (projects ?? []).filter((p) =>
    Boolean(p.slug?.current && p.title?.trim() && p.heroImage),
  );
  if (!list.length) return null;

  const displayed = list.slice(0, 6);
  const hasMore = list.length > 6;

  return (
    <Section tone="default" spacing="lg" className="bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
            Recent work
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
            {segment === "residential"
              ? "Residential installations we're proud of"
              : "Commercial installations we're proud of"}
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project) => (
            <li key={project._id}>
              <FeaturedProjectCard
                project={project}
                imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
        {hasMore ? (
          <p className="mt-10 text-center">
            <Link
              href={`/projects?segment=${segmentLabel[segment]}`}
              className="font-sans text-sm font-medium text-amber-700 underline decoration-amber-700/30 underline-offset-4 hover:text-amber-800"
            >
              View all {segmentLabel[segment]} projects →
            </Link>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
