import { cn } from "@/lib/utils";

export type SectionProps = {
  tone?: "default" | "navy" | "slate" | "amber-tint";
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const spacingClass: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-7 md:py-12",
  md: "py-12 md:py-20",
  lg: "py-[4.5rem] md:py-[7.5rem]",
  xl: "py-24 md:py-40",
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  navy:
    "bg-navy-900 text-slate-50 [&_a:not([data-slot=veylon-button])]:text-amber-400 [&_a:not([data-slot=veylon-button]):hover]:text-amber-300 [&_strong]:text-slate-50 [&_[data-component=eyebrow]]:text-amber-400 [&_[data-component=headline]]:text-slate-50 [&_[data-component=subheadline]]:text-slate-200",
  slate: "bg-slate-100 text-slate-900",
  "amber-tint": "bg-amber-50 text-slate-900",
};

export function Section({
  tone = "default",
  spacing = "lg",
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(spacingClass[spacing], toneClass[tone], className)}
    >
      {children}
    </section>
  );
}
