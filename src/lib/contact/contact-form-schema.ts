import { z } from "zod";

const e164Regex = /^\+[1-9]\d{1,14}$/;

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().trim().email({ message: "Enter a valid email address" }),
    phone: z.string().trim().optional(),
    department: z.string().trim().min(1, { message: "Select a department" }),
    company: z.string().trim().optional(),
    message: z
      .string()
      .trim()
      .min(20, { message: "Message must be at least 20 characters" })
      .max(1000, { message: "Message must be at most 1000 characters" }),
    consent: z.boolean().refine((val) => val === true, {
      message: "Consent is required to submit this form",
    }),
    requireCompanyField: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.requireCompanyField && (!data.company || data.company.length < 1)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company is required",
        path: ["company"],
      });
    }
    const phone = data.phone?.trim();
    if (phone && !e164Regex.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Use international format with country code (e.g. +919876543210)",
        path: ["phone"],
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;
