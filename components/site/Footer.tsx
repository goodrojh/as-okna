"use client";
import React, { useState } from "react";
import { Check, Loader2, MapPin, Clock, Phone } from "lucide-react";
import Logo from "./Logo";
import Reveal from "@/components/ui/Reveal";
import { formatPhone, isPhoneValid, submitLead } from "@/lib/lead";
import { CONTACTS, NAV_LINKS, pic } from "@/lib/site";
import Phones from "@/components/ui/Phones";
import Messengers from "@/components/ui/Messengers";

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid(phone)) return setErr(true);
    setErr(false);
    setStatus("sending");
    try {
      await submitLead({ source: "Футер: жду звонка", phone });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer id="contacts" className="w-full p-2 pb-28 md:pb-2 bg-white">
      <div className="relative rounded-3xl overflow-hidden flex flex-col md:min-h-[860px] isolate">
        <img {...pic("night")} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/85" />

        <div className="relative flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-12 text-center">
          <Reveal>
            <h2 className="t-h1 text-white">
              Сегодня вечером у вас <span className="text-amber">будет тепло</span>
            </h2>
            <p className="t-lead mt-5 text-white/80 max-w-[520px] mx-auto">Оставьте номер — перезвоним за 5 минут и пришлём мастера в удобное время.</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 w-full max-w-[540px]">
            {status === "done" ? (
              <div role="status" className="min-h-16 rounded-3xl md:rounded-full bg-ink/70 border border-white/20 flex items-center justify-center gap-3 text-white font-semibold px-5 py-4">
                <span className="w-8 h-8 rounded-full bg-amber flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-ink stroke-[3]" />
                </span>
                Заявка принята — перезвоним за 5 минут
              </div>
            ) : (
              <form onSubmit={send} noValidate className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:h-16 sm:bg-ink/70 sm:rounded-full sm:border sm:border-white/25 sm:p-1.5">
                <label htmlFor="footer-phone" className="sr-only">Телефон</label>
                <input
                  id="footer-phone"
                  value={phone}
                  onChange={(e) => { setPhone(formatPhone(e.target.value)); setErr(false); }}
                  onFocus={() => !phone && setPhone("+7")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  aria-invalid={err}
                  className={
                    "w-full sm:w-auto sm:flex-1 min-w-0 h-14 sm:h-auto rounded-full sm:rounded-none bg-ink/70 sm:bg-transparent border sm:border-0 px-5 text-[16px] text-white placeholder:text-white/60 outline-none tabular-nums " +
                    (err ? "border-red-400" : "border-white/25")
                  }
                />
                <button className="btn btn-primary shrink-0 sm:min-h-0 sm:h-full">
                  {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Жду звонка"}
                </button>
              </form>
            )}
            {err && <p className="text-[13px] text-red-300 mt-2">Введите номер полностью</p>}
            {status === "error" && <p className="text-[14px] text-red-300 mt-3">Не получилось отправить — позвоните нам по номерам ниже.</p>}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
              {CONTACTS.map((c) => (
                <a key={c.href} href={c.href} className="group flex flex-col items-center tabular-nums">
                  <span className="text-[13px] text-white/60">{c.name}</span>
                  <span className="inline-flex items-center gap-2 text-white font-display font-semibold text-[22px] md:text-[24px] tracking-[-0.02em] group-hover:text-amber transition-colors">
                    <Phone className="w-5 h-5" /> {c.phone}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative bg-ink/70 backdrop-blur-md border border-white/15 rounded-2xl mx-2 md:mx-5 mb-2 md:mb-5 p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1.3fr] gap-8 md:gap-10">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-4 text-white/65 text-[14px] leading-relaxed max-w-[300px]">
                Ремонт и обслуживание пластиковых окон в Краснодаре и по югу России. Мастер работает с 2007 года.
              </p>
            </div>
            <nav aria-label="Навигация по сайту" className="hidden md:block">
              <p className="text-white text-[14px] font-semibold mb-4">Навигация</p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/65 text-[14px] hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="col-span-2 md:col-span-1">
              <p className="text-white text-[14px] font-semibold mb-4">Контакты</p>
              <ul className="space-y-3 text-[14px] text-white/65">
                <li>
                  <Phones className="text-white/80" />
                </li>
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />Краснодар и пригороды: Яблоновский, Новая Адыгея, Знаменский, Пашковский</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" />Ежедневно, 8:00–21:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-[13px]">Напишите нам:</span>
              <Messengers size={40} />
            </div>
            <p className="text-white/50 text-[12px] text-center">© 2026 AS·окна · Политика обработки персональных данных</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
