import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { InstagramTestimonials } from "@/components/InstagramTestimonials";

export const metadata: Metadata = {
  title: {
    absolute:
      "Nanae Reinigungsservice Essen – Büro, Wohnung, Fenster, Praxis & Treppenhaus",
  },
  description:
    "Persönlicher Reinigungsservice in Essen & Umgebung – Büroreinigung, Wohnungsreinigung, Fensterreinigung, Grund-, Praxis- und Treppenhausreinigung. Ehrlich, zuverlässig, gewissenhaft. Jetzt unverbindlich anfragen.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <InstagramTestimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
