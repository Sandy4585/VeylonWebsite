import { z } from "zod";

const e164Regex = /^\+[1-9]\d{1,14}$/;

/** After stripping spaces: optional +91 / 91 / 0, then 10-digit Indian mobile (starts 6–9). */
const indianMobileRegex = /^(\+91|91|0)?[6-9]\d{9}$/;

function normalizePhoneInput(s: string): string {
  return s.replace(/\s/g, "");
}

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().trim().email({ message: "Enter a valid email address" }),
    phone: z.string().trim().optional(),
    department: z
      .string()
      .max(200)
      .optional()
      .transform((v) => {
        if (v === undefined) return undefined;
        const t = v.trim();
        return t === "" ? undefined : t;
      }),
    message: z
      .string()
      .trim()
      .min(10, { message: "Message must be at least 10 characters" })
      .max(1000, { message: "Message must be at most 1000 characters" }),
    consent: z.boolean().refine((val) => val === true, {
      message: "Consent is required to submit this form",
    }),
  })
  .superRefine((data, ctx) => {
    const phone = data.phone?.trim();
    if (!phone) return;
    const normalized = normalizePhoneInput(phone);
    const ok = e164Regex.test(normalized) || indianMobileRegex.test(normalized);
    if (!ok) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Use E.164 (+country…) or a valid Indian mobile number",
        path: ["phone"],
      });
    }
  });

/** Parsed payload after validation (use for API + email template) */
export type ContactFormValues = z.output<typeof contactFormSchema>;

/** React Hook Form field values before Zod transforms */
export type ContactFormInput = z.input<typeof contactFormSchema>;
