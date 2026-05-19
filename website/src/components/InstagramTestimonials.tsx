"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Instagram reel permalinks. Add new reels by pushing a URL here.
 * The embed iframe is derived from the slug between /reel/ (or /p/) and the
 * next slash.
 */
/**
 * Hard-coded fallback list used while the page is still hydrating and
 * before /api/ig-reels has resolved. Once the Graph API token is set in
 * the env, the live list replaces this on mount.
 */
const FALLBACK_REELS = [
  "https://www.instagram.com/nanae_service/reel/DYEBMbsMMYM/",
  "https://www.instagram.com/nanae_service/reel/DYPu8-QsLtg/",
  "https://www.instagram.com/nanae_service/reel/DYM1hheSJVm/",
  "https://www.instagram.com/enes_seker/reel/DXsGMtNDKP4/",
  "https://www.instagram.com/enes_seker/reel/DXbco_SDE_s/",
  "https://www.instagram.com/enes_seker/reel/DXfGWoZjOZv/",
];

/**
 * Convert any Instagram URL (reel / post / tv) into its public /embed/
 * iframe URL. We append "captioned" so Instagram returns the modern,
 * styled card with thumbnail + like/comment counts.
 */
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    let kind = "p";
    let id: string | null = null;
    for (let i = 0; i < parts.length; i++) {
      if (["p", "reel", "tv"].includes(parts[i])) {
        kind = parts[i];
        id = parts[i + 1] ?? null;
        break;
      }
    }
    if (!id) return url;
    // Plain /embed/ (no caption) — minimal Instagram chrome
    return `https://www.instagram.com/${kind}/${id}/embed/`;
  } catch {
    return url;
  }
}

/**
 * Renders the IG embed iframe inside a 9:16 frame, with the iframe pulled
 * upward by 56px so the "@user · View profile" header is hidden, and made
 * tall enough that the bottom likes/comments/caption strip is cropped off
 * the bottom by the container's `overflow-hidden`.
 *
 *      ┌─────────────────────┐  ← container (9:16, overflow-hidden)
 *      │  ··· hidden header  │
 *  ────│    REEL VIDEO       │  ← only this is visible
 *      │  ··· hidden footer  │
 *      └─────────────────────┘
 */
/**
 * Visible card shows ONLY the reel's video, with the play button centered.
 *
 * Method:
 *  - 9 / 13 card aspect — slightly less tall than the full 9 / 16 video
 *    aspect inside the embed, so the visible window sits comfortably
 *    inside the video area with header above + footer below cropped.
 *  - iframe is positioned absolutely at left:50% top:50% and translated
 *    with -50%/-50% so its OWN centre snaps to the card's centre. That
 *    means the play button (always at IG's video centre) lands at the
 *    card's centre on every screen size, regardless of width.
 *  - iframe is rendered ~140 % wide so IG's internal side letterboxing
 *    sits beyond the card edges (clipped by overflow-hidden).
 *  - iframe height is generous (160 % of card) so header & footer land
 *    far outside the visible band.
 */
function ReelEmbed({ url }: { url: string }) {
  return (
    <div className="relative aspect-[9/13] w-full overflow-hidden rounded-2xl bg-black shadow-card ring-1 ring-black/10">
      <iframe
        src={toEmbedUrl(url)}
        title={`Instagram Reel ${url}`}
        loading="lazy"
        scrolling="no"
        allow="autoplay; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
        style={{
          width: "140%",
          height: "160%",
        }}
      />
      {/* Safety mask — guarantees no footer pixels leak at the bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-black" />
    </div>
  );
}

export function InstagramTestimonials() {
  const [mounted, setMounted] = useState(false);
  const [reels, setReels] = useState<string[]>(FALLBACK_REELS);

  useEffect(() => {
    setMounted(true);
    // Auto-update: pull the latest reels from /api/ig-reels.
    // Falls back silently to FALLBACK_REELS if the API isn't configured.
    let cancelled = false;
    fetch("/api/ig-reels")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.reels) && data.reels.length) {
          setReels(data.reels);
        }
      })
      .catch(() => {
        // ignore — fallback already in state
      });
    return () => {
      cancelled = true;
    };
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

      {/* Real Instagram embed iframes */}
      <div className="mt-12 bg-ink py-10 sm:py-14">
        <div className="container-x">
          {mounted && (
            <>
              {/* Desktop / tablet — flush 4-up row */}
              <div className="hidden sm:block">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={2}
                  spaceBetween={4}
                  loop={reels.length > 1}
                  autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: { slidesPerView: 3, spaceBetween: 4 },
                    1024: { slidesPerView: 4, spaceBetween: 4 },
                    1280: { slidesPerView: 4, spaceBetween: 6 },
                  }}
                  className="instagram-swiper !pb-12"
                >
                  {reels.map((url) => (
                    <SwiperSlide key={url} className="!h-auto">
                      <ReelEmbed url={url} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Mobile — single reel */}
              <div className="sm:hidden">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  spaceBetween={0}
                  loop
                  autoplay={{ delay: 6000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="instagram-swiper !pb-10"
                >
                  {reels.map((url) => (
                    <SwiperSlide key={url} className="!h-auto">
                      <ReelEmbed url={url} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Testimonials slider — temporarily deactivated. */}
      {false && (
        <div className="container-x mt-20">
          <p className="text-center text-ink-muted">Stimmen kommen bald.</p>
        </div>
      )}
    </section>
  );
}
