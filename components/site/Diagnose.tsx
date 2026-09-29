"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wind, Droplets, DoorClosed, Hand, Bug, Baby, Square, Home, Clock, Banknote, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { img } from "@/lib/site";

const SYMPTOMS = [
  {
    id: "wind", icon: Wind, label: "Дует из окна",
    diagnosis: "Сбита регулировка прижима или износился уплотнитель",
    fix: "Регулируем створки, меняем уплотнитель, переводим фурнитуру в зимний режим.",
    price: "от 500 ₽", time: "30–60 минут", image: "old",
  },
  {
    id: "fog", icon: Droplets, label: "Потеет стекло",
    diagnosis: "Разгерметизация стеклопакета или плохая вентиляция",
    fix: "Проверяем стеклопакет, при необходимости меняем на энергосберегающий, настраиваем микропроветривание.",
    price: "от 1 500 ₽/м²", time: "1–3 дня", image: "glass",
  },
  {
    id: "close", icon: DoorClosed, label: "Плохо закрывается",
    diagnosis: "Створка провисла, фурнитура забилась или сломалась",
    fix: "Поднимаем створку, чистим и смазываем механизм, меняем сломанные элементы фурнитуры.",
    price: "от 500 ₽", time: "40 минут", image: "repair",
  },
  {
    id: "handle", icon: Hand, label: "Сломалась ручка",
    diagnosis: "Износ или поломка механизма ручки",
    fix: "Ставим новую ручку в тон окна — обычную, с ключом или кнопкой. Все ручки есть в машине мастера.",
    price: "от 500 ₽", time: "15 минут", image: "lock",
  },
  {
    id: "net", icon: Bug, label: "Нужна сетка",
    diagnosis: "Летом в Краснодаре без москитной сетки никак",
    fix: "Замеряем и ставим рамочную, вставную или плиссе-сетку, в том числе «антикошку».",
    price: "от 1 000 ₽", time: "1–2 дня", image: "net",
  },
  {
    id: "kids", icon: Baby, label: "Защита от детей",
    diagnosis: "Ребёнок может открыть окно сам",
    fix: "Ставим ручки с ключом, блокираторы и ограничители открывания — окно откроет только взрослый.",
    price: "от 500 ₽", time: "20 минут", image: "lock",
  },
  {
    id: "crack", icon: Square, label: "Трещина в стекле",
    diagnosis: "Нужна замена стеклопакета — раму менять не нужно",
    fix: "Замеряем, изготавливаем и меняем стеклопакет в той же раме. Без грязи и демонтажа окна.",
    price: "от 1 500 ₽/м²", time: "2–4 дня", image: "glass",
  },
  {
    id: "new", icon: Home, label: "Нужно новое окно",
    diagnosis: "Старое окно не подлежит ремонту или хочется панорамы",
    fix: "Бесплатный замер, монтаж по ГОСТ, откосы и подоконники. Остекление балконов и лоджий.",
    price: "по замеру", time: "от 1 дня", image: "install",
  },
];

export default function Diagnose() {
  const lead = useLead();
  const [active, setActive] = useState(SYMPTOMS[0]);
  const resultRef = useRef<HTMLDivElement>(null);

  const pick = (s: (typeof SYMPTOMS)[number]) => {
    setActive(s);
    if (window.innerWidth < 1024) {
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
    }
  };

  return (
    <section id="diagnose" className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-cream relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-glass"
          >
            Диагностика за 10 секунд
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[30px] md:text-5xl font-semibold text-ink mt-3 leading-[1.1]"
          >
            Что случилось <br className="hidden md:block" />с вашим окном?
          </motion.h2>
          <p className="text-[16px] md:text-lg text-muted mt-4">Выберите симптом — покажем причину, решение и честную цену ещё до звонка.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-stretch">
          <div className="grid grid-cols-2 gap-2.5 md:gap-3 content-start">
            {SYMPTOMS.map((s) => {
              const on = s.id === active.id;
              return (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pick(s)}
                  className={
                    "relative flex items-center gap-3 rounded-2xl px-4 py-4 md:py-5 text-left border transition-all overflow-hidden " +
                    (on ? "bg-ink border-ink text-white shadow-xl shadow-ink/20" : "bg-white border-line text-ink hover:border-ink/30")
                  }
                >
                  <span className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + (on ? "bg-amber text-ink" : "bg-frost text-deep")}>
                    <s.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[14px] md:text-[15px] font-semibold leading-tight">{s.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div ref={resultRef} className="relative rounded-[28px] overflow-hidden min-h-[460px] bg-ink">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                <motion.img
                  src={img(active.image)}
                  alt={active.label}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={active.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  <span className="inline-flex rounded-full bg-white/15 backdrop-blur border border-white/20 text-white text-[12px] font-semibold px-3 py-1">
                    Скорее всего:
                  </span>
                  <h3 className="font-display text-[22px] md:text-[28px] text-white leading-tight mt-3">{active.diagnosis}</h3>
                  <p className="text-[15px] text-white/75 mt-3 leading-relaxed max-w-[520px]">{active.fix}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-[14px] text-white">
                      <Banknote className="w-4 h-4 text-amber" /> {active.price}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-[14px] text-white">
                      <Clock className="w-4 h-4 text-amber" /> {active.time}
                    </span>
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
                    className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber hover:bg-amber-dark text-ink font-semibold px-7 py-4 transition-all hover:gap-3"
                  >
                    Вызвать мастера по этой проблеме <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
