import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { ProjectDoc } from "@/lib/sanity/types";

const segmentLabel: Record<ProjectDoc["segment"], string> = {
  residential: "Residential",
  commercial: "Commercial",
  utility: "Utility",
};

function formatCapacitySegment(project: ProjectDoc): string {
  const parts: string[] = [];
  const kw = project.systemDetails?.capacityKw;
  if (kw != null) parts.push(`${kw} kW`);
  parts.push(segmentLabel[project.segment]);
  return parts.join(" · ");
}

export type FeaturedProjectsProps = {
  projects: ProjectDoc[] | undefined;
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const list = (projects ?? []).filter(
    (p) => Boolean(p.slug?.current && p.title?.trim() && p.heroImage),
  );
  if (!list.length) return null;

  return (
    <Section tone="default" spacing="lg" className="bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
            Recent work
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
            Projects we&apos;re proud of
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {list.map((project) =>
            project.heroImage && project.slug?.current ? (
              <li key={project._id}>
                <Link
                  href={`/projects/${project.slug.current}`}
                  className="group block focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <article>
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                      <VeylonImage
                        image={project.heroImage}
                        className="[&_figure]:m-0 [&_figure>div]:h-full [&_figure>div]:overflow-hidden [&_figcaption]:hidden [&_img]:h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="mt-4 inline-block rounded-full bg-amber-50 px-3 py-1 font-sans text-xs font-medium text-amber-700">
                      {segmentLabel[project.segment]}
                    </p>
                    <h3 className="mt-3 font-serif text-xl text-navy-900 transition-colors group-hover:text-navy-700">
                      {project.title}
                    </h3>
                    {project.location?.city || project.location?.state ? (
                      <p className="mt-1 text-sm text-slate-500">
                        {[project.location?.city, project.location?.state]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    ) : null}
                    <p className="mt-1 text-sm text-slate-700">{formatCapacitySegment(project)}</p>
                  </article>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </Container>
    </Section>
  );
}
