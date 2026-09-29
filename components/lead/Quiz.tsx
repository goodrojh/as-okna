"use client";
import React, { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Clock, Gift, Home, Loader2, Store, Wrench, Square, Bug, Sun, Frame } from "lucide-react";
import { formatPhone, isPhoneValid, submitLead } from "@/lib/lead";
import { LeadSuccess } from "./LeadForm";

const SERVICES = [
  { id: "repair", label: "Ремонт и регулировка", icon: Wrench, min: 800, max: 2500, unit: "окон", max_n: 12, countLabel: "Сколько окон нужно отремонтировать?" },
  { id: "glass", label: "Замена стеклопакета", icon: Square, min: 3500, max: 9000, unit: "стеклопакетов", max_n: 12, countLabel: "Сколько стеклопакетов заменить?" },
  { id: "net", label: "Москитные сетки", icon: Bug, min: 1000, max: 2500, unit: "сеток", max_n: 12, countLabel: "Сколько нужно сеток?" },
  { id: "new", label: "Новые окна", icon: Frame, min: 18000, max: 42000, unit: "окон", max_n: 12, countLabel: "Сколько окон установить?" },
  { id: "balcony", label: "Остекление балкона", icon: Sun, min: 14000, max: 30000, unit: "м длины", max_n: 8, countLabel: "Какая длина балкона, в метрах?" },
];

const PLACES = [
  { id: "flat", label: "Квартира", icon: Building2 },
  { id: "house", label: "Частный дом", icon: Home },
  { id: "office", label: "Офис / магазин", icon: Store },
];

const WHEN = ["Срочно, сегодня-завтра", "На этой неделе", "Пока узнаю цену"];
const TOTAL = 5;

const fmt = (n: number) => (Math.round(n / 100) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

export default function Quiz({ compact = false, preset }: { compact?: boolean; preset?: string }) {
  const [step, setStep] = useState(preset ? 1 : 0);
  const [service, setService] = useState(preset || "");
  const [count, setCount] = useState(3);
  const [place, setPlace] = useState("");
  const [when, setWhen] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [touched, setTouched] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dark = !compact;
  const s = SERVICES.find((x) => x.id === service);

  const estimate = useMemo(() => {
    if (!s) return null;
    const k = place === "house" ? 1.1 : place === "office" ? 1.05 : 1;
    return { min: s.min * count * k, max: s.max * count * k };
  }, [s, count, place]);

  /** Go to an explicit step (idempotent — a double tap can't skip a step). */
  const goTo = (n: number, wait = 0) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStep(n), wait);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isPhoneValid(phone) || status === "sending") return;
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

  if (status === "done")
    return (
      <div className={dark ? "bg-cream rounded-2xl p-4" : ""}>
        <LeadSuccess />
      </div>
    );

  const optionCls = (active: boolean) =>
    "flex items-center gap-3 rounded-2xl px-4 min-h-[56px] py-3 text-left border transition-colors duration-200 active:scale-[0.98] " +
    (dark
      ? active
        ? "bg-amber text-ink border-amber"
        : "bg-white/[0.04] border-white/15 text-white hover:bg-white/10"
      : active
        ? "bg-ink text-white border-ink"
        : "bg-white border-line text-ink hover:border-ink/30");

  const title = "t-h3 mb-5 " + (dark ? "text-white" : "text-ink");

  return (
    <div className={dark ? "text-white" : "text-ink"}>
      <div className={"flex items-center justify-between mb-4 " + (compact ? "pr-12 md:pr-14" : "")}>
        <span className={"text-[12px] font-semibold uppercase tracking-[0.14em] tabular-nums " + (dark ? "text-amber" : "text-glass")}>
          Шаг {step + 1} из {TOTAL}
        </span>
        <span className={"text-[12px] flex items-center gap-1.5 " + (dark ? "text-white/60" : "text-muted")}>
          <Clock className="w-3.5 h-3.5" /> ~1 минута
        </span>
      </div>
      <div className={"h-1.5 rounded-full overflow-hidden mb-7 " + (dark ? "bg-white/10" : "bg-ink/10")}>
        <div className="h-full bg-amber rounded-full origin-left transition-transform duration-500 ease-out" style={{ transform: `scaleX(${(step + 1) / TOTAL})` }} />
      </div>

      <div className="min-h-[260px]">
          <div key={step} className="anim-slide-in">
            {step === 0 && (
              <>
                <h3 className={title}>Что нужно сделать?</h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((o) => (
                    <button key={o.id} className={optionCls(service === o.id)} onClick={() => { setService(o.id); setCount(Math.min(count, o.max_n)); goTo(1, 180); }}>
                      <o.icon className="w-5 h-5 shrink-0" />
                      <span className="text-[15px] font-medium">{o.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && s && (
              <>
                <h3 className={title}>{s.countLabel}</h3>
                <div className="flex items-end gap-3 mb-6 mt-8">
                  <span className="font-display font-semibold text-6xl leading-none text-amber tabular-nums">{count}</span>
                  <span className={"text-lg mb-1 " + (dark ? "text-white/70" : "text-muted")}>{s.unit}</span>
                </div>
                <label htmlFor="quiz-range" className="sr-only">{s.countLabel}</label>
                <input id="quiz-range" type="range" min={1} max={s.max_n} value={count} onChange={(e) => setCount(+e.target.value)} className="quiz-range w-full" />
                <div className={"flex justify-between text-[12px] mt-2 " + (dark ? "text-white/45" : "text-ink/45")}>
                  <span>1</span>
                  <span>{s.max_n}+</span>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className={title}>Где находятся окна?</h3>
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {PLACES.map((o) => (
                    <button key={o.id} className={optionCls(place === o.id)} onClick={() => { setPlace(o.id); goTo(3, 180); }}>
                      <o.icon className="w-5 h-5 shrink-0" />
                      <span className="text-[15px] font-medium">{o.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className={title}>Когда планируете?</h3>
                <div className="grid gap-2.5">
                  {WHEN.map((w) => (
                    <button key={w} className={optionCls(when === w)} onClick={() => { setWhen(w); goTo(4, 180); }}>
                      <Clock className="w-5 h-5 shrink-0" />
                      <span className="text-[15px] font-medium">{w}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <form onSubmit={send} noValidate>
                <h3 className={title.replace("mb-5", "mb-0")}>Предварительная стоимость готова</h3>
                {estimate && (
                  <div className={"mt-5 rounded-2xl p-5 border " + (dark ? "bg-white/[0.04] border-white/15" : "bg-white border-line")}>
                    <p className={"text-[13px] " + (dark ? "text-white/60" : "text-muted")}>{s?.label} · {count} {s?.unit}</p>
                    <p className={"font-display font-semibold text-[24px] md:text-[30px] mt-1 tracking-[-0.02em] tabular-nums " + (dark ? "text-amber" : "text-ink")}>
                      {fmt(estimate.min)} – {fmt(estimate.max)}
                    </p>
                    <p className={"text-[13px] mt-1 " + (dark ? "text-white/60" : "text-muted")}>Точную цену пришлём в течение 5 минут и зафиксируем в смете</p>
                  </div>
                )}
                <div className={"mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 " + (dark ? "bg-amber/15" : "bg-amber/20")}>
                  <Gift className={"w-5 h-5 shrink-0 " + (dark ? "text-amber" : "text-amber-ink")} />
                  <p className="text-[14px]">Бонус за расчёт на сайте — <b>скидка 10%</b> на работы</p>
                </div>
                <label htmlFor="quiz-phone" className="sr-only">Телефон</label>
                <input
                  id="quiz-phone"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  onFocus={() => !phone && setPhone("+7")}
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={touched && !isPhoneValid(phone)}
                  className={
                    "mt-4 w-full h-14 rounded-2xl px-5 text-[16px] bg-white text-ink outline-none border tabular-nums transition-colors " +
                    (touched && !isPhoneValid(phone) ? "border-red-400" : dark ? "border-transparent" : "border-line focus:border-glass")
                  }
                />
                {touched && !isPhoneValid(phone) && <p className={"text-[13px] mt-1.5 ml-2 " + (dark ? "text-red-300" : "text-red-600")}>Введите номер полностью</p>}
                <button type="submit" className="btn btn-primary w-full mt-3">
                  {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Узнать точную стоимость"}
                </button>
                <p className={"mt-3 text-[12px] text-center " + (dark ? "text-white/45" : "text-ink/50")}>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}
          </div>
      </div>

      {step > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => goTo(step - 1)} className={"flex items-center gap-2 h-11 text-[14px] font-medium " + (dark ? "text-white/70 hover:text-white" : "text-muted hover:text-ink")}>
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
          {step === 1 && (
            <button onClick={() => goTo(2)} className="btn btn-sm btn-primary">
              Далее <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
