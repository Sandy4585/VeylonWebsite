import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { getContactChannelHref } from "@/lib/contact/channel-links";
import type { ContactChannel, ContactChannelType } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type ContactChannelsProps = {
  channels: ContactChannel[];
};

const channelIcons: Record<ContactChannelType, ReactNode> = {
  whatsapp: <MessageCircle className="size-6 shrink-0 text-navy-900" aria-hidden />,
  email: <Mail className="size-6 shrink-0 text-navy-900" aria-hidden />,
  phone: <Phone className="size-6 shrink-0 text-navy-900" aria-hidden />,
  office: <MapPin className="size-6 shrink-0 text-navy-900" aria-hidden />,
};

function channelIcon(type: ContactChannelType) {
  return channelIcons[type];
}

export function ContactChannels({ channels }: ContactChannelsProps) {
  if (!channels.length) return null;

  return (
    <Section tone="default" spacing="md">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {channels.map((ch) => {
            const href = getContactChannelHref(ch.type, ch.value);
            const inner = (
              <>
                {channelIcon(ch.type)}
                <p className="mt-4 font-sans text-sm font-medium tracking-widest text-slate-500 uppercase">
                  {ch.label}
                </p>
                <p className="mt-2 font-serif text-xl font-medium text-navy-900">{ch.value}</p>
                {ch.hours?.trim() ? (
                  <p className="mt-2 font-sans text-sm text-slate-600">{ch.hours}</p>
                ) : null}
              </>
            );

            const cardClass = cn(
              "block rounded-xl border border-slate-200 bg-white p-6 transition-colors",
              href
                ? "hover:border-navy-200 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                : "",
            );

            if (href) {
              return (
                <a key={`${ch.type}-${ch.label}`} href={href} className={cardClass}>
                  {inner}
                </a>
              );
            }

            return (
              <div key={`${ch.type}-${ch.label}`} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
