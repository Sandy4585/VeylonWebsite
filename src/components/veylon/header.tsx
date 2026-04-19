import { SiteHeaderClient } from "@/components/veylon/header-client";
import { resolveHeaderPrimaryCta } from "@/lib/sanity/fallbacks";
import type { SiteConfig } from "@/lib/sanity/types";

export type HeaderProps = {
  siteConfig: SiteConfig;
};

export function Header({ siteConfig }: HeaderProps) {
  const primaryNav = siteConfig.primaryNav ?? [];
  const headerCta = resolveHeaderPrimaryCta(siteConfig);

  return (
    <SiteHeaderClient primaryNav={primaryNav} headerCta={headerCta} />
  );
}
