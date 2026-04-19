import { Container } from "@/components/veylon/container";
import { PortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import { Eyebrow } from "@/components/veylon/typography";
import type { PageBlockContent } from "@/lib/sanity/types";

export type CompanyStatementProps = {
  companyStatement: PageBlockContent;
};

export function CompanyStatement({ companyStatement }: CompanyStatementProps) {
  return (
    <Section tone="slate" spacing="lg">
      <Container>
        <div className="max-w-3xl text-left">
          <Eyebrow>How we operate</Eyebrow>
          <div className="mt-8">
            <PortableText
              value={companyStatement}
              className="text-lg leading-relaxed text-slate-700"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
