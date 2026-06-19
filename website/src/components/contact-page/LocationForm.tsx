"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnfrageForm } from "@/components/AnfrageForm";

export function LocationForm() {
  return (
    <section className="bg-brand-light py-20 lg:py-24">
      <div className="container-x">
        {/* Header row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pill bg-white"
            >
              Standort &amp; Anfrage
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-[42px]"
            >
              Hier findest du mich.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base md:justify-self-end"
          >
            Ich bin in Essen und im Umkreis unterwegs. Schick mir die Nachricht
            – ich melde mich noch heute zurück.
          </motion.p>
        </div>

        {/* Split row */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-7">
          {/* Image (location card is baked into the image) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[420px] w-full overflow-hidden rounded-card shadow-card ring-1 ring-ink-200/40 lg:min-h-0 lg:h-full"
          >
            <Image
              src="/images/brand/nanae-bucket-portrait.jpg"
              alt="Nanae mit Reinigungseimer im Einsatz in Essen"
              fill
              quality={95}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 620px"
              className="object-cover object-[center_top]"
            />
          </motion.div>

          {/* Shared Anfrage form (same as homepage Kontakt section) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <AnfrageForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
