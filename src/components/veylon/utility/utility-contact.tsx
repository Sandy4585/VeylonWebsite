import type { UtilityContactFormBlock } from "@/lib/sanity/types";

import { UtilityContactForm } from "./utility-contact-form";

export type UtilityContactProps = {
  contactForm: UtilityContactFormBlock | undefined;
  contactEmail: string;
};

export function UtilityContact({ contactForm, contactEmail }: UtilityContactProps) {
  if (!contactForm?.headline?.trim() || !contactForm.recipientRole?.trim()) {
    return null;
  }

  return (
    <UtilityContactForm
      contactEmail={contactEmail}
      headline={contactForm.headline}
      description={contactForm.description}
      recipientRole={contactForm.recipientRole}
    />
  );
}
