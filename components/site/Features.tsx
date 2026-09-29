"use client";
import React from "react";
import { Wrench, ShieldCheck, Lock, PhoneCall, Truck, Check, Thermometer, FileText, Home } from "lucide-react";
import Reveal, { SectionHead } from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

const ESTIMATE = [
  { label: "Регулировка 3 створок", price: "1 500 ₽", color: "bg-glass" },
  { label: "Уплотнитель, 12 м", price: "3 600 ₽", color: "bg-deep" },
  { label: "Смазка фурнитуры", price: "0 ₽", color: "bg-amber" },
];

const TEMPS = [
  { room: "Спальня", before: 38, after: 80 },
  { room: "Кухня", before: 44, after: 84 },
  { room: "Детская", before: 32, after: 78 },
  { room: "Зал", before: 40, after: 86 },
];

const card = "rounded-3xl border border-line bg-white overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(11,22,32,0.18)]";
const stage = "relative h-72 flex items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-frost/80 via-white to-cream p-6 md:p-8";

export default function Features() {
  return (
    <section id="why" className="section bg-white">
      <div className="wrap">
        <SectionHead
          center
          title={<>Почему в Краснодаре звонят в <span className="text-glass">AS·окна</span></>}
          lead="Мы не продаём окна любой ценой. Сначала пробуем починить — это в разы дешевле, а результат тот же: тихо, тепло и без сквозняков."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* 1 — Photo card */}
          <Reveal className="h-full">
            <div className="group relative rounded-3xl overflow-hidden h-full min-h-[480px] p-6 md:p-8 flex flex-col">
              <img
                {...pic("repair", "(min-width:768px) 50vw, 100vw")}
                alt="Мастер регулирует фурнитуру окна"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/85" />
              <div className="relative">
                <h3 className="t-h2 text-white" style={{ fontSize: "clamp(26px, 3vw, 38px)" }}>
                  Чиним, а не продаём. <span className="text-amber">Экономия до 80%.</span>
                </h3>
                <p className="t-body text-white/80 max-w-[440px] mt-3">
                  В 7 из 10 случаев окно можно вернуть к жизни без замены. Если нельзя — честно скажем и покажем почему.
                </p>
              </div>
              <div className="relative mt-auto pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Wrench, t: "Запчасти в машине", d: "Фурнитура, ручки и уплотнители для всех профилей — чиним сразу." },
                  { icon: ShieldCheck, t: "Гарантия до 3 лет", d: "Письменно, в договоре. Приедем бесплатно, если что-то не так." },
                ].map((x) => (
                  <div key={x.t} className="flex flex-col gap-3 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
                      <x.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white">{x.t}</p>
                      <p className="text-[13px] text-white/75 leading-relaxed mt-1">{x.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 2 — Fixed estimate */}
          <Reveal delay={0.08} className="h-full">
            <div className={card}>
              <div className="relative flex-1 min-h-[300px] flex items-center justify-center p-6 md:p-8 bg-gradient-to-br from-frost via-cream to-amber/10">
                <div className="w-full max-w-[330px] bg-white/80 border border-white rounded-2xl p-5 shadow-[0_24px_60px_-24px_rgba(18,50,74,0.35)]" aria-hidden>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-glass" />
                    <span className="text-[12px] font-semibold text-ink uppercase tracking-[0.1em]">Смета № 1024</span>
                  </div>
                  <div className="space-y-2">
                    {ESTIMATE.map((item) => (
                      <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-line/70">
                        <span className={"w-2 h-2 rounded-full " + item.color} />
                        <span className="text-[13px] text-ink/80 flex-1">{item.label}</span>
                        <span className="text-[13px] font-semibold text-ink tabular-nums">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-full bg-ink text-white pl-2 pr-2 py-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white stroke-[3]" />
                    </span>
                    <span className="text-[13px] font-semibold flex-1 tabular-nums">Итого: 5 100 ₽</span>
                    <span className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
                      <Lock className="h-3.5 w-3.5 text-ink" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 border-t border-line">
                <h3 className="t-h3 text-ink">Цена не вырастет после выезда</h3>
                <p className="t-body text-muted mt-2">Мастер называет стоимость до начала работ и фиксирует её в смете. Никаких «а тут ещё доплатить».</p>
              </div>
            </div>
          </Reveal>

          {/* 3 — Same-day timeline */}
          <Reveal className="h-full">
            <div className={card}>
              <div className={stage}>
                <div className="relative w-full max-w-[290px] flex flex-col items-center" aria-hidden>
                  <div className="bg-white rounded-2xl p-3.5 shadow-lg shadow-deep/5 border border-line flex items-center gap-3 w-full relative">
                    <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
                      <PhoneCall className="h-5 w-5 text-amber" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">Заявка · 09:12</p>
                      <p className="text-[12px] text-muted">«Дует из окна в детской»</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-glass/40" />
                  <div className="grid grid-cols-2 gap-3 w-full relative before:absolute before:-top-px before:left-1/4 before:right-1/4 before:h-px before:bg-glass/40">
                    {[
                      { icon: PhoneCall, t: "Перезвон · 5 мин" },
                      { icon: Truck, t: "Выезд · 14:00" },
                    ].map((n) => (
                      <div key={n.t} className="bg-white rounded-xl p-3 border border-line flex flex-col gap-2 items-center text-center">
                        <div className="w-8 h-8 rounded-lg bg-frost flex items-center justify-center">
                          <n.icon className="h-4 w-4 text-glass" />
                        </div>
                        <span className="text-[12px] font-semibold text-ink">{n.t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 bg-amber text-ink text-[12px] font-semibold py-2 px-4 rounded-full flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> 15:10 · В детской тепло
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="t-h3 text-ink">Мастер у вас в день обращения</h3>
                <p className="t-body text-muted mt-2">Работаем ежедневно по Краснодару и пригородам. Перезваниваем за 5 минут, приезжаем в удобное вам время.</p>
              </div>
            </div>
          </Reveal>

          {/* 4 — Temperature chart */}
          <Reveal delay={0.08} className="h-full">
            <div className={card}>
              <div className={stage}>
                <div className="w-full h-full bg-white rounded-2xl border border-line p-5 flex flex-col gap-4" aria-hidden>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber/15 flex items-center justify-center">
                        <Thermometer className="h-5 w-5 text-amber-ink" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-ink leading-none">Температура у окна</p>
                        <p className="text-[11px] text-muted mt-1">до и после ремонта</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[11px] text-muted">
                      <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-glass/35" />до</span>
                      <span className="flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-amber" />после</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-3 px-1">
                    {TEMPS.map((t) => (
                      <div key={t.room} className="flex-1 flex items-end gap-1 h-full">
                        <div className="flex-1 bg-glass/25 rounded-t-md" style={{ height: t.before + "%" }} />
                        <div className="flex-1 bg-amber rounded-t-md" style={{ height: t.after + "%" }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-line">
                    <span className="text-[11px] text-muted flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Спальня · Кухня · Детская · Зал</span>
                    <span className="text-[13px] font-semibold text-emerald-700">+5…6 °C</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="t-h3 text-ink">Тепло, которое можно измерить</h3>
                <p className="t-body text-muted mt-2">Замеряем температуру у окна до и после работ — вы видите результат, а не верите на слово.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
