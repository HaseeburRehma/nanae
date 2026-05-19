import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function LegalLayout({
  eyebrow,
  title,
  children,
  updatedAt,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  updatedAt?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <header className="bg-brand-light pb-12 pt-12 sm:pt-16">
          <div className="container-x">
            <span className="pill bg-white">{eyebrow}</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl md:text-[56px]">
              {title}
            </h1>
            {updatedAt && (
              <p className="mt-3 text-sm text-ink-muted">{updatedAt}</p>
            )}
          </div>
        </header>

        <article className="container-x legal-prose py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
