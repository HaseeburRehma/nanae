"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Über mich", href: "/#ueber-mich" },
  { label: "Referenzen", href: "/#referenzen" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-200/40 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white"
      )}
    >
      <div className="container-x flex h-[76px] items-center justify-between sm:h-[84px]">
        <Link
          href="#top"
          aria-label="Nanae Reinigungsservice"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.svg"
            alt="Nanae Reinigungsservice"
            width={196}
            height={64}
            priority
            className="h-9 w-auto sm:h-11 lg:h-12"
          />
        </Link>

        <nav
          className="hidden items-center gap-9 lg:flex xl:gap-11"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="/kontakt" className="btn-primary !py-3 !text-[13px]">
            Jetzt anfragen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 text-ink transition-colors hover:bg-ink-50 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-x flex flex-col gap-1 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-brand-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full justify-center"
          >
            Jetzt anfragen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
