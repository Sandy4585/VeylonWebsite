"use client";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/veylon/container";
import { CtaButton } from "@/components/veylon/cta-button";
import { Logo } from "@/components/veylon/logo";
import { NavLink } from "@/components/veylon/nav-link";
import type { Cta, NavItem } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type SiteHeaderClientProps = {
  primaryNav: NavItem[];
  headerCta: Cta;
};

export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur",
        scrolled && "shadow-sm",
      )}
    >
      {children}
    </header>
  );
}

function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <nav
      className="hidden min-w-0 flex-1 items-center justify-center gap-8 md:flex"
      aria-label="Primary"
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        if (hasChildren) {
          return (
            <DropdownMenu key={`${item.href}-${item.label}`}>
              <DropdownMenuTrigger className="flex items-center gap-1 border-b-2 border-transparent pb-0.5 text-sm font-medium text-slate-700 outline-none hover:text-navy-900 data-[state=open]:text-navy-900">
                {item.label}
                <ChevronDownIcon className="size-4 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[12rem]">
                {item.children?.map((child) => (
                  <DropdownMenuItem key={`${child.href}-${child.label}`} asChild>
                    <Link href={child.href}>{child.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <NavLink key={`${item.href}-${item.label}`} href={item.href}>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function MobileNav({
  items,
  headerCta,
}: {
  items: NavItem[];
  headerCta: Cta;
}) {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
        aria-label="Open menu"
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="flex h-full flex-col gap-0 p-0">
        <SheetHeader className="border-b border-slate-200 p-4">
          <SheetTitle className="text-left text-slate-900">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile primary">
          {items.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            if (hasChildren) {
              return (
                <div
                  key={`${item.href}-${item.label}`}
                  className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-b-0"
                >
                  <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    {item.label}
                  </span>
                  <div className="flex flex-col gap-2 pl-2">
                    {item.children?.map((child) => (
                      <Link
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        className="text-base text-slate-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="border-b border-slate-100 py-3 text-base text-slate-800 last:border-b-0"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <CtaButton cta={headerCta} className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeaderClient({
  primaryNav,
  headerCta,
}: SiteHeaderClientProps) {
  return (
    <HeaderFrame>
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 py-2 md:min-h-24 md:py-2.5 lg:min-h-28 lg:py-3">
          <div className="flex min-w-0 shrink-0 items-center">
            <Logo priority />
          </div>
          <DesktopNav items={primaryNav} />
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <CtaButton cta={headerCta} size="sm" />
            </div>
            <div className="md:hidden">
              <MobileNav items={primaryNav} headerCta={headerCta} />
            </div>
          </div>
        </div>
      </Container>
    </HeaderFrame>
  );
}
