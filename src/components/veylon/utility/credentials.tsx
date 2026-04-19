import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { TrustSignalDoc } from "@/lib/sanity/types";

export type CredentialsProps = {
  credentials: TrustSignalDoc[] | undefined;
};

export function Credentials({ credentials }: CredentialsProps) {
  const list = [...(credentials ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);
  if (!list.length) return null;

  const withLogos = list.filter((c) => Boolean(c.logo?.image));

  return (
    <Section tone="navy" spacing="md">
      <Container>
        <h2 className="text-center font-sans text-xs font-medium tracking-widest text-amber-500 uppercase">
          Credentials
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ul className="space-y-6">
            {list.map((c) => (
              <li key={c._id}>
                <p className="font-sans text-lg text-slate-200">{c.label}</p>
                {c.description ? (
                  <p className="mt-1 font-sans text-sm text-slate-400">{c.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="hidden lg:block" aria-hidden />
        </div>
        {withLogos.length ? (
          <ul className="mt-12 grid grid-cols-3 items-center gap-8 md:grid-cols-6">
            {withLogos.map((c) =>
              c.logo ? (
                <li key={`${c._id}-logo`} className="flex justify-center">
                  <VeylonImage
                    image={c.logo}
                    className="opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0 [&_figure]:m-0 [&_figure>div]:flex [&_figure>div]:h-12 [&_figure>div]:items-center [&_figure>div]:justify-center [&_figcaption]:hidden [&_img]:max-h-12 [&_img]:w-auto [&_img]:object-contain [&_img]:brightness-0 [&_img]:invert"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </li>
              ) : null,
            )}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
