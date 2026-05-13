"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Instagram reels — each entry pairs a real reel URL with a local
 * thumbnail (from /public/images/brand/) shown as the card preview.
 * Clicking a card opens the reel on instagram.com in a new tab.
 *
 * To add a new reel:
 *   1. Push a new { url, thumb, caption } object into IG_REELS.
 *   2. Thumb path is relative to /public.
 */
const IG_REELS = [
  {
    url: "https://www.instagram.com/nanae_service/reel/DYEBMbsMMYM/",
    thumb: "/images/brand/01-mop-office-white.png",
    caption: "Saubere Büros, ehrliche Arbeit.",
  },
  {
    url: "https://www.instagram.com/nanae_service/reel/DYPu8-QsLtg/",
    thumb: "/images/brand/03-window-squeegee.png",
    caption: "Streifenfreie Fenster – jedes Mal.",
  },
  {
    url: "https://www.instagram.com/nanae_service/reel/DYM1hheSJVm/",
    thumb: "/images/brand/10-vacuum-office-blue.png",
    caption: "Frisch gesaugt, sofort einsatzbereit.",
  },
  {
    url: "https://www.instagram.com/enes_seker/reel/DXsGMtNDKP4/",
    thumb: "/images/brand/09-medical-chairs.png",
    caption: "Hygiene in der Praxis.",
  },
  {
    url: "https://www.instagram.com/enes_seker/reel/DXbco_SDE_s/",
    thumb: "/images/brand/07-bathroom-mirror.png",
    caption: "Sanitärbereich glänzend sauber.",
  },
  {
    url: "https://www.instagram.com/enes_seker/reel/DXfGWoZjOZv/",
    thumb: "/images/brand/05-stairwell-mop.png",
    caption: "Treppenhaus – Empfang für Gäste.",
  },
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

function ReelCard({
  url,
  thumb,
  caption,
}: {
  url: string;
  thumb: string;
  caption: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Instagram Reel öffnen: ${caption}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-card ring-1 ring-black/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-cardHover"
    >
      {/* Thumbnail */}
      <Image
        src={thumb}
        alt={caption}
        fill
        quality={90}
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 240px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />

      {/* Header — profile chip */}
      <div className="absolute left-3 right-3 top-3 flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand text-[10px] font-extrabold text-white ring-2 ring-white/80">
          N
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-[12px] font-bold text-white">
            @nanae_service
          </div>
          <div className="truncate text-[10px] text-white/75">Reel</div>
        </div>
      </div>

      {/* Centered play button — Instagram brand gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-[3px] ring-white/20 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16"
          style={{
            background:
              "linear-gradient(135deg, #FEDA77 0%, #F58529 25%, #DD2A7B 55%, #8134AF 80%, #515BD4 100%)",
          }}
        >
          <Play
            className="ml-1 h-6 w-6 text-white sm:h-7 sm:w-7"
            fill="white"
            strokeWidth={0}
          />
        </div>
      </div>

      {/* Bottom caption */}
      <div className="absolute inset-x-3 bottom-3">
        <p className="line-clamp-2 text-[13px] font-semibold leading-tight text-white drop-shadow">
          {caption}
        </p>
        <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-white/80">
          Auf Instagram ansehen
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </a>
  );
}

export function InstagramTestimonials() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="referenzen"
      className="overflow-hidden bg-white section-padding"
    >
      {/* Instagram intro */}
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
            href="https://www.instagram.com/nanae_service/"
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
      </div>

      {/* Reels strip — dark band with custom preview cards */}
      <div className="mt-12 bg-ink py-10 sm:py-14">
        <div className="container-x">
          {/* Desktop / tablet grid */}
          <div className="hidden grid-cols-6 gap-3 sm:grid lg:gap-4">
            {IG_REELS.map((reel) => (
              <ReelCard key={reel.url} {...reel} />
            ))}
          </div>

          {/* Mobile slider */}
          <div className="instagram-swiper sm:hidden">
            {mounted && (
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1.4}
                spaceBetween={14}
                loop
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                centeredSlides
                className="!pb-10"
              >
                {IG_REELS.map((reel) => (
                  <SwiperSlide key={reel.url} className="!h-auto">
                    <ReelCard {...reel} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
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
          className="testimonials-swiper mt-10"
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
