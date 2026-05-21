"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { ArrowRight } from "lucide-react";

/**
 * Shared "Anfrage senden" form used on both the homepage Kontakt
 * section and the dedicated /kontakt page (location split layout).
 *
 * Required: firstName, lastName, email, phone, privacy.
 * Everything else (city, cleaningType, area, frequency, date, notes)
 * is optional. Submits to /api/contact (Gmail SMTP).
 */
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

export function AnfrageForm({
  showToaster = true,
}: {
  /**
   * Whether this instance should mount its own <Toaster />. Set to false if
   * another instance on the same page already mounts one to avoid stacked
   * toast containers.
   */
  showToaster?: boolean;
}) {
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
    <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-ink-200/60 sm:p-8">
      {showToaster && (
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
      )}

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
            placeholder="Essen, Rüttenscheid…"
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
              <a
                href="/datenschutz"
                target="_blank"
                rel="noreferrer"
                className="text-brand underline"
              >
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
            className="btn-primary shrink-0 whitespace-nowrap disabled:opacity-70"
          >
            {isSubmitting ? "Sende…" : "Anfrage senden"}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </form>
    </div>
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
