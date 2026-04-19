"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlockPortableText } from "@/components/veylon/portable-text";
import type { FaqDoc } from "@/lib/sanity/types";

export type HubFaqsAccordionProps = {
  faqs: FaqDoc[];
};

export function HubFaqsAccordion({ faqs }: HubFaqsAccordionProps) {
  const sorted = [...faqs].sort((a, b) => a.displayOrder - b.displayOrder);
  const defaultOpen = sorted[0]?._id;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpen}
      className="w-full"
    >
      {sorted.map((faq) => (
        <AccordionItem key={faq._id} value={faq._id}>
          <AccordionTrigger className="items-start text-left font-serif text-lg font-medium text-navy-900 hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            <BlockPortableText value={faq.answer} className="text-base text-slate-700" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
