import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Anbieterkennzeichnung gemäß § 5 TMG für Nanae Service – Nana Efaba, Germaniaplatz 1, 45355 Essen. Kontakt, Steuernummer und Verantwortlicher.",
  alternates: { canonical: "/impressum" },
  openGraph: {
    title: "Impressum · Nanae Reinigungsservice",
    description:
      "Anbieterkennzeichnung gemäß § 5 TMG für Nanae Service in Essen.",
    url: "/impressum",
  },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalLayout
      eyebrow="Rechtliches"
      title="Impressum"
      updatedAt="Stand: Mai 2026"
    >
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>Nanae Service</strong>
        <br />
        Nana Efaba
        <br />
        Germaniaplatz 1
        <br />
        45355 Essen
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon:{" "}
        <a href="tel:+4915210692909">+49 1521 0692909</a>
        <br />
        E-Mail: <a href="mailto:info@nanae.de">info@nanae.de</a>
        <br />
        Website:{" "}
        <a href="https://www.nanae.de" rel="noreferrer">
          www.nanae.de
        </a>
      </p>

      <h2>Steuernummer</h2>
      <p>
        111/5073/3472
        <br />
        Finanzamt Essen
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Nana Efaba
        <br />
        Germaniaplatz 1
        <br />
        45355 Essen
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
        Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann
        jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir
        gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
        allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße
        erkennbar.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers.
      </p>
    </LegalLayout>
  );
}
