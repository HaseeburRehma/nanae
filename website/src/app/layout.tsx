import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://nanae.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nanae Reinigungsservice — ehrlich, zuverlässig, persönlich",
    template: "%s · Nanae Reinigungsservice",
  },
  description:
    "Reinigungsservice in Essen & Umgebung. Büro-, Wohnungs-, Fenster-, Grund-, Praxis- und Treppenhausreinigung. Persönlich, gewissenhaft, ehrlich — kein Callcenter, keine Subunternehmer.",
  keywords: [
    "Reinigungsservice Essen",
    "Büroreinigung",
    "Wohnungsreinigung",
    "Fensterreinigung",
    "Grundreinigung",
    "Praxisreinigung",
    "Treppenhausreinigung",
    "Nanae",
  ],
  authors: [{ name: "Nanae" }],
  creator: "Nanae Reinigungsservice",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    title: "Nanae Reinigungsservice — ehrlich, zuverlässig, persönlich",
    description:
      "Reinigungsservice in Essen & Umgebung. Persönlich, gewissenhaft, ehrlich.",
    siteName: "Nanae Reinigungsservice",
    images: [
      {
        url: "/images/brand/01-mop-office-white.png",
        width: 1200,
        height: 800,
        alt: "Nanae Reinigungsservice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanae Reinigungsservice — ehrlich, zuverlässig, persönlich",
    description:
      "Reinigungsservice in Essen & Umgebung. Persönlich, gewissenhaft, ehrlich.",
    images: ["/images/brand/01-mop-office-white.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#00689B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nanae Reinigungsservice",
    image: `${SITE_URL}/images/brand/01-mop-office-white.png`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+49 1521 0692909",
    email: "info@nanae.de",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Germaniaplatz 1",
      postalCode: "45355",
      addressLocality: "Essen",
      addressCountry: "DE",
    },
    areaServed: {
      "@type": "City",
      name: "Essen",
    },
    sameAs: ["https://www.instagram.com/nanae_service"],
    serviceType: [
      "Büroreinigung",
      "Wohnungsreinigung",
      "Fensterreinigung",
      "Grundreinigung",
      "Praxis- und Klinikreinigung",
      "Treppenhausreinigung",
    ],
  };

  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
