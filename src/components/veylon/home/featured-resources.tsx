import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { ResourceDoc } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<
  ResourceDoc["type"],
  { label: string; className: string }
> = {
  guide: {
    label: "Guide",
    className: "bg-slate-100 text-slate-700",
  },
  report: {
    label: "Report",
    className: "bg-navy-900 text-white",
  },
  article: {
    label: "Article",
    className: "bg-amber-50 text-amber-700",
  },
  "policy-update": {
    label: "Policy update",
    className: "bg-green-500/15 text-green-700",
  },
};

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
                <article className="flex h-full flex-col">
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-full px-3 py-1 font-sans text-xs font-medium",
                      typeStyles[resource.type].className,
                    )}
                  >
                    {typeStyles[resource.type].label}
                  </span>
                  {resource.heroImage ? (
                    <div className="mt-4 aspect-[3/2] w-full overflow-hidden rounded-xl">
                      <VeylonImage
                        image={resource.heroImage}
                        className="[&_figure]:m-0 [&_figure>div]:h-full [&_figure>div]:overflow-hidden [&_figcaption]:hidden [&_img]:h-full [&_img]:object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <h3 className="mt-4 font-serif text-xl text-navy-900">
                    <Link
                      href={`/resources/${resource.slug.current}`}
                      className="rounded-sm focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {resource.title}
                    </Link>
                  </h3>
                  {resource.excerpt ? (
                    <p className="mt-3 line-clamp-3 text-sm text-slate-700">{resource.excerpt}</p>
                  ) : null}
                  <p className="mt-6">
                    <Link
                      href={`/resources/${resource.slug.current}`}
                      className="inline-flex items-center gap-1 font-medium text-amber-700 transition-colors hover:text-amber-800 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      Read more
                      <span aria-hidden>→</span>
                    </Link>
                  </p>
                </article>
              </li>
            ) : null,
          )}
        </ul>
      </Container>
    </Section>
  );
}
