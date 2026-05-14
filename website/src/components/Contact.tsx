"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Instagram,
} from "lucide-react";

/** Only the first four fields are required. The rest are optional. */
const schema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5),
  city: z.string().optional(),
  cleaningType: z.string().optional(),
  area: z.string().optional(),
  frequency: z.string().optional(),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
  privacy: z.literal(true),
});
type FormValues = z.infer<typeof schema>;

const CONTACT_CARDS = [
  {
    title: "WhatsApp",
    value: "+49 1521 0692909",
    desc: "Schnellste Antwort, meist sofort.",
    href: "https://wa.me/4915210692909",
    icon: MessageCircle,
    dotColor: "bg-success",
  },
  {
    title: "E-Mail",
    value: "info@nanae.de",
    desc: "Für ausführliche Anfragen.",
    href: "mailto:info@nanae.de",
    icon: Mail,
    dotColor: "bg-brand",
  },
  {
    title: "Instagram",
    value: "@nanae_service",
    desc: "Folge mir & schreib mir per DM.",
    href: "https://instagram.com/nanae_service",
    icon: Instagram,
    dotColor: "bg-brand",
  },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      cleaningType: "",
      area: "",
      frequency: "",
      preferredDate: "",
      notes: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      toast.error("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }
    try {
      const payload = {
        name: `${parsed.data.firstName} ${parsed.data.lastName}`.trim(),
        email: parsed.data.email,
        phone: parsed.data.phone,
        city: parsed.data.city,
        cleaningType: parsed.data.cleaningType,
        area: parsed.data.area,
        frequency: parsed.data.frequency,
        preferredDate: parsed.data.preferredDate,
        message: parsed.data.notes,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Etwas ist schiefgelaufen.");
      }
      toast.success("Anfrage gesendet — ich melde mich innerhalb von 24h!");
      reset();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen.";
      toast.error(msg);
    }
  };

  return (
    <section id="kontakt" className="bg-brand-light section-padding">
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

      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Left: Contact info */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pill bg-white"
          >
            Kontakt
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[42px]"
          >
            Kostenlose Anfrage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted md:text-base"
          >
            Schreib mir kurz, worum es geht – ich melde mich innerhalb von 24
            Stunden persönlich bei dir zurück. Bevorzugst du WhatsApp? Auch
            gerne.
          </motion.p>

          <div className="mt-7 flex flex-col gap-3">
            {CONTACT_CARDS.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                className="group flex items-center gap-4 rounded-card bg-white p-4 shadow-card ring-1 ring-ink-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cardHover"
              >
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <card.icon className="h-5 w-5" strokeWidth={2} />
                  <span
                    className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white ${card.dotColor}`}
                  />
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    {card.title}
                  </div>
                  <div className="mt-0.5 text-[15px] font-semibold text-ink">
                    {card.value}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">
                    {card.desc}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200/60 sm:p-8"
        >
          <h3 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
            Anfrage senden
          </h3>
          <p className="mt-1.5 text-sm text-ink-muted">
            Pflichtfelder: Name, E-Mail, Telefon. Der Rest ist optional. Antwort
            innerhalb von 24h an{" "}
            <a
              href="mailto:info@nanae.de"
              className="font-medium text-brand underline"
            >
              info@nanae.de
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            noValidate
          >
            <Field label="Vorname *" error={errors.firstName?.message}>
              <input
                type="text"
                placeholder="Max"
                className="input-base"
                {...register("firstName", {
                  required: "Bitte Vornamen eingeben.",
                  minLength: { value: 2, message: "Mindestens 2 Zeichen." },
                })}
              />
            </Field>

            <Field label="Nachname *" error={errors.lastName?.message}>
              <input
                type="text"
                placeholder="Mustermann"
                className="input-base"
                {...register("lastName", {
                  required: "Bitte Nachnamen eingeben.",
                  minLength: { value: 2, message: "Mindestens 2 Zeichen." },
                })}
              />
            </Field>

            <Field label="E-Mail *" error={errors.email?.message}>
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

            <Field
              label="Telefon (WhatsApp bevorzugt) *"
              error={errors.phone?.message}
            >
              <input
                type="tel"
                placeholder="+49 1521 0692909"
                className="input-base"
                {...register("phone", {
                  required: "Bitte Telefonnummer eingeben.",
                  pattern: {
                    value: /^[+0-9\s\-()]+$/,
                    message: "Nur Zahlen, Leerzeichen und + erlaubt.",
                  },
                  minLength: { value: 5, message: "Telefonnummer zu kurz." },
                })}
              />
            </Field>

            <Field label="Stadt / Stadtteil">
              <input
                type="text"
                placeholder="Hamburg, Altona…"
                className="input-base"
                {...register("city")}
              />
            </Field>

            <Field label="Art der Reinigung">
              <select
                className="input-base"
                {...register("cleaningType")}
                defaultValue=""
              >
                <option value="">Bitte auswählen</option>
                <option value="bueroreinigung">Büroreinigung</option>
                <option value="wohnungsreinigung">Wohnungsreinigung</option>
                <option value="fensterreinigung">Fensterreinigung</option>
                <option value="grundreinigung">Grundreinigung</option>
                <option value="praxis-klinik">Praxis &amp; Klinik</option>
                <option value="treppenhaus">Treppenhaus</option>
              </select>
            </Field>

            <Field label="Größe der Fläche">
              <select
                className="input-base"
                {...register("area")}
                defaultValue=""
              >
                <option value="">z. B. 50–100 m²</option>
                <option value="<50">unter 50 m²</option>
                <option value="50-100">50–100 m²</option>
                <option value="100-200">100–200 m²</option>
                <option value="200-500">200–500 m²</option>
                <option value=">500">über 500 m²</option>
              </select>
            </Field>

            <Field label="Häufigkeit">
              <select
                className="input-base"
                {...register("frequency")}
                defaultValue=""
              >
                <option value="">Einmalig / Wöchentlich…</option>
                <option value="einmalig">Einmalig</option>
                <option value="woechentlich">Wöchentlich</option>
                <option value="14taegig">Alle 2 Wochen</option>
                <option value="monatlich">Monatlich</option>
              </select>
            </Field>

            <Field label="Wunschtermin">
              <input
                type="date"
                placeholder="TT.MM.JJJJ"
                className="input-base"
                {...register("preferredDate")}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Anmerkungen (optional)">
                <textarea
                  rows={4}
                  placeholder="Erzähl mir kurz, was du brauchst – Räume, Besonderheiten, gewünschte Zeiten…"
                  className="input-base resize-none"
                  {...register("notes")}
                />
              </Field>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-start gap-3 text-xs text-ink-muted">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-200 text-brand focus:ring-brand"
                  {...register("privacy", {
                    required: "Bitte Datenschutzerklärung akzeptieren.",
                  })}
                />
                <span>
                  Ich habe die{" "}
                  <a href="#" className="text-brand underline">
                    Datenschutzerklärung
                  </a>{" "}
                  gelesen und akzeptiere.
                  {errors.privacy && (
                    <span className="mt-1 block text-[11px] font-medium text-rose-600">
                      {errors.privacy.message as string}
                    </span>
                  )}
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-70"
              >
                {isSubmitting ? "Sende…" : "Anfrage senden"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.div>
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
