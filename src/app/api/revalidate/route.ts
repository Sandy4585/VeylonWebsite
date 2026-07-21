import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import {
  pathsForSanityDocument,
  type RevalidatePayload,
  tagsForSanityDocument,
} from "@/lib/sanity/revalidate-tags";

function secret(): string | undefined {
  return process.env.SANITY_REVALIDATE_SECRET?.trim() || undefined;
}

function applyRevalidation(payload: RevalidatePayload) {
  const tags = tagsForSanityDocument(payload);
  const paths = pathsForSanityDocument(payload);

  for (const tag of tags) {
    revalidateTag(tag);
  }
  for (const path of paths) {
    revalidatePath(path);
  }

  return { tags, paths };
}

/** Sanity webhook — Configure at https://www.sanity.io/manage → API → Webhooks */
export async function POST(req: NextRequest) {
  const webhookSecret = secret();
  if (!webhookSecret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<RevalidatePayload>(
      req,
      webhookSecret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = applyRevalidation(body);
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      ...result,
    });
  } catch (error) {
    console.error("[api/revalidate]", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

/**
 * Manual purge (after deploy / until webhook is set up):
 * GET /api/revalidate?secret=YOUR_SECRET&tag=projects
 * GET /api/revalidate?secret=YOUR_SECRET&path=/projects
 * GET /api/revalidate?secret=YOUR_SECRET&all=1
 */
export async function GET(req: NextRequest) {
  const webhookSecret = secret();
  if (!webhookSecret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  const provided = req.nextUrl.searchParams.get("secret");
  if (!provided || provided !== webhookSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const all = req.nextUrl.searchParams.get("all") === "1";
  const tag = req.nextUrl.searchParams.get("tag");
  const path = req.nextUrl.searchParams.get("path");

  const tags: string[] = [];
  const paths: string[] = [];

  if (all) {
    const defaults = [
      "projects",
      "homePage",
      "resources",
      "siteConfig",
      "aboutPage",
      "contactPage",
      "residential-hub",
      "commercial-hub",
      "utility-scale-page",
    ];
    for (const t of defaults) {
      revalidateTag(t);
      tags.push(t);
    }
    for (const p of [
      "/",
      "/projects",
      "/resources",
      "/about",
      "/contact",
      "/residential",
      "/commercial",
      "/utility-scale",
    ]) {
      revalidatePath(p);
      paths.push(p);
    }
  } else {
    if (tag) {
      revalidateTag(tag);
      tags.push(tag);
    }
    if (path) {
      revalidatePath(path);
      paths.push(path);
    }
  }

  if (!tags.length && !paths.length) {
    return NextResponse.json(
      {
        message:
          "Pass tag=, path=, or all=1 (example: /api/revalidate?secret=…&all=1)",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ revalidated: true, now: Date.now(), tags, paths });
}
