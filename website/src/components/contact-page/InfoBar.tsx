"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, Target, Diamond } from "lucide-react";

const ITEMS = [
  {
    icon: Clock,
    label: "Öffnungszeiten",
    value: "Mo – Sa · 8:00 – 19:00",
  },
  {
    icon: CheckCircle2,
    label: "Antwortzeit",
    value: "Innerhalb von 24 Stunden",
  },
  {
    icon: Target,
    label: "Servicegebiet",
    value: "Essen + 30 km Umkreis",
  },
  {
    icon: Diamond,
    label: "Sprachen",
    value: "Deutsch · English · العربية",
  },
];

export function InfoBar() {
  return (
    <section className="bg-brand-light pb-20 lg:pb-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200/40 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 sm:gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    {item.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-ink sm:text-[15px]">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
