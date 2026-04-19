import type { Cta, LegalEntity, SiteConfig } from "./types";

/** Fallback primary CTA for header when CMS does not define one. */
export const FALLBACK_HEADER_CTA: Cta = {
  label: "Contact",
  href: "/contact",
  variant: "primary",
  external: false,
};

/** Minimal legal entity used only when siteConfig is missing from Sanity. */
export const FALLBACK_LEGAL_ENTITY: LegalEntity = {
  proprietorName: "Proprietor",
  entityType: "proprietorship",
  gstin: "AAAAAAAAAAAAAAA",
  registeredAddress: [],
  contactPhone: "+910000000000",
  contactEmail: "hello@veylon.energy",
};

/**
 * Fallback site configuration — labeled fallbacks for empty studio.
 * Replace via Site settings in Sanity for production content.
 */
export const FALLBACK_SITE_CONFIG: SiteConfig = {
  _id: "siteConfig",
  _type: "siteConfig",
  _createdAt: "",
  _updatedAt: "",
  brandName: "Veylon Energy",
  tagline: "Premium solar for homes and businesses",
  contactEmail: "hello@veylon.energy",
  primaryNav: [
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
    { label: "Utility", href: "/utility-scale" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
  ],
  footerNav: [
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
    { label: "Utility scale", href: "/utility-scale" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Resources", href: "/resources" },
  ],
  socialLinks: [],
  legalEntity: FALLBACK_LEGAL_ENTITY,
};

/**
 * Merges CMS site settings with labeled fallbacks when fields are empty.
 */
export function mergeSiteConfig(data: SiteConfig | null): SiteConfig {
  if (!data) {
    return FALLBACK_SITE_CONFIG;
  }

  return {
    ...FALLBACK_SITE_CONFIG,
    ...data,
    brandName: data.brandName?.trim() || FALLBACK_SITE_CONFIG.brandName,
    tagline: data.tagline ?? FALLBACK_SITE_CONFIG.tagline,
    contactEmail: data.contactEmail?.trim() || FALLBACK_SITE_CONFIG.contactEmail,
    primaryNav:
      data.primaryNav && data.primaryNav.length > 0
        ? data.primaryNav
        : FALLBACK_SITE_CONFIG.primaryNav,
    footerNav:
      data.footerNav && data.footerNav.length > 0
        ? data.footerNav
        : FALLBACK_SITE_CONFIG.footerNav,
    socialLinks: data.socialLinks ?? FALLBACK_SITE_CONFIG.socialLinks,
    legalEntity: data.legalEntity ?? FALLBACK_LEGAL_ENTITY,
  };
}

export function resolveHeaderPrimaryCta(siteConfig: SiteConfig): Cta {
  const bar = siteConfig.announcementBar;
  if (
    bar?.enabled &&
    bar.cta?.label?.trim() &&
    bar.cta.href?.trim()
  ) {
    return bar.cta;
  }
  return FALLBACK_HEADER_CTA;
}
