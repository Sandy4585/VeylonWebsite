import {
  Building2,
  Camera,
  ChevronDownIcon,
  Hash,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Logo } from "@/components/veylon/logo";
import { BlockPortableText } from "@/components/veylon/portable-text";
import type { SiteConfig, SocialPlatform } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type FooterProps = {
  siteConfig: SiteConfig;
};

function socialIcon(platform: SocialPlatform) {
  const common = "size-5";
  switch (platform) {
    case "linkedin":
      return <Building2 className={common} aria-hidden />;
    case "instagram":
      return <Camera className={common} aria-hidden />;
    case "youtube":
      return <PlayCircle className={common} aria-hidden />;
    case "x":
      return <Hash className={common} aria-hidden />;
    default: {
      const _exhaustive: never = platform;
      return _exhaustive;
    }
  }
}

function splitNavColumns<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

function ContactBlock({
  email,
  phone,
  whatsappNumber,
}: {
  email: string;
  phone: string;
  whatsappNumber?: string;
}) {
  const wa = whatsappNumber?.replace(/\D/g, "");
  return (
    <address className="not-italic">
      <ul className="space-y-2 text-sm text-slate-200">
        <li>
          <a href={`mailto:${email}`} className="hover:text-slate-50">
            {email}
          </a>
        </li>
        <li>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-slate-50">
            {phone}
          </a>
        </li>
        {wa ? (
          <li>
            <a
              href={`https://wa.me/${wa}`}
              className="hover:text-slate-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
        ) : null}
      </ul>
    </address>
  );
}

export function Footer({ siteConfig }: FooterProps) {
  const year = new Date().getFullYear();
  const brand = siteConfig.brandName;
  const tagline = siteConfig.tagline;
  const footerNav = siteConfig.footerNav ?? [];
  const [navColA, navColB] = splitNavColumns(footerNav);
  const legal = siteConfig.legalEntity;
  const social = siteConfig.socialLinks ?? [];

  return (
    <footer className="bg-navy-900 text-slate-200">
      <Container>
        <div className="border-b border-navy-700 py-10 lg:py-14">
          <div className="lg:hidden">
            <details className="group border-b border-navy-800">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium text-slate-50 [&::-webkit-details-marker]:hidden">
                {brand}
                <ChevronDownIcon
                  className="size-4 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="pb-4">
                {tagline ? (
                  <p className="text-sm text-slate-400">{tagline}</p>
                ) : null}
                <div className="mt-4">
                  <Logo variant="horizontal" theme="white" href="/" />
                </div>
              </div>
            </details>

            <details className="group border-b border-navy-800">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium text-slate-50 [&::-webkit-details-marker]:hidden">
                Explore
                <ChevronDownIcon
                  className="size-4 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="grid grid-cols-2 gap-x-4 pb-4">
                <ul className="space-y-2 text-sm">
                  {navColA.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-slate-300 hover:text-slate-50"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 text-sm">
                  {navColB.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-slate-300 hover:text-slate-50"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="group border-b border-navy-800">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium text-slate-50 [&::-webkit-details-marker]:hidden">
                Contact
                <ChevronDownIcon
                  className="size-4 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="pb-4">
                <ContactBlock
                  email={siteConfig.contactEmail}
                  phone={legal.contactPhone}
                  whatsappNumber={siteConfig.whatsappNumber}
                />
              </div>
            </details>

            <details className="group border-b border-navy-800">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-medium text-slate-50 [&::-webkit-details-marker]:hidden">
                Legal
                <ChevronDownIcon
                  className="size-4 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="space-y-3 pb-4 text-sm text-slate-400">
                {legal.registeredAddress?.length ? (
                  <div className="text-slate-300 [&_a]:text-amber-400">
                    <BlockPortableText
                      value={legal.registeredAddress}
                      variant="page"
                      className="[&_p]:text-slate-300"
                    />
                  </div>
                ) : (
                  <p>Registered address on file.</p>
                )}
              </div>
            </details>
          </div>

          <div className="hidden gap-10 lg:grid lg:grid-cols-4 lg:gap-8">
            <div>
              <Logo variant="horizontal" theme="white" href="/" />
              {tagline ? (
                <p className="mt-4 text-sm text-slate-400">{tagline}</p>
              ) : null}
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Explore
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <ul className="space-y-2">
                  {navColA.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-slate-300 hover:text-slate-50"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {navColB.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        className="text-slate-300 hover:text-slate-50"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Contact
              </p>
              <ContactBlock
                email={siteConfig.contactEmail}
                phone={legal.contactPhone}
                whatsappNumber={siteConfig.whatsappNumber}
              />
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                Legal
              </p>
              {legal.registeredAddress?.length ? (
                <div className="text-sm text-slate-300 [&_a]:text-amber-400">
                  <BlockPortableText
                    value={legal.registeredAddress}
                    variant="page"
                    className="[&_p]:text-slate-300"
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400">Registered address on file.</p>
              )}
            </div>
          </div>

          {social.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-4 lg:mt-12">
              {social.map((s) => (
                <li key={`${s.platform}-${s.url}`}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 rounded-md border border-transparent p-1 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200",
                    )}
                  >
                    {socialIcon(s.platform)}
                    <span className="sr-only">{s.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 py-6 text-xs text-slate-500 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
          <p>
            {year} {brand}. All rights reserved.
          </p>
          <p>
            {legal.proprietorName}
            {legal.gstin ? (
              <span className="text-slate-500"> · GSTIN {legal.gstin}</span>
            ) : null}
          </p>
          <p className="text-slate-500">Made in Chennai</p>
        </div>
      </Container>
    </footer>
  );
}
