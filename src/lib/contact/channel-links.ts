import type { ContactChannelType } from "@/lib/sanity/types";

const WHATSAPP_PREFILL =
  "Hello — I'm reaching out from Veylon Energy.";

function digitsOnly(input: string): string {
  return input.replace(/\D/g, "");
}

/** Returns `href` for a full-card link, or `null` when the channel cannot be linked. */
export function getContactChannelHref(
  type: ContactChannelType,
  value: string,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (type === "whatsapp") {
    const n = digitsOnly(trimmed);
    if (!n) return null;
    return `https://wa.me/${n}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;
  }

  if (type === "email") {
    return `mailto:${trimmed}`;
  }

  if (type === "phone") {
    const compact = trimmed.replace(/\s/g, "");
    return `tel:${compact}`;
  }

  if (type === "office") {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmed)}`;
  }

  return null;
}
