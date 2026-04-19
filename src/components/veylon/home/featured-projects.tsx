import { Container } from "@/components/veylon/container";
import { FeaturedProjectCard } from "@/components/veylon/featured-project-card";
import { Section } from "@/components/veylon/section";
import type { ProjectDoc } from "@/lib/sanity/types";

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
          {list.map((project) => (
            <li key={project._id}>
              <FeaturedProjectCard
                project={project}
                imageSizes="(max-width: 768px) 100vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
