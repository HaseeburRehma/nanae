"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  // honeypot
  company?: string;
};

export function LocationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      company: "",
    },
  });
  const [sent, setSent] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Etwas ist schiefgelaufen.");
      }
      toast.success("Nachricht gesendet — ich melde mich bald!");
      reset();
      setSent(true);
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen.";
      toast.error(msg);
    }
  };

  return (
    <section className="bg-brand-light py-20 lg:py-24">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#0F172A",
            color: "#fff",
            fontSize: "14px",
            padding: "12px 16px",
          },
        }}
      />

      <div className="container-x">
        {/* Header row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pill bg-white"
            >
              Standort &amp; Anfrage
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-[42px]"
            >
              Hier findest du mich.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base md:justify-self-end"
          >
            Ich bin in Essen und im Umkreis unterwegs. Schick mir die Nachricht
            – ich melde mich noch heute zurück.
          </motion.p>
        </div>

        {/* Split row */}
        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-7">
          {/* Image with location card overlay */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-card ring-1 ring-ink-200/40 sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <Image
              src="/images/brand/02-mop-office-blue.png"
              alt="Nanae bei der Büroreinigung in Essen"
              fill
              quality={95}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 620px"
              className="object-cover object-center"
            />

            {/* Floating location card */}
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-float ring-1 ring-black/5 backdrop-blur-sm sm:left-6 sm:top-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                  Mein Standort
                </div>
                <div className="mt-0.5 text-sm font-extrabold text-ink">
                  Essen, Deutschland
                </div>
                <div className="text-xs text-ink-muted">
                  Service-Radius: 30 km
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200/40 sm:p-8"
          >
            <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
              Schreib mir eine Nachricht
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted">
              Antwort innerhalb von 24h. Persönlich, ohne Callcenter.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-4"
              noValidate
            >
              {/* honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register("company")}
              />

              <Field label="Name" error={errors.name?.message}>
                <input
                  type="text"
                  placeholder="Vor- und Nachname"
                  className="input-base"
                  {...register("name", {
                    required: "Bitte Namen eingeben.",
                    minLength: { value: 2, message: "Mindestens 2 Zeichen." },
                  })}
                />
              </Field>

              <Field label="E-Mail" error={errors.email?.message}>
                <input
                  type="email"
                  placeholder="name@example.de"
                  className="input-base"
                  {...register("email", {
                    required: "Bitte E-Mail eingeben.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Bitte gültige E-Mail.",
                    },
                  })}
                />
              </Field>

              <Field label="Telefon (optional)" error={errors.phone?.message}>
                <input
                  type="tel"
                  placeholder="+49 1XX XXX XX XX"
                  className="input-base"
                  {...register("phone", {
                    pattern: {
                      value: /^[+0-9\s\-()]*$/,
                      message: "Nur Zahlen, Leerzeichen und + erlaubt.",
                    },
                  })}
                />
              </Field>

              <Field label="Nachricht" error={errors.message?.message}>
                <textarea
                  rows={4}
                  placeholder="Worum geht es? Erzähl mir kurz, was du brauchst…"
                  className="input-base resize-none"
                  {...register("message", {
                    required: "Bitte kurze Nachricht hinterlassen.",
                    minLength: { value: 5, message: "Bitte etwas mehr Text." },
                  })}
                />
              </Field>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting || sent}
                  className="btn-primary disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Sende…"
                    : sent
                      ? "Gesendet ✓"
                      : "Anfrage senden"}
                  {!isSubmitting && !sent && <ArrowRight className="h-4 w-4" />}
                </button>
                <span className="text-xs text-ink-muted">
                  Ø Antwort: 4–6 Std.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label-base">{label}</label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
}
