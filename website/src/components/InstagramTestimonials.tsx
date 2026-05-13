"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Add new Instagram post IDs here as Nanae posts them.
 * A post ID is the slug between `/p/` and the next `/` in the URL.
 * e.g. https://www.instagram.com/p/DYM1hheSJVm/ → "DYM1hheSJVm"
 */
const IG_POSTS = [
  "DYM1hheSJVm",
  "DYM1hheSJVm",
  "DYM1hheSJVm",
  "DYM1hheSJVm",
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Büroleitung, Hamburg",
    initials: "S",
    quote:
      "Pünktlich, freundlich und gründlich. Unser Büro sieht nach jedem Termin aus wie neu – und Nanae denkt mit.",
  },
  {
    name: "Markus L.",
    role: "Privatkunde, Altona",
    initials: "M",
    quote:
      "Endlich jemand, dem ich vertrauen kann. Klare Absprachen, ehrliche Preise und wirklich saubere Fenster.",
  },
  {
    name: "Dr. Anja K.",
    role: "Praxisinhaberin, Eppendorf",
    initials: "D",
    quote:
      "Unsere Praxis muss makellos sein. Nanae nimmt das genauso ernst wie wir. Kein Detail wird übersehen.",
  },
  {
    name: "Lukas B.",
    role: "Inhaber, Café Ostend",
    initials: "L",
    quote:
      "Vom ersten Anruf bis zum letzten Wischzug – alles unkompliziert. Mein Café strahlt jeden Morgen.",
  },
  {
    name: "Mira H.",
    role: "Privatkundin, Rüttenscheid",
    initials: "M",
    quote:
      "Nanae arbeitet so sorgfältig, als wäre es ihr eigenes Zuhause. Ich empfehle sie weiter ohne zu zögern.",
  },
];

export function InstagramTestimonials() {
  return (
    <section
      id="referenzen"
      className="overflow-hidden bg-white section-padding"
    >
      {/* Instagram part */}
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pill"
          >
            Instagram
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[42px]"
          >
            Folge mir auf Instagram.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-muted md:text-base"
          >
            Hier hat alles angefangen – und hier teile ich weiterhin echte
            Einblicke aus dem Arbeitsalltag.
          </motion.p>
          <motion.a
            href="https://instagram.com/nanae_service"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="btn-primary mt-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            @nanae_service
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Live Instagram embed slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 instagram-swiper"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop={IG_POSTS.length > 1}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {IG_POSTS.map((id, idx) => (
              <SwiperSlide key={`${id}-${idx}`} className="!h-auto">
                <div className="mx-auto h-[560px] w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-200/50 sm:h-[600px]">
                  <iframe
                    src={`https://www.instagram.com/p/${id}/embed/?cr=1&v=14`}
                    title={`Instagram Beitrag ${id}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
                    scrolling="no"
                    frameBorder="0"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Testimonials slider */}
      <div className="container-x mt-20">
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pill"
          >
            Stimmen
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[40px]"
          >
            Was Kund:innen über meine Arbeit sagen.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 testimonials-swiper"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            loop
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name} className="!h-auto">
                <div className="card-base h-full p-7 ring-1 ring-ink-200/50 hover:-translate-y-1 hover:shadow-cardHover">
                  <div className="flex gap-1 text-brand">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink">
                    &bdquo;{t.quote}&ldquo;
                  </p>
                  <div className="mt-7 flex items-center gap-3 border-t border-ink-200/60 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-brand">
                      {t.initials}
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-ink">
                        {t.name}
                      </div>
                      <div className="text-xs text-ink-muted">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
