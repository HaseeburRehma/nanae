"use client";

import Image from "next/image";
import { Check, Clock, Heart, Quote } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Check,
    title: "Ehrliche Arbeit",
    desc: "Was ich verspreche, das halte ich.",
  },
  {
    icon: Clock,
    title: "Zuverlässig",
    desc: "Pünktlich, vorbereitet, gewissenhaft.",
  },
  {
    icon: Heart,
    title: "Persönlich",
    desc: "Direkter Kontakt, ohne Umwege.",
  },
];

export function About() {
  return (
    <section id="ueber-mich" className="bg-white section-padding">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image with quote overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[5/6] w-full max-w-[520px] overflow-hidden rounded-card shadow-[0_24px_60px_-30px_rgba(15,23,42,0.3)]">
            <Image
              src="/images/brand/03-window-squeegee.png"
              alt="Nanae bei der Fensterreinigung mit Abzieher"
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-center"
            />
          </div>

          {/* Quote card overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 max-w-[360px] rounded-2xl bg-white p-5 shadow-float ring-1 ring-black/5 sm:left-10 sm:p-6">
            <Quote className="h-5 w-5 text-brand" aria-hidden />
            <p className="mt-2 text-sm font-medium leading-relaxed text-ink sm:text-[15px]">
              Ich tue genau das, was ich versprochen habe – nicht weniger, nicht
              mehr.
            </p>
            <p className="mt-3 text-xs text-ink-muted">
              Foto: Nanae · echtes Bild
            </p>
          </div>
        </motion.div>

        {/* Text + Features */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pill"
          >
            Über mich
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[42px]"
          >
            Eine echte Person hinter der Arbeit.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-ink-muted md:text-base"
          >
            Mein Weg begann auf Instagram – ehrlich, ohne Filter, einfach mit
            dem Wunsch, Arbeit zu finden. Heute reinige ich Büros, Wohnungen
            und Praxen in der Region. Kein Callcenter, keine Subunternehmer. Du
            sprichst direkt mit mir, und ich stehe für jedes Detail meiner
            Arbeit gerade.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="card-base p-5 ring-1 ring-ink-200/60 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <feature.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
