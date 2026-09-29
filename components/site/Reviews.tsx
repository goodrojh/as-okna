"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";

// ВНИМАНИЕ: примеры. Замените на реальные отзывы с Яндекс Карт / 2ГИС перед запуском.
const REVIEWS = [
  { name: "Ирина", area: "ЮМР", text: "В детской дуло так, что ставили обогреватель. Мастер за час всё отрегулировал и поменял резинку — теперь тепло. Цена ровно как сказали по телефону.", service: "Устранение сквозняка" },
  { name: "Алексей", area: "Фестивальный", text: "Треснул стеклопакет. Замерили, через 3 дня поставили новый — рама осталась родная, никакой грязи. Рекомендую.", service: "Замена стеклопакета" },
  { name: "Марина", area: "Гидрострой", text: "Поставили ручки с ключом на все окна — у нас кот и маленький сын. Приехали в тот же день, очень вежливые ребята.", service: "Детские замки" },
  { name: "Сергей", area: "п. Яблоновский", text: "Балконная дверь не закрывалась полгода. Думал, менять. Оказалось — провисла створка, починили за 40 минут.", service: "Ремонт балконной двери" },
  { name: "Ольга", area: "Центр", text: "Заказывали москитные сетки «антикошка» на 4 окна. Сделали аккуратно, по цене дешевле, чем у застройщика предлагали.", service: "Москитные сетки" },
  { name: "Дмитрий", area: "Панорама", text: "Подготовили все окна к зиме по пакету. Счёт за отопление заметно меньше, а на кухне больше не потеет стекло.", service: "Пакет «Тёплая зима»" },
];

export default function Reviews() {
  const lead = useLead();
  return (
    <section id="reviews" className="bg-ink py-20 md:py-28 px-5 md:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-amber">Отзывы</span>
            <h2 className="font-display text-[30px] md:text-5xl font-semibold text-white mt-3 leading-[1.1]">
              Нам доверяют <br />
              <span className="italic font-light text-amber">соседи по Краснодару</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 w-fit">
            <span className="font-display text-4xl text-white">4,9</span>
            <div>
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                ))}
              </div>
              <p className="text-[13px] text-white/60 mt-1">Яндекс Карты</p>
            </div>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-2" style={{ scrollbarWidth: "none" }}>
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="snap-start min-w-[85%] sm:min-w-[60%] md:min-w-0 rounded-[24px] bg-white/[0.05] border border-white/10 p-6 md:p-7 flex flex-col hover:bg-white/[0.08] transition-colors"
            >
              <Quote className="w-7 h-7 text-amber/70" />
              <p className="text-[15px] text-white/85 leading-relaxed mt-4 flex-1">{r.text}</p>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center font-display font-semibold text-ink">
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-white">{r.name}</p>
                  <p className="text-[12px] text-white/50">{r.area} · {r.service}</p>
                </div>
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Star key={k} className="w-3 h-3 fill-amber text-amber" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() =>
              lead.openForm({
                source: "Отзывы: хочу так же",
                title: "Хочу так же тепло",
                subtitle: "Оставьте номер — мастер перезвонит за 5 минут и приедет в удобное время.",
                image: "night",
                badge: "4,9 ★ на Яндекс Картах",
              })
            }
            className="rounded-full px-8 py-4 font-semibold bg-amber hover:bg-amber-dark text-ink transition-all hover:scale-105"
          >
            Хочу так же — вызвать мастера
          </button>
        </div>
      </div>
    </section>
  );
}
