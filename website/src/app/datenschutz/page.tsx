import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung gemäß DSGVO für Nanae Reinigungsservice. Informationen zu Kontaktformular, Server-Log-Dateien, Cookies und Ihren Rechten als Betroffene:r.",
  alternates: { canonical: "/datenschutz" },
  openGraph: {
    title: "Datenschutzerklärung · Nanae Reinigungsservice",
    description:
      "DSGVO-konforme Datenschutzerklärung für nanae.de. Informationen zur Verarbeitung personenbezogener Daten.",
    url: "/datenschutz",
  },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      eyebrow="Datenschutz"
      title="Datenschutzerklärung"
      updatedAt="Stand: Mai 2026"
    >
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
        Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
        identifiziert werden können.
      </p>

      <h2>2. Verantwortlicher</h2>
      <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
      <p>
        <strong>Nana Efaba</strong>
        <br />
        Germaniaplatz 1
        <br />
        45355 Essen
        <br />
        Telefon: <a href="tel:+4915210692909">+49 1521 0692909</a>
        <br />
        E-Mail: <a href="mailto:info@nanae.de">info@nanae.de</a>
      </p>

      <h2>3. Datenerfassung auf dieser Website</h2>
      <h3>Kontaktformular</h3>
      <p>
        Wenn Sie uns über das Kontaktformular auf dieser Website eine Anfrage
        zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive
        der von Ihnen dort angegebenen Kontaktdaten zum Zwecke der Bearbeitung
        der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
        lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
        zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
        erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
        unserem berechtigten Interesse an der effektiven Bearbeitung der an uns
        gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <p>
        Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns,
        bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung
        widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende
        gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben
        unberührt.
      </p>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Website erhebt und speichert automatisch Informationen
        in sogenannten Server-Log-Dateien, die Ihr Browser automatisch
        übermittelt. Dies sind:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
        Abs. 1 lit. f DSGVO.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Diese Website verwendet Cookies nur, soweit dies technisch notwendig
        ist. Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1
        lit. f DSGVO gespeichert. Sie haben das Recht, jederzeit gegen die
        Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>
        Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
        betreffenden personenbezogenen Daten:
      </p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
        <a href="mailto:info@nanae.de">info@nanae.de</a>
      </p>

      <h2>6. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei der zuständigen
        Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige
        Aufsichtsbehörde für Nordrhein-Westfalen ist:
      </p>
      <p>
        <strong>Landesbeauftragte für Datenschutz und Informationsfreiheit NRW</strong>
        <br />
        Kavalleriestraße 2–4
        <br />
        40213 Düsseldorf
        <br />
        <a href="https://www.ldi.nrw.de" target="_blank" rel="noreferrer">
          www.ldi.nrw.de
        </a>
      </p>

      <h2>7. Externe Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites, insbesondere zu
        Instagram (@nanae_service). Für die Inhalte dieser externen Seiten ist
        der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung
        waren keine Rechtsverstöße erkennbar.
      </p>

      <h2>8. Aktualität dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai
        2026. Durch die Weiterentwicklung unserer Website oder aufgrund
        geänderter gesetzlicher Vorgaben kann es notwendig werden, diese
        Datenschutzerklärung anzupassen.
      </p>
    </LegalLayout>
  );
}
