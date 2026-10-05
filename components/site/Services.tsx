"use client";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { SectionHead } from "@/components/ui/Reveal";
import { pic, thumb } from "@/lib/site";

const SERVICES = [
  { name: "Регулировка, чистка и смазка фурнитуры", note: "Окно закрывается легко, не дует", price: "от 500 ₽", image: "repair" },
  { name: "Устранение сквозняков и продуваний", note: "Находим и закрываем все щели", price: "от 500 ₽", image: "old" },
  { name: "Замена уплотнительной резины", note: "Немецкий уплотнитель под ваш профиль", price: "300 ₽/м", image: "old" },
  { name: "Замена стеклопакета", note: "Энергосберегающий, мультифункциональный, тонированный", price: "от 1 500 ₽/м²", image: "glass" },
  { name: "Замена фурнитуры, многозапорные замки", note: "Акадо, ВХС, Ворне, Рото, Зигения и др.", price: "от 1 000 ₽", image: "repair" },
  { name: "Ручки, детские замки, балконные защёлки", note: "Безопасность для детей и питомцев", price: "от 500 ₽", image: "lock" },
  { name: "Москитные сетки: замер и установка", note: "Рамочные, плиссе, «антикошка»", price: "от 1 000 ₽", image: "net" },
  { name: "Подоконники и отливы", note: "Монтаж и замена", price: "от 500 ₽/п.м.", image: "sill" },
  { name: "Герметизация швов", note: "Снаружи и изнутри, без протечек", price: "от 500 ₽/п.м.", image: "install" },
  { name: "Ремонт балконной двери", note: "Провисла, не закрывается, продувает", price: "от 500 ₽", image: "balcony" },
];

const IMAGES = Array.from(new Set(SERVICES.map((s) => s.image)));

export default function Services() {
  const lead = useLead();
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

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
    <section id="services" className="section bg-cream">
      <div className="wrap">
        <SectionHead
          title={<>Честный прайс. <span className="text-glass">Без звёздочек.</span></>}
          lead="Цены на сайте — реальные. Итоговую стоимость мастер назовёт на месте до начала работ."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
          {/* Sticky preview (desktop) */}
          <div className="hidden lg:block sticky top-28 rounded-3xl overflow-hidden h-[620px] relative bg-ink isolate">
            {IMAGES.map((name) => (
              <img
                key={name}
                {...pic(name, "40vw")}
                alt=""
                loading="lazy"
                decoding="async"
                className={"absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " + (current.image === name ? "opacity-100" : "opacity-0")}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="t-h3 text-white">{current.name}</p>
              <p className="text-amber font-semibold mt-2 text-lg tabular-nums">{current.price}</p>
            </div>
          </div>

          <ul className="flex flex-col border-t border-line">
            {SERVICES.map((s, i) => (
              <li key={s.name} className="border-b border-line">
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => order(i)}
                  className={
                    "group w-full text-left flex items-start sm:items-center gap-4 py-4 md:py-5 px-0 lg:px-5 lg:rounded-2xl transition-colors duration-200 " +
                    (active === i ? "lg:bg-white" : "")
                  }
                >
                  <img
                    src={thumb(s.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                    className="lg:hidden w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] md:text-[17px] font-semibold text-ink leading-snug">{s.name}</p>
                    <p className="text-[13px] md:text-[14px] text-muted mt-1">{s.note}</p>
                    {/* Phones: price sits under the text so the name gets the full width */}
                    <p className="sm:hidden mt-2 flex items-center gap-3 text-[15px] font-semibold text-ink tabular-nums">
                      {s.price}
                      <span className="inline-flex items-center gap-1 text-[13px] text-glass">
                        Заказать <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </p>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <p className="text-[15px] md:text-[18px] font-semibold text-ink whitespace-nowrap tabular-nums">{s.price}</p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-glass mt-1">
                      Заказать <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
