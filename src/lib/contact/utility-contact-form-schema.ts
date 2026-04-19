import { z } from "zod";

export const utilityContactFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().trim().email({ message: "Enter a valid email address" }),
  company: z.string().trim().min(1, { message: "Company is required" }),
  message: z
    .string()
    .trim()
    .min(50, { message: "Project details must be at least 50 characters" })
    .max(4000, { message: "Project details must be at most 4000 characters" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent is required to submit this form",
  }),
  department: z.literal("Utility-scale inquiry"),
});

export type UtilityContactFormValues = z.infer<typeof utilityContactFormSchema>;
