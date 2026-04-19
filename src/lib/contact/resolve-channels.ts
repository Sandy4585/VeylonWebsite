import { portableTextToPlainText } from "@/lib/sanity/plain-text";
import type { ContactChannel, ContactPage, SiteConfig } from "@/lib/sanity/types";

/** Fallback when `contactPage.channels` is empty — uses site configuration. */
export function resolveContactChannels(
  contactPage: ContactPage,
  siteConfig: SiteConfig | null,
): ContactChannel[] {
  const fromCms = contactPage.channels;
  if (fromCms?.length) {
    return fromCms;
  }

  if (!siteConfig) {
    return [];
  }

  const plainAddress = portableTextToPlainText(siteConfig.legalEntity.registeredAddress);
  const waDigits = (siteConfig.whatsappNumber ?? "").replace(/\D/g, "");

  const fallback: ContactChannel[] = [
    { type: "whatsapp", label: "WhatsApp", value: waDigits },
    { type: "email", label: "Email", value: siteConfig.contactEmail },
    { type: "phone", label: "Phone", value: siteConfig.legalEntity.contactPhone },
    {
      type: "office",
      label: "Office",
      value: plainAddress || siteConfig.legalEntity.gstin,
    },
  ];

  return fallback.filter((c) => Boolean(c.value?.trim()));
}
