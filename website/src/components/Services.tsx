"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Square,
  Home,
  Diamond,
  Sparkles,
  Plus,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  title: string;
  desc: string;
  icon: typeof Square;
  /** True for filled blue icon style (the first card) */
  filled?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Büroreinigung",
    desc: "Saubere Arbeitsplätze für produktive Tage – diskret nach Feierabend.",
    icon: Square,
    filled: true,
  },
  {
    title: "Wohnungsreinigung",
    desc: "Dein Zuhause im Glanz. Sorgfältig, ohne Hetze.",
    icon: Home,
  },
  {
    title: "Fensterreinigung",
    desc: "Klare Sicht. Ohne Schlieren, ohne Streifen.",
    icon: Diamond,
  },
  {
    title: "Grundreinigung",
    desc: "Tiefenrein – von der Ecke bis zur Decke.",
    icon: Sparkles,
  },
  {
    title: "Praxis & Klinik",
    desc: "Hygienisch, präzise und absolut vertrauenswürdig.",
    icon: Plus,
  },
  {
    title: "Treppenhaus",
    desc: "Ein sauberer Empfang für Mieter und Gäste.",
    icon: Menu,
  },
];

export function Services() {
  return (
    <section id="leistungen" className="bg-brand-light section-padding">
      <div className="container-x">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pill bg-white"
            >
              Leistungen
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[42px]"
            >
              Was ich für dich reinige.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base md:justify-self-end"
          >
            Sechs Bereiche, in denen ich Erfahrung mitbringe. Jeder Auftrag wird
            mit der gleichen Sorgfalt behandelt – egal ob 30 m² oder 300 m².
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service, i) => (
            <motion.a
              key={service.title}
              href="/kontakt"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.05 + (i % 3) * 0.06 + Math.floor(i / 3) * 0.08,
              }}
              className="group relative flex flex-col rounded-card bg-white p-7 shadow-card ring-1 ring-ink-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
            >
              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                  service.filled
                    ? "bg-brand text-white"
                    : "bg-brand-light text-brand"
                )}
              >
                <service.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-lg font-extrabold tracking-tight text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {service.desc}
              </p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Anfragen
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
