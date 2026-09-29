"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, MapPin, Clock, Phone } from "lucide-react";
import Logo from "./Logo";
import { formatPhone, isPhoneValid, submitLead } from "@/lib/lead";
import { img, NAV_LINKS, PHONE, PHONE_HREF, TELEGRAM_HREF, WHATSAPP_HREF } from "@/lib/site";

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 1 1 8 4.42zm8.03-17.46A11.3 11.3 0 0 0 12.04.72C5.8.72.72 5.8.72 12.05c0 2 .52 3.94 1.51 5.66L.62 23.6l6.03-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.31-8.02z" />
  </svg>
);
const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
);

export default function Footer() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid(phone)) return setErr(true);
    setErr(false);
    setStatus("sending");
    await submitLead({ source: "Футер: жду звонка", phone }).catch(() => undefined);
    setStatus("done");
  };

  return (
    <footer id="contacts" className="w-full p-2 md:p-2 bg-white">
      <div className="rounded-[24px] overflow-hidden relative min-h-[100svh] md:min-h-[820px] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={img("night")} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/70" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[36px] sm:text-[52px] md:text-[76px] font-bold text-white leading-[1.02] tracking-[-0.02em]"
          >
            Сегодня вечером <br />
            у вас <span className="italic font-light text-amber">будет тепло</span>
          </motion.h2>
          <p className="mt-5 text-white/75 text-[16px] md:text-lg max-w-[520px]">Оставьте номер — перезвоним за 5 минут и пришлём мастера в удобное время.</p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-9 w-full max-w-[540px]"
          >
            {status === "done" ? (
              <div className="h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center gap-3 text-white font-semibold">
                <span className="w-8 h-8 rounded-full bg-amber flex items-center justify-center"><Check className="w-4 h-4 text-ink stroke-[3]" /></span>
                Заявка принята — перезвоним за 5 минут
              </div>
            ) : (
              <form onSubmit={send} className={"h-16 bg-ink/55 backdrop-blur-md rounded-full border flex overflow-hidden p-1.5 " + (err ? "border-red-400" : "border-white/25")}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7")}
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="flex-1 min-w-0 bg-transparent px-4 md:px-6 text-[16px] text-white placeholder:text-white/70 outline-none"
                />
                <button className="h-full px-5 md:px-8 bg-amber text-ink rounded-full text-[13px] font-bold tracking-[0.06em] uppercase hover:bg-amber-dark transition-colors whitespace-nowrap">
                  {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Жду звонка"}
                </button>
              </form>
            )}
            <a href={PHONE_HREF} className="mt-5 inline-flex items-center gap-2 text-white font-display text-[22px] md:text-[26px] hover:text-amber transition-colors">
              <Phone className="w-5 h-5" /> {PHONE}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 bg-ink/40 backdrop-blur-2xl border border-white/15 rounded-[22px] mx-3 md:mx-5 mb-3 md:mb-5 p-6 md:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1.2fr] gap-8 md:gap-10">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-3 text-white/60 text-[13px] leading-relaxed max-w-[300px]">
                Ремонт, обслуживание и установка пластиковых окон в Краснодаре. Возвращаем окнам тепло и тишину с 2014 года.
              </p>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/65 text-[13px] hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-[13px] text-white/65">
                <li><a href={PHONE_HREF} className="flex items-center gap-2 hover:text-white"><Phone className="w-3.5 h-3.5" />{PHONE}</a></li>
                <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />Краснодар и пригороды: Яблоновский, Новая Адыгея, Знаменский, Пашковский</li>
                <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />Ежедневно, 8:00–21:00</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-white/55 text-[12px]">Напишите нам:</span>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><WhatsAppIcon /></a>
              <a href={TELEGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><TelegramIcon /></a>
            </div>
            <p className="text-white/45 text-[12px] text-center">© {new Date().getFullYear()} AS·окна · Политика обработки персональных данных</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
