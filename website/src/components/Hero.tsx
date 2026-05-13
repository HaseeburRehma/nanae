"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HERO_IMAGES = [
  { src: "/images/hero/hero-1.png", alt: "Nanae bei der Büroreinigung" },
  { src: "/images/hero/hero-2.png", alt: "Nanae Reinigungsservice in Aktion" },
  { src: "/images/hero/hero-3.png", alt: "Detailgenaue Reinigungsarbeit" },
  { src: "/images/hero/hero-4.png", alt: "Praxis- und Klinikreinigung" },
  { src: "/images/hero/hero-5.png", alt: "Sauberes Treppenhaus durch Nanae" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative bg-brand-light"
    >
      <div className="container-x grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:gap-20 xl:py-24">
        {/* Left: Content */}
        <div className="relative max-w-[600px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-[0_2px_8px_rgba(15,23,42,0.04)] ring-1 ring-ink-200/40 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Reinigungsservice · Essen &amp; Umgebung
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mt-6 text-[36px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-[42px] lg:text-[48px] xl:text-[54px]"
          >
            Ich bin Nanae.
            <br />
            <span className="text-brand">Ich reinige</span> – ehrlich,
            <br className="hidden sm:block" />
            <span className="sm:inline"> zuverlässig,</span>
            <br className="hidden sm:block" />
            <span className="sm:inline"> persönlich.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-ink-muted sm:mt-6 md:text-[17px]"
          >
            Kein großes Unternehmen, keine anonyme Firma. Ein echter Mensch, der
            vorbeikommt, die Ärmel hochkrempelt und die Arbeit so erledigt, wie
            du es dir wünschst.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
          >
            <a href="/kontakt" className="btn-primary">
              Jetzt Anfrage senden
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/491XXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              WhatsApp schreiben
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-wrap items-stretch gap-x-6 gap-y-4 sm:mt-12 sm:gap-x-10"
          >
            <Stat value="100%" label="ehrliche Arbeit" />
            <div className="hidden w-px self-stretch bg-ink-200/70 sm:block" />
            <Stat value="@nanae_service" label="auf Instagram folgen" />
            <div className="hidden w-px self-stretch bg-ink-200/70 sm:block" />
            <Stat value="< 24 Std" label="schnelle Antwort" />
          </motion.div>
        </div>

        {/* Right: Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          <div className="relative mx-auto aspect-[588/620] w-full max-w-[620px] overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(15,23,42,0.4)] ring-1 ring-black/5 lg:max-w-none">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              pagination={{ clickable: true }}
              className="h-full w-full"
              a11y={{ enabled: true }}
            >
              {HERO_IMAGES.map((img, idx) => (
                <SwiperSlide key={img.src} className="!h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 620px"
                    priority={idx === 0}
                    className="object-cover object-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[90px]">
      <div className="text-[17px] font-extrabold leading-tight tracking-tight text-ink sm:text-lg">
        {value}
      </div>
      <div className="mt-1 text-xs leading-tight text-ink-muted sm:text-[13px]">
        {label}
      </div>
    </div>
  );
}
