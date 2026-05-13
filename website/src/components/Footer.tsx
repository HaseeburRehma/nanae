"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

const LEISTUNGEN = [
  "Büroreinigung",
  "Wohnungsreinigung",
  "Fensterreinigung",
  "Grundreinigung",
  "Praxisreinigung",
  "Treppenhaus",
];

const ENTDECKEN = [
  { label: "Über mich", href: "#ueber-mich" },
  { label: "Referenzen", href: "#referenzen" },
  { label: "Instagram", href: "https://instagram.com/nanae_service" },
  { label: "Kontakt", href: "/kontakt" },
];

const SOCIAL = [
  {
    Icon: Instagram,
    href: "https://www.instagram.com/nanae_service/",
    label: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-200/60 bg-white">
      <div className="container-x py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12">
          <div className="sm:col-span-2 md:col-span-5">
            <Image
              src="/logo.svg"
              alt="Nanae Reinigungsservice"
              width={160}
              height={52}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Reinigungsservice mit Gesicht. Persönlich, ehrlich, vor Ort in
              Hamburg und Umgebung.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand transition-all duration-300 hover:bg-brand hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-ink">
              Leistungen
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {LEISTUNGEN.map((item) => (
                <li key={item}>
                  <a
                    href="#leistungen"
                    className="text-sm text-ink-muted transition-colors hover:text-brand"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-wider text-ink">
              Entdecken
            </div>
            <ul className="mt-5 flex flex-col gap-3">
              {ENTDECKEN.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-sm text-ink-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-bold uppercase tracking-wider text-ink">
              Sag Hallo
            </div>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <div className="text-xs uppercase tracking-wide text-ink-muted">
                  E-Mail
                </div>
                <a
                  href="mailto:info@nanae.de"
                  className="font-semibold text-ink hover:text-brand"
                >
                  info@nanae.de
                </a>
              </li>
              <li>
                <div className="text-xs uppercase tracking-wide text-ink-muted">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/491XXXXXXXXX"
                  className="font-semibold text-ink hover:text-brand"
                >
                  +49 1XX XXX XX XX
                </a>
              </li>
              <li>
                <div className="text-xs uppercase tracking-wide text-ink-muted">
                  Standort
                </div>
                <div className="font-semibold text-ink">
                  Germaniaplatz 1, 45355 Essen
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © 2026 Nanae · Reinigungsservice. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-xs text-ink-muted">
            <a href="#" className="hover:text-brand">
              Impressum
            </a>
            <a href="#" className="hover:text-brand">
              Datenschutz
            </a>
            <a href="#" className="hover:text-brand">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
