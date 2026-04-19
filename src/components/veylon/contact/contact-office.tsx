import { Container } from "@/components/veylon/container";
import { SimplePortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import { Eyebrow, Headline } from "@/components/veylon/typography";
import { portableTextToPlainText } from "@/lib/sanity/plain-text";
import type { SimpleBlockContent } from "@/lib/sanity/types";

export type ContactOfficeProps = {
  officeAddress?: SimpleBlockContent;
  mapEmbedUrl?: string;
};

export function ContactOffice({ officeAddress, mapEmbedUrl }: ContactOfficeProps) {
  const hasBlocks = Boolean(officeAddress?.length);
  const hasMap = Boolean(mapEmbedUrl?.trim());
  if (!hasBlocks && !hasMap) return null;

  const query = hasBlocks ? portableTextToPlainText(officeAddress) : "";
  const mapsHref =
    query.length > 0
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
      : null;

  if (!hasBlocks && hasMap) {
    return (
      <Section tone="default" spacing="lg">
        <Container>
          <Eyebrow>Visit us</Eyebrow>
          <Headline level={2} className="mt-3 max-w-3xl text-3xl text-navy-900">
            Before you arrive
          </Headline>
          <iframe
            title="Veylon office location"
            src={mapEmbedUrl?.trim()}
            loading="lazy"
            className="mt-10 aspect-video w-full max-w-4xl rounded-2xl border border-slate-200 bg-slate-100"
            allowFullScreen
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Visit us</Eyebrow>
            <Headline level={2} className="mt-3 text-3xl text-navy-900">
              Before you arrive
            </Headline>
            {hasBlocks && officeAddress ? (
              <div className="mt-8">
                <SimplePortableText value={officeAddress} />
              </div>
            ) : null}
            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex font-sans text-sm font-semibold text-amber-600 underline decoration-amber-600/40 underline-offset-4 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Open in Maps →
              </a>
            ) : null}
          </div>
          <div>
            {hasMap ? (
              <iframe
                title="Veylon office location"
                src={mapEmbedUrl?.trim()}
                loading="lazy"
                className="aspect-video w-full rounded-2xl border border-slate-200 bg-slate-100"
                allowFullScreen
              />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-navy-900 px-6 text-center">
                <p className="font-serif text-lg text-slate-200">Map coming soon</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
