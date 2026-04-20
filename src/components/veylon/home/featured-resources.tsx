import { Container } from "@/components/veylon/container";
import { FeaturedResourceCard } from "@/components/veylon/featured-resource-card";
import { Section } from "@/components/veylon/section";
import type { ResourceDoc } from "@/lib/sanity/types";

export type FeaturedResourcesProps = {
  resources: ResourceDoc[] | undefined;
};

export function FeaturedResources({ resources }: FeaturedResourcesProps) {
  const list = (resources ?? []).filter((r) => Boolean(r.slug?.current && r.title?.trim()));
  if (!list.length) return null;

  return (
    <Section tone="default" spacing="lg" className="bg-white">
      <Container>
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
            Resources
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
            For people who read the fine print
          </h2>
        </div>
        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {list.map((resource) =>
            resource.slug?.current ? (
              <li key={resource._id}>
                <FeaturedResourceCard resource={resource} />
              </li>
            ) : null,
          )}
        </ul>
      </Container>
    </Section>
  );
}
