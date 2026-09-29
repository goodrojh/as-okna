"use client";
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Clock, Gift, Home, Loader2, Store, Wrench, Square, Bug, Sun, Frame } from "lucide-react";
import { formatPhone, isPhoneValid, submitLead } from "@/lib/lead";
import { LeadSuccess } from "./LeadForm";

const SERVICES = [
  { id: "repair", label: "Ремонт и регулировка", icon: Wrench, min: 800, max: 2500, unit: "окон", countLabel: "Сколько окон нужно отремонтировать?" },
  { id: "glass", label: "Замена стеклопакета", icon: Square, min: 3500, max: 9000, unit: "стеклопакетов", countLabel: "Сколько стеклопакетов заменить?" },
  { id: "net", label: "Москитные сетки", icon: Bug, min: 1000, max: 2500, unit: "сеток", countLabel: "Сколько нужно сеток?" },
  { id: "new", label: "Новые окна", icon: Frame, min: 18000, max: 42000, unit: "окон", countLabel: "Сколько окон установить?" },
  { id: "balcony", label: "Остекление балкона", icon: Sun, min: 14000, max: 30000, unit: "м длины", countLabel: "Какая длина балкона, в метрах?" },
];

const PLACES = [
  { id: "flat", label: "Квартира", icon: Building2 },
  { id: "house", label: "Частный дом", icon: Home },
  { id: "office", label: "Офис / магазин", icon: Store },
];

const WHEN = ["Срочно, сегодня-завтра", "На этой неделе", "Пока узнаю цену"];

const rub = (n: number) => Math.round(n / 100) * 100 + "";
const fmt = (n: number) => rub(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

export default function Quiz({ compact = false, preset }: { compact?: boolean; preset?: string }) {
  const [step, setStep] = useState(preset ? 1 : 0);
  const [service, setService] = useState(preset || "");
  const [count, setCount] = useState(3);
  const [place, setPlace] = useState("");
  const [when, setWhen] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [touched, setTouched] = useState(false);

  const dark = !compact;
  const total = 5;
  const s = SERVICES.find((x) => x.id === service);

  const estimate = useMemo(() => {
    if (!s) return null;
    const k = place === "house" ? 1.1 : place === "office" ? 1.05 : 1;
    return { min: s.min * count * k, max: s.max * count * k };
  }, [s, count, place]);

  const next = () => setStep((v) => Math.min(v + 1, total - 1));
  const back = () => setStep((v) => Math.max(v - 1, 0));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isPhoneValid(phone)) return;
    setStatus("sending");
    await submitLead({
      source: compact ? "Квиз-калькулятор (окно)" : "Квиз-калькулятор (блок)",
      phone,
      details: {
        Услуга: s?.label || "",
        Количество: count + " " + (s?.unit || ""),
        Объект: PLACES.find((p) => p.id === place)?.label || "",
        Срок: when,
        Оценка: estimate ? fmt(estimate.min) + " – " + fmt(estimate.max) : "",
      },
    }).catch(() => undefined);
    setStatus("done");
  };

  if (status === "done") return <div className={dark ? "bg-cream rounded-3xl p-6" : ""}><LeadSuccess /></div>;

  const optionCls = (active: boolean) =>
    "flex items-center gap-3 rounded-2xl px-4 py-4 text-left border transition-all " +
    (dark
      ? active
        ? "bg-amber text-ink border-amber"
        : "bg-white/5 border-white/15 text-white hover:bg-white/10"
      : active
        ? "bg-ink text-white border-ink"
        : "bg-white border-line text-ink hover:border-ink/30");

  return (
    <div className={dark ? "text-white" : "text-ink"}>
      <div className="flex items-center justify-between mb-5 pr-10 md:pr-0">
        <span className={"text-[12px] font-semibold uppercase tracking-[0.14em] " + (dark ? "text-amber" : "text-glass")}>
          Шаг {step + 1} из {total}
        </span>
        <span className={"text-[12px] flex items-center gap-1.5 " + (dark ? "text-white/60" : "text-muted")}>
          <Clock className="w-3.5 h-3.5" /> ~1 минута
        </span>
      </div>
      <div className={"h-1.5 rounded-full overflow-hidden mb-7 " + (dark ? "bg-white/10" : "bg-ink/10")}>
        <motion.div className="h-full bg-amber rounded-full" animate={{ width: ((step + 1) / total) * 100 + "%" }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          {step === 0 && (
            <>
              <h3 className="font-display text-[22px] md:text-[26px] leading-tight mb-5">Что нужно сделать?</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {SERVICES.map((o) => (
                  <button key={o.id} className={optionCls(service === o.id)} onClick={() => { setService(o.id); setTimeout(next, 180); }}>
                    <o.icon className="w-5 h-5 shrink-0" />
                    <span className="text-[15px] font-medium">{o.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && s && (
            <>
              <h3 className="font-display text-[22px] md:text-[26px] leading-tight mb-8">{s.countLabel}</h3>
              <div className="flex items-end gap-3 mb-6">
                <span className="font-display text-6xl leading-none text-amber">{count}</span>
                <span className={"text-lg mb-1 " + (dark ? "text-white/70" : "text-muted")}>{s.unit}</span>
              </div>
              <input type="range" min={1} max={s.id === "balcony" ? 8 : 12} value={count} onChange={(e) => setCount(+e.target.value)} className="quiz-range w-full" />
              <div className={"flex justify-between text-[12px] mt-2 " + (dark ? "text-white/40" : "text-ink/40")}>
                <span>1</span>
                <span>{s.id === "balcony" ? 8 : 12}+</span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="font-display text-[22px] md:text-[26px] leading-tight mb-5">Где находятся окна?</h3>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {PLACES.map((o) => (
                  <button key={o.id} className={optionCls(place === o.id)} onClick={() => { setPlace(o.id); setTimeout(next, 180); }}>
                    <o.icon className="w-5 h-5 shrink-0" />
                    <span className="text-[15px] font-medium">{o.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="font-display text-[22px] md:text-[26px] leading-tight mb-5">Когда планируете?</h3>
              <div className="grid gap-2.5">
                {WHEN.map((w) => (
                  <button key={w} className={optionCls(when === w)} onClick={() => { setWhen(w); setTimeout(next, 180); }}>
                    <Clock className="w-5 h-5 shrink-0" />
                    <span className="text-[15px] font-medium">{w}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <form onSubmit={send}>
              <h3 className="font-display text-[22px] md:text-[26px] leading-tight">Предварительная стоимость готова</h3>
              {estimate && (
                <div className={"mt-5 rounded-2xl p-5 border " + (dark ? "bg-white/5 border-white/15" : "bg-white border-line")}>
                  <p className={"text-[13px] " + (dark ? "text-white/60" : "text-muted")}>{s?.label} · {count} {s?.unit}</p>
                  <p className="font-display text-[26px] md:text-[32px] mt-1 text-amber">
                    {fmt(estimate.min)} – {fmt(estimate.max)}
                  </p>
                  <p className={"text-[13px] mt-1 " + (dark ? "text-white/60" : "text-muted")}>Точную цену пришлём в течение 5 минут — и зафиксируем её в смете</p>
                </div>
              )}
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-amber/15 px-4 py-3">
                <Gift className="w-5 h-5 text-amber shrink-0" />
                <p className={"text-[14px] " + (dark ? "text-white" : "text-ink")}>Бонус за расчёт на сайте — <b>скидка 10%</b> на работы</p>
              </div>
              <input
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onFocus={() => !phone && setPhone("+7")}
                placeholder="+7 (___) ___-__-__"
                inputMode="tel"
                autoComplete="tel"
                className={
                  "mt-5 w-full h-14 rounded-2xl px-5 text-[16px] outline-none border transition " +
                  (dark ? "bg-white text-ink border-transparent" : "bg-white text-ink border-line focus:border-glass") +
                  (touched && !isPhoneValid(phone) ? " !border-red-400" : "")
                }
              />
              <button
                type="submit"
                className="mt-3 w-full h-14 rounded-full bg-amber hover:bg-amber-dark text-ink font-semibold text-[16px] flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber/30"
              >
                {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Узнать точную стоимость"}
              </button>
              <p className={"mt-3 text-[12px] text-center " + (dark ? "text-white/40" : "text-ink/45")}>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={back} className={"flex items-center gap-2 text-[14px] font-medium " + (dark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink")}>
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        ) : (
          <span />
        )}
        {step === 1 && (
          <button onClick={next} className="flex items-center gap-2 rounded-full bg-amber text-ink font-semibold px-6 py-3 hover:bg-amber-dark transition">
            Далее <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
