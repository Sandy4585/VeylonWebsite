import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { PortableText } from "@/components/veylon/portable-text";
import { Section } from "@/components/veylon/section";
import { Eyebrow, Headline } from "@/components/veylon/typography";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { TeamMemberDoc } from "@/lib/sanity/types";

export type TeamProps = {
  team: TeamMemberDoc[];
};

function sortTeam(members: TeamMemberDoc[]): TeamMemberDoc[] {
  return [...members].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

export function Team({ team }: TeamProps) {
  if (!team.length) return null;

  const ordered = sortTeam(team);

  return (
    <Section tone="slate" spacing="lg">
      <Container>
        <Eyebrow>Leadership</Eyebrow>
        <Headline level={2} className="mt-3 max-w-3xl text-navy-900">
          The people accountable for every install
        </Headline>
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {ordered.map((member) => (
            <article key={member._id}>
              <div className="m-0 [&>figure]:m-0">
                <VeylonImage
                  image={member.photo}
                  priority={false}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="[&>div]:aspect-square [&>div]:overflow-hidden [&>div]:rounded-2xl [&_img]:h-full [&_img]:object-cover"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium text-navy-900">{member.name}</h3>
              <p className="mt-1 font-sans text-sm font-medium tracking-widest text-amber-600 uppercase">
                {member.role}
              </p>
              {member.credentials?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Credentials">
                  {member.credentials.slice(0, 3).map((c) => (
                    <li
                      key={c}
                      className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-700"
                    >
                      {c}
                    </li>
                  ))}
                  {member.credentials.length > 3 ? (
                    <li className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-700">
                      +{member.credentials.length - 3} more
                    </li>
                  ) : null}
                </ul>
              ) : null}
              {member.bio?.length ? (
                <div className="mt-6">
                  <PortableText value={member.bio} className="text-base text-slate-700" />
                </div>
              ) : null}
              {member.linkedInUrl?.trim() ? (
                <Link
                  href={member.linkedInUrl.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-amber-600 underline decoration-amber-600/40 underline-offset-4 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <LinkIcon className="size-5 shrink-0 text-navy-900" aria-hidden />
                  <span className="font-sans text-sm font-medium text-navy-900">LinkedIn</span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
