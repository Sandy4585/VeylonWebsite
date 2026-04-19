import { Container } from "@/components/veylon/container";
import { PortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import { Eyebrow } from "@/components/veylon/typography";
import type { PageBlockContent } from "@/lib/sanity/types";

export type FounderStoryProps = {
  founderStory: PageBlockContent;
};

export function FounderStory({ founderStory }: FounderStoryProps) {
  return (
    <Section tone="default" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Founder</Eyebrow>
              <p className="mt-3 font-sans text-sm font-medium text-slate-600">
                From the proprietor
              </p>
            </div>
          </div>
          <div className="w-full min-w-0 lg:col-span-8">
            <div className="w-full text-left">
              <PortableText value={founderStory} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
