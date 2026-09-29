"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLead } from "@/components/lead/LeadProvider";

interface Brand {
  id: string;
  name: string;
  kind: string;
  description: string;
  color: string;
}

const brands: Brand[] = [
  { id: "rehau", name: "REHAU", kind: "Профиль · Германия", description: "Регулировка, уплотнитель, фурнитура в наличии", color: "#12324A" },
  { id: "veka", name: "VEKA", kind: "Профиль · Германия", description: "Ремонт створок и замена стеклопакетов", color: "#2F6F9A" },
  { id: "kbe", name: "KBE", kind: "Профиль · Германия", description: "Оригинальный уплотнитель под профиль", color: "#0B1620" },
  { id: "salamander", name: "Salamander", kind: "Профиль · Германия", description: "Сервис и замена фурнитуры", color: "#D9861A" },
  { id: "deceuninck", name: "Deceuninck", kind: "Профиль · Бельгия", description: "Регулировка и ремонт балконных дверей", color: "#12324A" },
  { id: "brusbox", name: "Brusbox", kind: "Профиль · Россия", description: "Ремонт, стеклопакеты, москитные сетки", color: "#2F6F9A" },
  { id: "montblanc", name: "Montblanc", kind: "Профиль · Россия", description: "Замена уплотнителя и ручек", color: "#0B1620" },
  { id: "novotex", name: "Novotex", kind: "Профиль · Россия", description: "Сервис окон в новостройках", color: "#D9861A" },
  { id: "exprof", name: "Exprof", kind: "Профиль · Россия", description: "Устранение продуваний и регулировка", color: "#12324A" },
  { id: "roto", name: "Roto", kind: "Фурнитура · Германия", description: "Замена ножниц, запоров и механизмов", color: "#2F6F9A" },
  { id: "siegenia", name: "Siegenia", kind: "Фурнитура · Германия", description: "Ремонт и замена поворотно-откидных механизмов", color: "#0B1620" },
  { id: "maco", name: "MACO", kind: "Фурнитура · Австрия", description: "Многозапорные замки и антивзлом", color: "#D9861A" },
  { id: "winkhaus", name: "Winkhaus", kind: "Фурнитура · Германия", description: "Регулировка и замена фурнитуры", color: "#12324A" },
  { id: "gu", name: "G-U", kind: "Фурнитура · Германия", description: "Ремонт механизмов открывания", color: "#2F6F9A" },
  { id: "vorne", name: "Vorne", kind: "Фурнитура · Турция", description: "Замена фурнитуры в новостройках", color: "#0B1620" },
  { id: "axor", name: "Axor", kind: "Фурнитура · Россия", description: "Ручки, петли, запорные элементы", color: "#D9861A" },
];

const all = [...brands, ...brands];

export default function Brands() {
  const lead = useLead();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollPos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    const tick = () => {
      if (!isHovered) {
        scrollPos.current += 0.5;
        if (scrollPos.current >= el.scrollWidth / 2) scrollPos.current = 0;
        el.scrollLeft = scrollPos.current;
      } else {
        scrollPos.current = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  return (
    <section className="bg-white py-16 md:py-20 px-5 md:px-20 overflow-hidden">
      <style>{".no-scrollbar::-webkit-scrollbar{display:none}"}</style>
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="flex-1">
            <h2 className="font-display font-semibold text-[28px] md:text-[42px] text-ink mb-2 leading-tight">Чиним окна любых марок</h2>
            <p className="text-[15px] text-muted">Фурнитура и уплотнители для популярных систем — всегда в машине мастера</p>
          </div>
          <button
            onClick={() =>
              lead.openForm({
                source: "Бренды: не нашли профиль",
                title: "Не нашли свой профиль?",
                subtitle: "Напишите марку окна или сфотографируйте маркировку — мастер скажет, есть ли запчасти.",
                image: "repair",
                withComment: true,
                commentPlaceholder: "Марка профиля или фурнитуры (если знаете)",
                withTime: false,
                cta: "Уточнить у мастера",
              })
            }
            className="rounded-full px-6 py-3 text-sm font-semibold text-ink bg-amber hover:bg-amber-dark transition-colors"
          >
            Не нашли свой? Спросите
          </button>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            className="flex flex-row gap-4 overflow-x-auto pb-4 no-scrollbar cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none" }}
          >
            {all.map((b, i) => (
              <motion.div
                key={b.id + "-" + i}
                whileHover={{ y: -4 }}
                className="min-w-[210px] md:min-w-[250px] bg-cream border border-line rounded-[16px] p-6 md:p-7 flex flex-col gap-3 transition-all duration-200 hover:bg-white hover:shadow-[0_4px_20px_rgba(11,22,32,0.08)]"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-bold text-[15px]" style={{ background: b.color }}>
                  {b.name.slice(0, 1)}
                </div>
                <h3 className="font-bold text-[17px] text-ink tracking-tight">{b.name}</h3>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-glass -mt-1">{b.kind}</p>
                <p className="text-[13px] text-muted leading-[1.5]">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
