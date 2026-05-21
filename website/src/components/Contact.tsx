"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { AnfrageForm } from "@/components/AnfrageForm";

const CONTACT_CARDS = [
  {
    title: "WhatsApp",
    value: "+49 1521 0692909",
    desc: "Schnellste Antwort, meist sofort.",
    href: "https://wa.me/4915210692909",
    icon: MessageCircle,
    dotColor: "bg-success",
  },
  {
    title: "E-Mail",
    value: "info@nanae.de",
    desc: "Für ausführliche Anfragen.",
    href: "mailto:info@nanae.de",
    icon: Mail,
    dotColor: "bg-brand",
  },
  {
    title: "Instagram",
    value: "@nanae_service",
    desc: "Folge mir & schreib mir per DM.",
    href: "https://instagram.com/nanae_service",
    icon: Instagram,
    dotColor: "bg-brand",
  },
];

export function Contact() {
  return (
    <section id="kontakt" className="bg-brand-light section-padding">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Left: Contact info */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pill bg-white"
          >
            Kontakt
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[42px]"
          >
            Kostenlose Anfrage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base"
          >
            Schreib mir kurz, worum es geht – ich melde mich innerhalb von 24
            Stunden persönlich bei dir zurück. Bevorzugst du WhatsApp? Auch
            gerne.
          </motion.p>

          <div className="mt-7 flex flex-col gap-3">
            {CONTACT_CARDS.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group flex items-center gap-4 rounded-card bg-white p-4 shadow-card ring-1 ring-ink-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <card.icon className="h-5 w-5" strokeWidth={2} />
                  <span
                    className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${card.dotColor}`}
                  />
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {card.title}
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold text-ink">
                    {card.value}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">
                    {card.desc}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Shared Anfrage form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnfrageForm />
        </motion.div>
      </div>
    </section>
  );
}
