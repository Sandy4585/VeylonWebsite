import { cn } from "@/lib/utils";

export type ContainerProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
};

const maxWidthClass: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-[48rem]",
  md: "max-w-[60rem]",
  lg: "max-w-[var(--container-max)]",
  xl: "max-w-[87.5rem]",
};

export function Container({
  size = "lg",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12 lg:px-16",
        maxWidthClass[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
