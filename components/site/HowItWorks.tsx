"use client";
import React from "react";
import { PhoneCall, CalendarCheck, CheckCircle, ShieldCheck } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import Reveal, { SectionHead } from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

const glass = "w-full h-full bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-4 md:p-6 shadow-2xl shadow-black/10 overflow-hidden";
const SIZES = "(min-width:768px) 33vw, 100vw";

function Visual01() {
  return (
    <div className={glass + " flex flex-col justify-center gap-2"}>
      <div className="bg-white/70 rounded-lg border border-white/50 px-2.5 py-2 flex items-center gap-2.5">
        <CheckCircle className="h-4 w-4 text-ink/60 shrink-0" />
        <div>
          <p className="text-[11px] font-semibold leading-none text-ink">Заявка принята</p>
          <p className="text-[10px] text-ink/60 leading-none mt-1">с сайта · 09:12</p>
        </div>
      </div>
      <div className="relative bg-white rounded-lg px-2.5 py-2.5 flex items-center gap-2.5 border border-amber/40 overflow-hidden shadow-lg">
        <span className="anim-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-amber/25 to-transparent pointer-events-none" />
        <span className="w-7 h-7 rounded-md bg-amber/15 flex items-center justify-center shrink-0">
          <PhoneCall className="h-3.5 w-3.5 text-amber-ink" />
        </span>
        <div>
          <p className="text-[12px] font-semibold leading-none text-ink">Мастер перезванивает</p>
          <p className="text-[10px] text-muted leading-none mt-1">через 5 минут</p>
        </div>
      </div>
      <div className="bg-white/70 rounded-lg border border-white/50 px-2.5 py-2 flex items-center gap-2.5">
        <CalendarCheck className="h-4 w-4 text-ink/60 shrink-0" />
        <div>
          <p className="text-[11px] font-semibold leading-none text-ink">Выезд согласован</p>
          <p className="text-[10px] text-ink/60 leading-none mt-1">сегодня, 14:00</p>
        </div>
      </div>
    </div>
  );
}

function Visual02() {
  return (
    <div className={glass + " flex items-center justify-between gap-3"}>
      <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
        <span className="w-3 h-3 rounded-full bg-amber shadow-[0_0_14px_#F2A33A] z-10" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="anim-ripple absolute inset-0 rounded-full border border-white/60" style={{ animationDelay: i * 1.33 + "s" }} />
        ))}
        {[1, 2, 3].map((i) => (
          <span key={"s" + i} className="absolute rounded-full border border-white/20" style={{ width: i * 33 + "%", height: i * 33 + "%" }} />
        ))}
      </div>
      <div className="flex flex-col gap-2 items-end">
        {["Диагностика", "Ремонт", "Проверка"].map((text, i) => (
          <span
            key={text}
            className={"rounded-lg px-3 py-2 min-w-[96px] text-center text-[11px] font-semibold leading-none shadow-lg shadow-black/5 " + (i === 1 ? "bg-amber text-ink" : "bg-white text-ink")}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

function Visual03() {
  return (
    <div className={glass + " flex flex-col justify-center gap-3"}>
      <div className="bg-white rounded-lg p-2.5 flex items-center gap-3 shadow-lg">
        <span className="w-9 h-9 rounded-md bg-amber/15 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-amber-ink" />
        </span>
        <div className="flex-1 flex items-end gap-1 h-8">
          {[5, 6, 7, 7, 8, 9, 10, 11, 12, 12].map((h, i) => (
            <span key={i} className="anim-bar flex-1 bg-amber/45 rounded-[2px]" style={{ height: h * 2.5 + "px", animationDelay: i * 0.08 + "s" }} />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg px-3 py-2 w-fit flex items-center gap-2 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-[11px] font-semibold leading-none text-ink">Гарантия до 3 лет · в договоре</span>
      </div>
    </div>
  );
}

const STEPS = [
  { n: "01", image: "measure", alt: "Мастер согласует выезд", title: "Звоните или оставьте заявку", text: "Перезвоним за 5 минут, зададим пару вопросов и назовём ориентир по цене.", Visual: Visual01 },
  { n: "02", image: "install", alt: "Мастер выполняет работы", title: "Мастер чинит за 1 визит", text: "Застилаем пол, работаем аккуратно, убираем за собой. Цена — как в смете, ни рублём больше.", Visual: Visual02 },
  { n: "03", image: "night", alt: "Уютный вечер у тёплого окна", title: "Живёте в тепле с гарантией", text: "Письменная гарантия до 3 лет. Если что-то пойдёт не так — приедем и исправим бесплатно.", Visual: Visual03 },
];

export default function HowItWorks() {
  const lead = useLead();

  return (
    <section id="how" className="section bg-white">
      <div className="wrap">
        <SectionHead center eyebrow="Как мы работаем" title={<>Тёплый дом <span className="text-glass">за 3 простых шага</span></>} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {STEPS.map(({ n, image, alt, title, text, Visual }, i) => (
            <Reveal key={n} delay={i * 0.1} className="flex flex-col gap-6">
              <div className="rounded-3xl overflow-hidden relative aspect-[4/3] w-full isolate">
                <img {...pic(image, SIZES)} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/10" />
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-7 lg:p-10" aria-hidden>
                  <Visual />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit rounded-full text-amber-ink text-[12px] font-semibold px-3 py-1 border border-amber tabular-nums">Шаг {n}</span>
                <h3 className="t-h3 text-ink">{title}</h3>
                <p className="t-body text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() =>
              lead.openForm({
                source: "Как работаем: вызвать мастера",
                title: "Начнём с шага 01",
                subtitle: "Оставьте номер — перезвоним за 5 минут и согласуем выезд мастера.",
                image: "measure",
                badge: "Выезд и диагностика — 0 ₽",
              })
            }
            className="btn btn-primary w-full sm:w-auto"
          >
            Вызвать мастера
          </button>
          <button
            onClick={() =>
              lead.openForm({
                source: "Как работаем: вопрос",
                title: "Задайте вопрос мастеру",
                subtitle: "Опишите ситуацию — мастер перезвонит и бесплатно проконсультирует.",
                image: "repair",
                withComment: true,
                commentPlaceholder: "Ваш вопрос",
                withTime: false,
                cta: "Получить консультацию",
              })
            }
            className="btn btn-light w-full sm:w-auto"
          >
            Задать вопрос
          </button>
        </Reveal>
      </div>
    </section>
  );
}
