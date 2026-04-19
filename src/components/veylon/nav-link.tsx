"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export type NavLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function NavLink({ href, className, children }: NavLinkProps) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "border-b-2 border-transparent pb-0.5 text-sm font-medium transition-colors",
        active
          ? "border-amber-500 text-amber-600"
          : "text-slate-700 hover:text-navy-900",
        className,
      )}
    >
      {children}
    </Link>
  );
}
