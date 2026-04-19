import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/contact/contact-form-schema";
import { utilityContactFormSchema } from "@/lib/contact/utility-contact-form-schema";
import { contactInquiryTemplate } from "@/lib/email/contact-inquiry-template";
import { getResend } from "@/lib/email/resend-client";

function emailConfigError(): NextResponse {
  console.error(
    "[api/contact] Missing CONTACT_FROM_EMAIL or CONTACT_RECIPIENT_EMAIL — set both in .env.local",
  );
  return NextResponse.json({ error: "Could not deliver message" }, { status: 500 });
}

async function sendInquiryEmail(
  input: Parameters<typeof contactInquiryTemplate>[0],
  replyTo: string,
): Promise<NextResponse> {
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  if (!from || !to) {
    return emailConfigError();
  }

  try {
    const resend = getResend();
    const { subject, html, text } = contactInquiryTemplate(input);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[api/contact] Resend send failed:", error);
      return NextResponse.json({ error: "Could not deliver message" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[api/contact] Email dispatch error:", err);
    return NextResponse.json({ error: "Could not deliver message" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsedUtility = utilityContactFormSchema.safeParse(json);
    if (parsedUtility.success) {
      const data = parsedUtility.data;
      return sendInquiryEmail({ kind: "utility", data }, data.email);
    }

    const parsed = contactFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    return sendInquiryEmail({ kind: "general", data }, data.email);
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
