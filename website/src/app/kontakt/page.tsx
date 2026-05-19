import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/contact-page/ContactHero";
import { LocationForm } from "@/components/contact-page/LocationForm";
import { InfoBar } from "@/components/contact-page/InfoBar";

export const metadata: Metadata = {
  title: "Kontakt – Anfrage in 24 h",
  description:
    "Direkter Kontakt zu Nanae Reinigungsservice in Essen. Anfragen per E-Mail, WhatsApp oder Telefon – Antwort innerhalb von 24 Stunden. Servicegebiet: Essen + 30 km Umkreis.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt · Nanae Reinigungsservice Essen",
    description:
      "E-Mail, WhatsApp oder Telefon – Antwort innerhalb von 24 h. Reinigungsservice in Essen und im Umkreis von 30 km.",
    url: "/kontakt",
  },
  twitter: {
    title: "Kontakt · Nanae Reinigungsservice Essen",
    description:
      "E-Mail, WhatsApp oder Telefon – Antwort innerhalb von 24 h.",
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <LocationForm />
        <InfoBar />
      </main>
      <Footer />
    </>
  );
}
