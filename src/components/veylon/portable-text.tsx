import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

import type {
  PageBlockContent,
  ResourceBlockContent,
} from "@/lib/sanity/types";

import { Headline, Prose } from "./typography";
import { VeylonImage } from "./veylon-image";

type LinkMarkValue = {
  _type?: string;
  href?: string;
  external?: boolean;
};

function LinkMark({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: LinkMarkValue;
}) {
  const href = value?.href ?? "#";
  const external = Boolean(value?.external);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-amber-600 underline decoration-amber-600/40 underline-offset-4 hover:text-amber-700"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="font-medium text-amber-600 underline decoration-amber-600/40 underline-offset-4 hover:text-amber-700"
    >
      {children}
    </Link>
  );
}

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) {
        return `https://www.youtube.com/embed/${v}`;
      }
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" && parts[1]) {
        return `https://www.youtube.com/embed/${parts[1]}`;
      }
    }
  } catch {
    return null;
  }
  return null;
}

const simpleBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <Headline level={3} className="mb-3 mt-6 first:mt-0">
        {children}
      </Headline>
    ),
    h3: ({ children }) => (
      <Headline level={3} className="mb-3 mt-6 text-xl first:mt-0">
        {children}
      </Headline>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-amber-500 pl-4 font-serif text-lg italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: LinkMark,
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

function buildComponents(
  includeTable: boolean,
): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => (
        <p className="mb-4 last:mb-0">{children}</p>
      ),
      h2: ({ children }) => (
        <Headline level={2} className="mb-4 mt-10 first:mt-0">
          {children}
        </Headline>
      ),
      h3: ({ children }) => (
        <Headline level={3} className="mb-3 mt-8 first:mt-0">
          {children}
        </Headline>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-l-4 border-amber-500 pl-4 font-serif text-lg italic text-slate-700">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="my-4 list-disc space-y-2 pl-5">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="my-4 list-decimal space-y-2 pl-5">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      link: LinkMark,
      strong: ({ children }) => (
        <strong className="font-semibold text-slate-900">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
    },
    types: {
      pteCallout: ({ value }) => {
        const tone = value.tone as "info" | "warning" | "success";
        const toneClass =
          tone === "warning"
            ? "border-amber-500/40 bg-amber-50 text-navy-900"
            : tone === "success"
              ? "border-green-500/40 bg-green-500/10 text-navy-900"
              : "border-navy-200 bg-navy-50 text-navy-900";

        return (
          <aside
            className={`my-8 rounded-md border p-4 ${toneClass}`}
          >
            <PortableText
              value={value.body ?? []}
              components={simpleBodyComponents}
            />
          </aside>
        );
      },
      pteYoutube: ({ value }) => {
        const embed = youtubeEmbedUrl(value.url);
        if (!embed) {
          return null;
        }
        return (
          <div className="my-8 aspect-video w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            <iframe
              title="YouTube video"
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      },
      pteTable: ({ value }) => {
        if (!includeTable) {
          return null;
        }
        const rows = value.rows ?? [];
        return (
          <div className="my-8 overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm text-slate-700">
              <tbody>
                {rows.map((row: { _key?: string; cells?: string[] }, i: number) => (
                  <tr
                    key={row._key ?? `row-${i}`}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    {(row.cells ?? []).map((cell, j) => (
                      <td
                        key={`${row._key ?? i}-${j}`}
                        className="px-3 py-2 align-top"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
      richImage: ({ value }) => (
        <div className="my-8">
          <VeylonImage image={value} />
        </div>
      ),
      statBlock: ({ value }) => (
        <div className="my-8 rounded-md border border-slate-200 bg-slate-50 p-6">
          <p className="font-serif text-4xl font-medium text-navy-900">
            {value.value}
          </p>
          <p className="mt-2 font-sans text-lg text-slate-700">{value.label}</p>
          {value.context ? (
            <p className="mt-1 text-sm text-slate-500">{value.context}</p>
          ) : null}
        </div>
      ),
    },
  };
}

export type BlockPortableTextProps = {
  value: PageBlockContent | ResourceBlockContent | null | undefined;
  variant?: "page" | "resource";
  className?: string;
};

export function BlockPortableText({
  value,
  variant = "page",
  className,
}: BlockPortableTextProps) {
  if (!value?.length) {
    return null;
  }

  const includeTable = variant === "resource";
  const components = buildComponents(includeTable);

  return (
    <Prose className={className}>
      <PortableText value={value} components={components} />
    </Prose>
  );
}

/** Alias for `BlockPortableText` — renders Sanity `pageBlockContent` / `resourceBlockContent`. */
export { BlockPortableText as PortableTextRenderer };
