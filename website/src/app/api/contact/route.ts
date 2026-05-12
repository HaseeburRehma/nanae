import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const payloadSchema = z.object({
  name: z.string().trim().min(2, "Name zu kurz."),
  email: z.string().trim().email("Ungültige E-Mail."),
  phone: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().optional().or(z.literal("")),
  cleaningType: z.string().trim().optional().or(z.literal("")),
  area: z.string().trim().optional().or(z.literal("")),
  frequency: z.string().trim().optional().or(z.literal("")),
  preferredDate: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().optional().or(z.literal("")),
  // honeypot — humans leave it empty
  company: z.string().trim().max(0).optional().default(""),
});

type Payload = z.infer<typeof payloadSchema>;

function escape(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: Payload): string {
  const row = (label: string, value: string | undefined) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#64748B;font-size:13px;width:160px;">${label}</td><td style="padding:8px 12px;color:#0F172A;font-size:14px;font-weight:500;">${escape(value)}</td></tr>`
      : "";

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;color:#0F172A;background:#F8FAFC;">
    <div style="background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 12px rgba(15,23,42,0.06);">
      <h1 style="margin:0 0 4px;font-size:20px;color:#00689B;">Neue Anfrage über nanae.de</h1>
      <p style="margin:0 0 16px;color:#64748B;font-size:13px;">Eingegangen am ${new Date().toLocaleString("de-DE")}</p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border-top:1px solid #E2E8F0;">
        ${row("Name", data.name)}
        ${row("E-Mail", data.email)}
        ${row("Telefon", data.phone)}
        ${row("Stadt", data.city)}
        ${row("Art der Reinigung", data.cleaningType)}
        ${row("Fläche", data.area)}
        ${row("Häufigkeit", data.frequency)}
        ${row("Wunschtermin", data.preferredDate)}
      </table>
      ${
        data.notes || data.message
          ? `<div style="margin-top:16px;padding:16px;background:#EFF6FF;border-radius:12px;">
              <div style="color:#00689B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Nachricht</div>
              <div style="color:#0F172A;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(
                data.message || data.notes
              )}</div>
            </div>`
          : ""
      }
    </div>
  </div>`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message || "Ungültige Daten." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot — silently accept but don't send
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || "info@nanae.de";
  const from = process.env.CONTACT_FROM || user;

  if (!user || !pass) {
    console.error("[contact] Missing SMTP_USER or SMTP_PASS env vars");
    return NextResponse.json(
      { ok: false, error: "Server-Konfiguration unvollständig." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Nanae Website" <${from}>`,
      to,
      replyTo: data.email,
      subject: `Neue Anfrage von ${data.name}`,
      text:
        `Neue Anfrage über nanae.de\n\n` +
        `Name: ${data.name}\n` +
        `E-Mail: ${data.email}\n` +
        (data.phone ? `Telefon: ${data.phone}\n` : "") +
        (data.city ? `Stadt: ${data.city}\n` : "") +
        (data.cleaningType ? `Art: ${data.cleaningType}\n` : "") +
        (data.area ? `Fläche: ${data.area}\n` : "") +
        (data.frequency ? `Häufigkeit: ${data.frequency}\n` : "") +
        (data.preferredDate ? `Wunschtermin: ${data.preferredDate}\n` : "") +
        (data.notes || data.message
          ? `\nNachricht:\n${data.notes || data.message}\n`
          : ""),
      html: buildHtml(data),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail error", err);
    return NextResponse.json(
      { ok: false, error: "E-Mail konnte nicht versendet werden." },
      { status: 500 }
    );
  }
}
