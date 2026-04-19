import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { FaqDoc, HubSegment } from "@/lib/sanity/types";

import { HubFaqsAccordion } from "./hub-faqs-accordion";

export type HubFaqsProps = {
  faqs: FaqDoc[] | undefined;
  segment: HubSegment;
};

export function HubFaqs({ faqs, segment }: HubFaqsProps) {
  const list = (faqs ?? []).filter((f) => f.question?.trim() && f.answer?.length);
  if (!list.length) return null;

  return (
    <Section tone="slate" spacing="lg" id={`${segment}-faqs`}>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
              Questions answered
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
              Things you might want to ask
            </h2>
            <p className="mt-6 font-sans text-sm text-slate-600">
              Something else on your mind?{" "}
              <Link
                href="/contact"
                className="font-medium text-amber-700 underline decoration-amber-700/30 underline-offset-4 hover:text-amber-800"
              >
                Get in touch →
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8">
            <HubFaqsAccordion faqs={list} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
