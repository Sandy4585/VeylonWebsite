import { cn } from "@/lib/utils";

export type EyebrowProps = {
  className?: string;
  children: React.ReactNode;
};

export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      data-component="eyebrow"
      className={cn(
        "font-sans text-xs font-medium tracking-widest text-amber-600 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

export type HeadlineProps = {
  level?: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
};

const levelClass: Record<NonNullable<HeadlineProps["level"]>, string> = {
  1: "font-serif text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl",
  2: "font-serif text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl",
  3: "font-serif text-xl font-medium tracking-tight md:text-2xl",
};

export function Headline({ level = 2, className, children }: HeadlineProps) {
  const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
  return (
    <Tag
      data-component="headline"
      className={cn(levelClass[level], "text-inherit", className)}
    >
      {children}
    </Tag>
  );
}

export type SubheadlineProps = {
  className?: string;
  children: React.ReactNode;
};

export function Subheadline({ className, children }: SubheadlineProps) {
  return (
    <p
      data-component="subheadline"
      className={cn(
        "max-w-2xl font-sans text-lg leading-relaxed text-slate-700 md:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
}

export type ProseProps = {
  className?: string;
  children: React.ReactNode;
};

export function Prose({ className, children }: ProseProps) {
  return (
    <div
      className={cn(
        "max-w-prose text-base leading-relaxed text-slate-700 [&_[data-component=headline]]:text-slate-900 [&_a]:text-amber-600 [&_a]:underline [&_strong]:font-semibold [&_strong]:text-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
}
