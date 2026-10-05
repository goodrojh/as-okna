"use client";
import React, { useRef, useState } from "react";
import { Wind, Droplets, DoorClosed, Hand, Bug, Baby, Square, Layers, Clock, Banknote, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { SectionHead } from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

const SYMPTOMS = [
  {
    id: "wind", icon: Wind, label: "Дует из окна",
    diagnosis: "Сбита регулировка прижима или износился уплотнитель",
    fix: "Регулируем створки и переводим фурнитуру в зимний режим.",
    price: "от 500 ₽", time: "30–60 минут", image: "old",
  },
  {
    id: "fog", icon: Droplets, label: "Потеет стекло",
    diagnosis: "Разгерметизация стеклопакета или слабая вентиляция",
    fix: "Проверяем стеклопакет, при необходимости меняем, настраиваем микропроветривание.",
    price: "от 1 500 ₽/м²", time: "в течение недели", image: "glass",
  },
  {
    id: "close", icon: DoorClosed, label: "Плохо закрывается",
    diagnosis: "Створка провисла, фурнитура забилась или сломалась",
    fix: "Поднимаем створку, чистим и смазываем механизм, меняем сломанные элементы фурнитуры.",
    price: "от 500 ₽", time: "около 40 минут", image: "repair",
  },
  {
    id: "handle", icon: Hand, label: "Сломалась ручка",
    diagnosis: "Износ или поломка механизма ручки",
    fix: "Ставим новую ручку — обычную, с ключом или кнопкой. Все ручки есть в машине мастера.",
    price: "от 500 ₽", time: "15 минут", image: "lock",
  },
  {
    id: "net", icon: Bug, label: "Нужна сетка",
    diagnosis: "Летом в Краснодаре без москитной сетки никак",
    fix: "Замеряем и ставим рамочную, вставную или плиссе-сетку, в том числе «антикошку».",
    price: "от 1 000 ₽", time: "в течение недели", image: "net",
  },
  {
    id: "kids", icon: Baby, label: "Защита от детей",
    diagnosis: "Ребёнок может открыть окно сам",
    fix: "Ставим ручки с ключом и ограничители открывания — окно откроет только взрослый.",
    price: "от 500 ₽", time: "20 минут", image: "lock",
  },
  {
    id: "crack", icon: Square, label: "Трещина в стекле",
    diagnosis: "Нужна замена стеклопакета — раму менять не нужно",
    fix: "Замеряем, изготавливаем и меняем стеклопакет в той же раме. Без грязи и демонтажа окна.",
    price: "от 1 500 ₽/м²", time: "в течение недели", image: "glass",
  },
  {
    id: "seal", icon: Layers, label: "Порвался уплотнитель",
    diagnosis: "Резинка затвердела, потрескалась или порвалась",
    fix: "Меняем уплотнительную резину по всему периметру створки — под ваш профиль.",
    price: "300 ₽/м", time: "около 1 часа", image: "old",
  },
];

const IMAGES = Array.from(new Set(SYMPTOMS.map((s) => s.image)));

export default function Diagnose() {
  const lead = useLead();
  const [active, setActive] = useState(SYMPTOMS[0]);
  const resultRef = useRef<HTMLDivElement>(null);

  const pick = (s: (typeof SYMPTOMS)[number]) => {
    setActive(s);
    if (window.innerWidth < 1024 && resultRef.current) {
      const r = resultRef.current.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.5 || r.bottom < 0) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <section id="diagnose" className="section bg-cream">
      <div className="wrap">
        <SectionHead
          title="Что случилось с вашим окном?"
          lead="Выберите симптом — покажем причину, решение и честную цену ещё до звонка."
        />

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 md:gap-6 items-stretch">
          <div className="grid grid-cols-2 gap-2.5 md:gap-3 content-start" role="radiogroup" aria-label="Симптом">
            {SYMPTOMS.map((s) => {
              const on = s.id === active.id;
              return (
                <button
                  key={s.id}
                  role="radio"
                  aria-checked={on}
                  onClick={() => pick(s)}
                  className={
                    "flex items-center gap-3 rounded-2xl p-3 md:p-4 min-h-[64px] text-left border transition-colors duration-200 active:scale-[0.98] " +
                    (on ? "bg-ink border-ink text-white" : "bg-white border-line text-ink hover:border-ink/30")
                  }
                >
                  <span className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors " + (on ? "bg-amber text-ink" : "bg-frost text-deep")}>
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[14px] md:text-[15px] font-semibold leading-tight">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div ref={resultRef} className="relative rounded-3xl overflow-hidden min-h-[440px] md:min-h-[480px] bg-ink isolate">
            {/* All images stacked → pure opacity crossfade, no flash of background */}
            {IMAGES.map((name) => (
              <img
                key={name}
                {...pic(name, "(min-width:1024px) 50vw, 100vw")}
                alt=""
                loading="lazy"
                decoding="async"
                className={"absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " + (active.image === name ? "opacity-100" : "opacity-0")}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

            <div className="relative h-full min-h-[inherit] flex flex-col justify-end p-6 md:p-8">
              <div key={active.id} className="anim-fade-in" aria-live="polite">
                  <span className="inline-flex rounded-full bg-white/15 border border-white/20 text-white text-[12px] font-semibold px-3 py-1">Скорее всего</span>
                  <h3 className="t-h3 text-white mt-3 md:text-[28px] text-balance">{active.diagnosis}</h3>
                  <p className="t-body text-white/80 mt-3 max-w-[520px]">{active.fix}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-[14px] text-white tabular-nums">
                      <Banknote className="w-4 h-4 text-amber" /> {active.price}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-[14px] text-white">
                      <Clock className="w-4 h-4 text-amber" /> {active.time}
                    </span>
                  </div>
              </div>
              <button
                onClick={() =>
                  lead.openForm({
                    source: "Диагностика: " + active.label,
                    title: active.label + "? Починим.",
                    subtitle: active.fix,
                    badge: "Цена: " + active.price,
                    image: active.image,
                    withComment: true,
                    commentPlaceholder: "Сколько окон, что именно беспокоит (необязательно)",
                    cta: "Вызвать мастера",
                  })
                }
                className="btn btn-primary mt-6 w-full sm:w-auto sm:self-start"
              >
                <span className="sm:hidden">Вызвать мастера</span>
                <span className="hidden sm:inline">Вызвать мастера по этой проблеме</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
