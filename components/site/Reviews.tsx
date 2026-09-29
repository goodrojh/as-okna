"use client";
import React from "react";
import { Star, Quote } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import Reveal, { SectionHead } from "@/components/ui/Reveal";

// ВНИМАНИЕ: примеры. Замените на реальные отзывы с Яндекс Карт / 2ГИС перед запуском.
const REVIEWS = [
  { name: "Ирина", area: "ЮМР", text: "В детской дуло так, что ставили обогреватель. Мастер за час всё отрегулировал и поменял резинку — теперь тепло. Цена ровно как сказали по телефону.", service: "Устранение сквозняка" },
  { name: "Алексей", area: "Фестивальный", text: "Треснул стеклопакет. Замерили, через 3 дня поставили новый — рама осталась родная, никакой грязи. Рекомендую.", service: "Замена стеклопакета" },
  { name: "Марина", area: "Гидрострой", text: "Поставили ручки с ключом на все окна — у нас кот и маленький сын. Приехали в тот же день, очень вежливые ребята.", service: "Детские замки" },
  { name: "Сергей", area: "п. Яблоновский", text: "Балконная дверь не закрывалась полгода. Думал, менять. Оказалось — провисла створка, починили за 40 минут.", service: "Ремонт балконной двери" },
  { name: "Ольга", area: "Центр", text: "Заказывали москитные сетки «антикошка» на 4 окна. Сделали аккуратно, по цене дешевле, чем предлагал застройщик.", service: "Москитные сетки" },
  { name: "Дмитрий", area: "Панорама", text: "Подготовили все окна к зиме по пакету. Счёт за отопление заметно меньше, а на кухне больше не потеет стекло.", service: "Пакет «Тёплая зима»" },
];

function Stars({ size = 4 }: { size?: number }) {
  return (
    <span className="flex" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="fill-amber text-amber" style={{ width: size * 4, height: size * 4 }} />
      ))}
    </span>
  );
}

export default function Reviews() {
  const lead = useLead();
  return (
    <section id="reviews" className="section bg-ink">
      <div className="wrap">
        <SectionHead
          dark
          eyebrow="Отзывы"
          title={<>Нам доверяют <span className="text-amber">соседи по Краснодару</span></>}
          action={
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 px-5 py-4 w-fit">
              <span className="font-display font-semibold text-[40px] leading-none text-white tracking-[-0.03em]">4,9</span>
              <div>
                <Stars />
                <p className="text-[13px] text-white/60 mt-1.5">Яндекс Карты</p>
              </div>
            </div>
          }
        />

        <div className="no-scrollbar flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 scroll-px-5">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name}
              delay={(i % 3) * 0.08}
              className="snap-start shrink-0 w-[86%] sm:w-[60%] md:w-auto rounded-3xl bg-white/[0.05] border border-white/10 p-6 md:p-7 flex flex-col"
            >
              <Quote className="w-7 h-7 text-amber/70" aria-hidden />
              <p className="t-body text-white/85 mt-4 flex-1">{r.text}</p>
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center font-semibold text-ink shrink-0">{r.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-white">{r.name}</p>
                  <p className="text-[12px] text-white/55 truncate">{r.area} · {r.service}</p>
                </div>
                <Stars size={3} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
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
            className="btn btn-primary w-full sm:w-auto"
          >
            Хочу так же — вызвать мастера
          </button>
        </Reveal>
      </div>
    </section>
  );
}
