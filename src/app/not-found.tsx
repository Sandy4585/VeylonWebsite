import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import {
  Eyebrow,
  Headline,
  Subheadline,
} from "@/components/veylon/typography";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page not found — Veylon Energy",
    robots: { index: false, follow: true },
  };
}

export default function NotFound() {
  return (
    <Section
      tone="default"
      spacing="none"
      className="flex min-h-[calc(100vh-8rem)] items-center"
    >
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>404</Eyebrow>
          <Headline level={1} className="mt-4 text-5xl text-navy-900 md:text-5xl">
            We couldn&apos;t find that page
          </Headline>
          <Subheadline className="mx-auto mt-6">
            The link might be broken, or the page may have moved. Here&apos;s
            where to head next.
          </Subheadline>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-navy-200"
            >
              Start over
            </Link>
            <Link
              href="/projects"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-navy-200"
            >
              Our projects
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-navy-200"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
