import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactHero } from "@/components/contact-page/ContactHero";
import { LocationForm } from "@/components/contact-page/LocationForm";
import { InfoBar } from "@/components/contact-page/InfoBar";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Schreib mir – persönlich, ohne Callcenter. Antwort innerhalb von 24 Stunden. Reinigungsservice in Essen und im Umkreis von 30 km.",
  openGraph: {
    title: "Kontakt · Nanae Reinigungsservice",
    description:
      "Schreib mir – persönlich, ohne Callcenter. Antwort innerhalb von 24h.",
  },
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
