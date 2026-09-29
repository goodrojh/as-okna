export interface LeadPayload {
  source: string;
  phone: string;
  name?: string;
  comment?: string;
  details?: Record<string, string | number>;
}

/**
 * Отправка заявки.
 * Чтобы заявки приходили вам (Telegram-бот, почта, CRM), задайте переменную
 * NEXT_PUBLIC_LEAD_ENDPOINT — URL, который принимает POST с JSON.
 * Без неё форма работает в демо-режиме (заявка только выводится в консоль).
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
  const body = { ...payload, page: typeof window !== "undefined" ? window.location.href : "", at: new Date().toISOString() };
  if (!endpoint) {
    console.info("[lead:demo]", body);
    await new Promise((r) => setTimeout(r, 700));
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("lead failed");
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
