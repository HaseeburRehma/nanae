"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  MapPin,
  Navigation,
} from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative">
      {/* Image hero */}
      <div className="relative h-[320px] w-full sm:h-[380px] md:h-[440px] lg:h-[460px]">
        <Image
          src="/images/contact/page-hero.png"
          alt="Nanae Reinigungsservice"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/45 to-ink/55" />

        <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand"
          >
            <span className="h-2 w-2 rounded-full bg-brand" />
            Kontakt
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[64px]"
          >
            Lass uns sprechen.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/90 md:text-base"
          >
            Drei Wege, mich zu erreichen – such dir aus, was für dich am
            bequemsten ist. Ich antworte persönlich, meist innerhalb von 24
            Stunden.
          </motion.p>
        </div>
      </div>

      {/* Contact cards row — overlaps hero */}
      <div className="container-x relative z-20 -mt-12 sm:-mt-16 md:-mt-20">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          <ContactCard
            kind="primary"
            label="E-Mail"
            icon={<Mail className="h-5 w-5" />}
            value="info@nanae.de"
            desc="Schreib mir – ideal für ausführliche Anfragen, Angebote und Termine im Voraus."
            cta="E-Mail schreiben"
            href="mailto:info@nanae.de"
          />
          <ContactCard
            kind="default"
            label="Anrufen"
            icon={<MessageCircle className="h-5 w-5" />}
            value="+49 1XX XXX XX XX"
            desc="Direkt, persönlich und ohne Umwege. Mo–Sa, 8:00 – 19:00 Uhr."
            cta="Jetzt anrufen"
            href="tel:+491XXXXXXXXX"
          />
          <ContactCard
            kind="default"
            label="Adresse"
            icon={<MapPin className="h-5 w-5" />}
            value="Essen & Umgebung"
            desc="Ich komme zu dir – innerhalb von Hamburg und im Umkreis von 30 km."
            cta="Route ansehen"
            href="https://maps.google.com/?q=Germaniaplatz+1,+45355+Essen"
            external
            ctaIcon={<Navigation className="h-3.5 w-3.5" />}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  kind,
  label,
  icon,
  value,
  desc,
  cta,
  href,
  external,
  ctaIcon,
}: {
  kind: "primary" | "default";
  label: string;
  icon: React.ReactNode;
  value: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  ctaIcon?: React.ReactNode;
}) {
  const isPrimary = kind === "primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={[
        "flex flex-col rounded-card p-6 shadow-card ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover sm:p-7",
        isPrimary
          ? "bg-brand text-white ring-brand"
          : "bg-white text-ink ring-ink-200/40",
      ].join(" ")}
    >
      <div
        className={[
          "inline-flex h-11 w-11 items-center justify-center rounded-xl",
          isPrimary ? "bg-white/15 text-white" : "bg-brand-light text-brand",
        ].join(" ")}
      >
        {icon}
      </div>
      <div
        className={[
          "mt-5 text-[11px] font-bold uppercase tracking-wider",
          isPrimary ? "text-white/80" : "text-ink-muted",
        ].join(" ")}
      >
        {label}
      </div>
      <div
        className={[
          "mt-1 text-xl font-extrabold tracking-tight sm:text-[22px]",
          isPrimary ? "text-white" : "text-ink",
        ].join(" ")}
      >
        {value}
      </div>
      <p
        className={[
          "mt-2 flex-1 text-sm leading-relaxed",
          isPrimary ? "text-white/85" : "text-ink-muted",
        ].join(" ")}
      >
        {desc}
      </p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={[
          "mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5",
          isPrimary
            ? "bg-white text-brand hover:shadow-[0_8px_20px_rgba(255,255,255,0.25)]"
            : "bg-brand text-white hover:bg-brand-dark hover:shadow-[0_8px_20px_rgba(0,104,155,0.25)]",
        ].join(" ")}
      >
        {cta}
        {ctaIcon ?? <ArrowRight className="h-3.5 w-3.5" />}
      </a>
    </motion.div>
  );
}
