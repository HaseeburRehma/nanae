import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { InstagramTestimonials } from "@/components/InstagramTestimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  // Empty string means "use the layout default (the full SEO title)" without
  // appending the "· Nanae Reinigungsservice Essen" template suffix.
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
