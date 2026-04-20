import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { FeaturedResourceCard } from "@/components/veylon/featured-resource-card";
import { ClosingCta } from "@/components/veylon/home/closing-cta";
import { Section } from "@/components/veylon/section";
import {
  Eyebrow,
  Headline,
  Subheadline,
} from "@/components/veylon/typography";
import { sanityFetch } from "@/lib/sanity/fetch";
import { homePageQuery, resourceListQuery } from "@/lib/sanity/queries";
import type { HomePage, ResourceDoc, ResourceType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

const typeOptions = [
  { label: "All", href: "/resources" },
  { label: "Guides", href: "/resources?type=guide" },
  { label: "Reports", href: "/resources?type=report" },
  { label: "Articles", href: "/resources?type=article" },
  { label: "Policy updates", href: "/resources?type=policy-update" },
] as const;

function parseType(rawType: string | undefined): ResourceType | null {
  if (rawType === "guide") return "guide";
  if (rawType === "report") return "report";
  if (rawType === "article") return "article";
  if (rawType === "policy-update") return "policy-update";
  return null;
}

type ResourcesPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { type: typeParam } = await searchParams;
  const selectedType = parseType(typeParam);

  const [resources, homePage] = await Promise.all([
    sanityFetch<ResourceDoc[]>({
      query: resourceListQuery,
      tags: ["resources"],
      params: { type: null },
    }),
    sanityFetch<HomePage | null>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
  ]);

  const filteredResources = selectedType
    ? resources.filter((resource) => resource.type === selectedType)
    : resources;

  return (
    <>
      <Section tone="navy" spacing="md">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>Knowledge</Eyebrow>
            <Headline level={1} className="mt-3">
              Resources for people who read the fine print
            </Headline>
            <Subheadline className="mx-auto mt-6">
              Guides, reports, articles, and policy updates for better energy
              decisions.
            </Subheadline>
          </div>
        </Container>
      </Section>

      <Section tone="default" spacing="sm">
        <Container>
          <nav
            aria-label="Filter resources by type"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {typeOptions.map((option) => {
              const isActive =
                option.label === "All"
                  ? selectedType === null
                  : option.href.includes(`type=${typeParam ?? "__none__"}`);

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
          {filteredResources.length > 0 ? (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <li key={resource._id}>
                  <FeaturedResourceCard
                    resource={resource}
                    showDate
                    imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-700">
              No resources published yet. Coming soon.
            </p>
          )}
        </Container>
      </Section>

      <ClosingCta data={homePage?.closingCta} />
    </>
  );
}
