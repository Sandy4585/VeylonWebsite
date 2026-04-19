import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily constructs a singleton Resend client. Throws if `RESEND_API_KEY` is missing. */
export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env.local (see .env.local.example) to enable outbound email.",
    );
  }
  if (!client) {
    client = new Resend(key);
  }
  return client;
}
