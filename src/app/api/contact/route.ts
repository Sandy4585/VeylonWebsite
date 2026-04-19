import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/contact/contact-form-schema";

export async function POST(request: Request) {
  try {
    let json: unknown;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    console.log("[api/contact]", parsed.data);

    // TODO: Wire Resend integration in Phase 4 for actual email delivery
    // Rate limiting: add before production (e.g. IP / token bucket) — not implemented in this phase.

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
