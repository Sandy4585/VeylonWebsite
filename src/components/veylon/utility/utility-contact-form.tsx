"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/veylon/button";
import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import {
  utilityContactFormSchema,
  type UtilityContactFormValues,
} from "@/lib/contact/utility-contact-form-schema";

export type UtilityContactFormProps = {
  contactEmail: string;
  headline: string;
  description?: string;
  recipientRole: string;
};

export function UtilityContactForm({
  contactEmail,
  headline,
  description,
  recipientRole,
}: UtilityContactFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<UtilityContactFormValues>({
    resolver: zodResolver(utilityContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      consent: false,
      department: "Utility-scale inquiry",
    },
  });

  async function onSubmit(values: UtilityContactFormValues) {
    setSubmitError(null);

    const payload: UtilityContactFormValues = {
      ...values,
      department: "Utility-scale inquiry",
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let message = "Something went wrong. Please try again.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data.error) message = data.error;
      } catch {
        /* ignore */
      }
      setSubmitError(message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <Section tone="slate" spacing="lg">
        <Container>
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <CheckCircle2
              className="mx-auto size-12 text-green-500"
              strokeWidth={1.75}
              aria-hidden
            />
            <p className="mt-6 font-serif text-2xl font-medium text-navy-900">
              Thanks — we&apos;ll be in touch.
            </p>
            <p className="mt-3 font-sans text-sm text-slate-600">
              Expect a reply within one business day.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <h2 className="font-serif text-4xl text-navy-900">{headline}</h2>
        {description ? (
          <p className="mt-6 font-sans text-base leading-relaxed text-slate-700">{description}</p>
        ) : null}
        <p className="mt-6 font-sans text-sm text-slate-600">
          Inquiries go directly to {recipientRole}
        </p>
        {contactEmail ? (
          <p className="mt-4 font-sans text-sm text-slate-600">
            Or email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-amber-700 underline decoration-amber-700/30 underline-offset-4 hover:text-amber-800"
            >
              {contactEmail}
            </a>{" "}
            directly
          </p>
        ) : null}
      </div>
      <div className="lg:col-span-7">
        {submitError ? (
          <p
            role="alert"
            className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
          >
            {submitError}
          </p>
        ) : null}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input autoComplete="organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project details</FormLabel>
                    <FormControl>
                      <Textarea rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mt-1 size-4 shrink-0 rounded border-slate-300 text-navy-900 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-sans font-normal text-slate-700">
                        I agree to be contacted about my inquiry
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Request a conversation"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
        </div>
      </Container>
    </Section>
  );
}
