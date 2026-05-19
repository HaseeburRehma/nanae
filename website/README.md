# Nanae Reinigungsservice — One-Page Website

A pixel-perfect, production-ready one-page website for **Nanae Reinigungsservice** built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Swiper, React Hook Form + Zod.

## Tech Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion |
| Slider | Swiper.js |
| Forms | React Hook Form (validation rules) + Zod (typing & safety net) |
| Toasts | react-hot-toast |
| Icons | Lucide React |
| Font | Inter (next/font/google) |
| Hosting | Vercel-ready |

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

## Project structure

```
website/
├── public/
│   ├── favicon.svg
│   ├── logo.svg                     ← brand logo
│   └── images/
│       ├── hero/                    ← hero slider images (hero-1 → hero-5)
│       ├── about/                   ← about section portrait
│       ├── instagram/               ← instagram marquee tiles
│       └── contact.png              ← (optional)
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← root layout, metadata, LocalBusiness JSON-LD
│   │   ├── page.tsx                 ← composes all sections
│   │   └── globals.css              ← Tailwind + brand tokens + utilities
│   ├── components/
│   │   ├── Navbar.tsx               ← sticky header w/ blur on scroll
│   │   ├── Hero.tsx                 ← two-column hero + Swiper slider
│   │   ├── About.tsx                ← portrait + quote + feature cards
│   │   ├── Services.tsx             ← 6-card service grid
│   │   ├── InstagramTestimonials.tsx← marquee + 3 testimonial cards
│   │   ├── Contact.tsx              ← contact cards + RHF/Zod form
│   │   └── Footer.tsx               ← multi-column footer
│   └── lib/
│       └── utils.ts                 ← cn() helper + SITE constants
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Brand tokens (already wired into Tailwind)

```ts
brand:        rgba(0, 104, 155, 1)   // primary blue
brand-light:  rgba(239, 246, 255, 1) // soft section background
ink:          #0F172A                // headlines
ink-muted:    #64748B                // body text
success:      #10B981                // availability dot
```

Border-radius: `card: 20px`, `button: 12px`, `pill: 9999px`.
Shadows: `shadow-card`, `shadow-cardHover`, `shadow-float`.

## Swapping images

1. **Hero slider** — drop files into `public/images/hero/` and update the `HERO_IMAGES` array at the top of `src/components/Hero.tsx`.
2. **About portrait** — replace `public/images/about/about.png` (same filename = no code change).
3. **Instagram marquee** — drop tiles into `public/images/instagram/` and update the `IG_IMAGES` array at the top of `src/components/InstagramTestimonials.tsx`.
4. **Logo** — replace `public/logo.svg`.

## Sections (one-page layout)

1. **Navbar** — sticky, logo + 4 nav links + primary CTA; mobile drawer w/ hamburger.
2. **Hero** (`#top`) — bold headline, two CTAs, stats row, Swiper auto-play slider (5 s fade), floating availability card.
3. **About** (`#ueber-mich`) — portrait + quote overlay, 3 feature cards.
4. **Services** (`#leistungen`) — 3 × 2 grid, hover lift + arrow slide.
5. **Instagram + Testimonials** (`#referenzen`) — infinite marquee (pause on hover), 3 testimonials with 5-star ratings.
6. **Contact** (`#kontakt`) — 3 contact cards, white form card with client-side Zod validation, toast on submit.
7. **Footer** — 4-column links + bottom legal strip.

## Pages

- `/` — main one-page layout
- `/kontakt` — dedicated contact page (hero w/ image background, three contact cards, location split with image + form, info bar with 4 stats)

## Contact form & email delivery

Both forms (homepage and `/kontakt`) POST to **`/api/contact`** (`src/app/api/contact/route.ts`). The endpoint uses **Nodemailer + Gmail SMTP** to send the message to `info@nanae.de`.

### 1. Generate a Gmail App Password

Gmail blocks regular password logins for SMTP — you need an app password.

1. Sign in to https://myaccount.google.com with `info@nanae.de`.
2. Turn on **2-Step Verification** if it isn't on already.
3. Visit https://myaccount.google.com/apppasswords.
4. Create a new app password for "Mail / Other (Nanae Website)".
5. Copy the 16-character password (paste **without** spaces).

### 2. Set environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
SMTP_USER=info@nanae.de
SMTP_PASS=xxxxxxxxxxxxxxxx     # the 16-char app password
CONTACT_TO=info@nanae.de       # optional, defaults to SMTP_USER
CONTACT_FROM=info@nanae.de     # optional, keep equal to SMTP_USER
```

On Vercel: add the same three variables in **Project → Settings → Environment Variables**.

### 3. How it works

- Form fields are validated client-side (`react-hook-form`) and server-side (`zod`).
- A hidden honeypot field (`company`) silently rejects bot submissions.
- The mail is sent over `smtp.gmail.com:465` (SSL), with `replyTo` set to the visitor's email so you can reply directly from Gmail.
- A nice HTML version of the message is generated; a plain-text fallback is included.

## Instagram Reels — auto-update from Instagram

The "Folge mir auf Instagram" strip pulls the **latest 6 reels** from `@nanae_service` automatically — new posts show up on the website without redeploying code.

### How it works
- `/api/ig-reels` (server route) calls the **Instagram Graph API** for the connected user's most recent media (filtered to `REELS` / `VIDEO`).
- The response is cached at the Vercel edge for **1 hour** (`s-maxage=3600, stale-while-revalidate=86400`).
- `InstagramTestimonials.tsx` fetches the list on mount; if the API returns reels it swaps the on-screen list in place.
- If `IG_ACCESS_TOKEN` / `IG_USER_ID` are missing or the API call fails, the route returns a **hard-coded fallback list** so the strip never goes blank.

### One-time Meta setup (~10 min)
1. Make sure `@nanae_service` is a **Business/Creator** account (Profile → Settings → "For professionals" → Account type).
2. Go to https://developers.facebook.com → **My Apps → Create App** → type "Business". Add the **Instagram Graph API** product.
3. In Instagram, link the account to any Facebook Page (Meta requires this even for solo users).
4. Open the **Graph API Explorer**, generate a token with scopes:
   - `instagram_basic`
   - `pages_show_list`
   - `pages_read_engagement`
5. Exchange the short-lived token for a **60-day long-lived token**:
   ```
   GET /oauth/access_token?
     grant_type=ig_exchange_token&
     client_secret=<APP_SECRET>&
     access_token=<SHORT_LIVED>
   ```
6. Fetch the Instagram User ID:
   ```
   GET /me/accounts          → pick the connected page → note its page_id
   GET /{page_id}?fields=instagram_business_account → returns the IG user id
   ```
7. Add to `.env.local` (and on Vercel: Project → Settings → Environment Variables):
   ```env
   IG_ACCESS_TOKEN=<long-lived token>
   IG_USER_ID=<numeric ig business user id>
   ```
8. Redeploy. New reels you post on Instagram will appear on the site within an hour (or instantly after the next visitor triggers `stale-while-revalidate`).

### Token refresh
Long-lived tokens last **60 days**. Refresh manually or set a calendar reminder; the route gracefully falls back to the hard-coded list once a token expires.

## SEO & Performance

- Per-page metadata + OpenGraph + Twitter card (`src/app/layout.tsx`).
- LocalBusiness JSON-LD injected at the root.
- `next/font/google` (Inter, swap display) — no FOIT.
- Hero image marked `priority` to avoid LCP hit.
- All other images lazy by default.
- Reduced-motion respected via `globals.css`.

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`.
- Visible focus rings, ARIA labels on icon-only buttons.
- Color contrast meets WCAG AA.
- Keyboard-navigable mobile menu, forms, links.

## Responsive breakpoints

- Mobile-first; single-column under 768 px.
- Tablet (768–1024 px): 2-column grids.
- Desktop (≥1024 px): full layout matching the source designs.

## Deploy to Vercel

```bash
vercel        # or push to GitHub and import
```

Set the project root to `website/` if the repo contains other folders.

## License

© Nanae Reinigungsservice. All rights reserved.
