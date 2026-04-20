import Link from "next/link";

import { VeylonImage } from "@/components/veylon/veylon-image";
import type { ResourceDoc, ResourceType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const typeStyles: Record<
  ResourceType,
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
    label: "Policy updates",
    className: "bg-green-500/15 text-green-700",
  },
};

type FeaturedResourceCardProps = {
  resource: ResourceDoc;
  imageSizes?: string;
  showDate?: boolean;
};

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export function resourceTypeLabel(type: ResourceType): string {
  return typeStyles[type].label;
}

function formatPublishedDate(isoDate: string | undefined): string | null {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return null;
  return monthYearFormatter.format(date);
}

export function FeaturedResourceCard({
  resource,
  imageSizes,
  showDate = false,
}: FeaturedResourceCardProps) {
  if (!resource.slug?.current || !resource.title?.trim()) {
    return null;
  }

  const published = showDate ? formatPublishedDate(resource.publishedAt) : null;

  return (
    <article className="group flex h-full flex-col">
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
            className="[&_figure]:m-0 [&_figure>div]:h-full [&_figure>div]:overflow-hidden [&_figcaption]:hidden [&_img]:h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-300 group-hover:[&_img]:scale-[1.02]"
            sizes={imageSizes ?? "(max-width: 768px) 100vw, 33vw"}
          />
        </div>
      ) : null}
      <h3 className="mt-4 font-serif text-xl text-navy-900 transition-colors group-hover:text-navy-700">
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
      {published ? <p className="mt-3 text-sm text-slate-500">{published}</p> : null}
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
  );
}
