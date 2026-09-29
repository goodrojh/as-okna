"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { img } from "@/lib/site";

const SERVICES = [
  { name: "Регулировка, чистка и смазка фурнитуры", note: "Окно закрывается легко, не дует", price: "от 500 ₽", image: "repair" },
  { name: "Устранение сквозняков и продуваний", note: "Находим и закрываем все щели", price: "от 500 ₽", image: "old" },
  { name: "Замена уплотнительной резины", note: "Немецкий уплотнитель под ваш профиль", price: "300 ₽/м", image: "old" },
  { name: "Замена стеклопакета", note: "Энергосберегающий, тонированный, шумоизоляция", price: "от 1 500 ₽/м²", image: "glass" },
  { name: "Замена фурнитуры, многозапорные замки", note: "Roto, Siegenia, MACO, Winkhaus и др.", price: "от 1 000 ₽", image: "repair" },
  { name: "Ручки, детские замки, балконные защёлки", note: "Безопасность для детей и питомцев", price: "от 500 ₽", image: "lock" },
  { name: "Москитные сетки: замер и установка", note: "Рамочные, плиссе, «антикошка»", price: "от 1 000 ₽", image: "net" },
  { name: "Подоконники и отливы", note: "Монтаж и замена под размер", price: "300 ₽/п.м.", image: "sill" },
  { name: "Герметизация швов", note: "Снаружи и изнутри, без протечек", price: "300 ₽/п.м.", image: "install" },
  { name: "Ремонт балконной двери", note: "Провисла, не закрывается, продувает", price: "от 500 ₽", image: "balcony" },
  { name: "Установка окон, остекление балконов", note: "Замер, демонтаж, монтаж по ГОСТ", price: "по замеру", image: "house" },
];

export default function Services() {
  const lead = useLead();
  const [active, setActive] = useState(0);

  const order = (i: number) => {
    const s = SERVICES[i];
    lead.openForm({
      source: "Прайс: " + s.name,
      title: s.name,
      subtitle: s.note + ". Мастер перезвонит, уточнит детали и назовёт точную цену.",
      badge: "Цена: " + s.price,
      image: s.image,
      withComment: true,
      commentPlaceholder: "Сколько окон, адрес или район (необязательно)",
      cta: "Заказать",
    });
  };

  return (
    <section id="services" className="w-full px-5 md:px-8 py-20 md:py-[120px] bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-glass">Услуги и цены</span>
            <h2 className="font-display text-[30px] md:text-5xl font-semibold text-ink mt-3 leading-[1.1]">
              Честный прайс. <br />
              <span className="italic font-light text-glass">Без звёздочек.</span>
            </h2>
          </div>
          <p className="text-[16px] text-muted max-w-[420px]">
            Цены на сайте — реальные. Итоговую стоимость мастер назовёт на месте до начала работ и зафиксирует в смете.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          {/* Sticky image (desktop) */}
          <div className="hidden lg:block sticky top-28 rounded-[28px] overflow-hidden h-[600px] relative bg-ink">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={SERVICES[active].image}
                src={img(SERVICES[active].image)}
                alt=""
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <p className="font-display text-[22px] text-white leading-tight">{SERVICES[active].name}</p>
                  <p className="text-amber font-semibold mt-2 text-lg">{SERVICES[active].price}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <motion.button
                key={s.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => order(i)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.2) }}
                className={
                  "group w-full text-left flex items-center gap-4 py-5 px-1 md:px-5 rounded-2xl border-b border-line transition-all " +
                  (active === i ? "lg:bg-white lg:shadow-lg lg:shadow-ink/5 lg:border-transparent" : "")
                }
              >
                <img src={img(s.image)} alt="" className="lg:hidden w-14 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] md:text-[17px] font-semibold text-ink leading-snug">{s.name}</p>
                  <p className="text-[13px] md:text-[14px] text-muted mt-1">{s.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[15px] md:text-[18px] font-bold text-ink whitespace-nowrap">{s.price}</p>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-glass group-hover:text-amber-dark transition-colors mt-1">
                    Заказать <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
