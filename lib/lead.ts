/**
 * Google Apps Script web-app URL (see integrations/google-apps-script.gs).
 * The script writes every lead to the Google Sheet and emails it.
 * Can also be overridden at build time with NEXT_PUBLIC_LEAD_ENDPOINT.
 */
export const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbx34CxudVVbWn4RkuI7KkZ4DrSBrh_uyHheW1jWUpqJ76oTmozPBjdQ5bfqyIuNvfOy/exec";

export interface LeadPayload {
  source: string;
  phone: string;
  name?: string;
  comment?: string;
  details?: Record<string, string | number>;
}

const loadedAt = typeof performance !== "undefined" ? performance.now() : 0;

export async function submitLead(payload: LeadPayload): Promise<void> {
  const body = {
    ...payload,
    page: typeof window !== "undefined" ? window.location.href : "",
    at: new Date().toISOString(),
    // time on page in ms — the script rejects instant (bot) submissions
    t: Math.round((typeof performance !== "undefined" ? performance.now() : 0) - loadedAt),
  };
  if (!LEAD_ENDPOINT) {
    console.info("[lead:demo]", body);
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  // text/plain + no-cors = "simple" request: Apps Script accepts it without a CORS preflight.
  await fetch(LEAD_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    keepalive: true,
  });
}

export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  // Separators are added only when a digit follows them, so Backspace never gets stuck on ")" or "-"
  if (p.length > 3) out += ") " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
}

export function isPhoneValid(v: string) {
  return v.replace(/\D/g, "").length === 11;
}
