"use client";
import React from "react";
import { useLead } from "@/components/lead/LeadProvider";
import { SectionHead } from "@/components/ui/Reveal";

const brands = [
  { name: "REHAU", kind: "Профиль · Германия", description: "Регулировка, уплотнитель, фурнитура в наличии" },
  { name: "VEKA", kind: "Профиль · Германия", description: "Ремонт створок и замена стеклопакетов" },
  { name: "KBE", kind: "Профиль · Германия", description: "Оригинальный уплотнитель под профиль" },
  { name: "Salamander", kind: "Профиль · Германия", description: "Сервис и замена фурнитуры" },
  { name: "Deceuninck", kind: "Профиль · Бельгия", description: "Регулировка и ремонт балконных дверей" },
  { name: "Brusbox", kind: "Профиль · Россия", description: "Ремонт, стеклопакеты, москитные сетки" },
  { name: "Montblanc", kind: "Профиль · Россия", description: "Замена уплотнителя и ручек" },
  { name: "Novotex", kind: "Профиль · Россия", description: "Сервис окон в новостройках" },
  { name: "Exprof", kind: "Профиль · Россия", description: "Устранение продуваний и регулировка" },
  { name: "Roto", kind: "Фурнитура · Германия", description: "Замена ножниц, запоров и механизмов" },
  { name: "Siegenia", kind: "Фурнитура · Германия", description: "Поворотно-откидные механизмы" },
  { name: "MACO", kind: "Фурнитура · Австрия", description: "Многозапорные замки и антивзлом" },
  { name: "Winkhaus", kind: "Фурнитура · Германия", description: "Регулировка и замена фурнитуры" },
  { name: "G-U", kind: "Фурнитура · Германия", description: "Ремонт механизмов открывания" },
  { name: "Vorne", kind: "Фурнитура · Турция", description: "Замена фурнитуры в новостройках" },
  { name: "Axor", kind: "Фурнитура · Россия", description: "Ручки, петли, запорные элементы" },
];

const COLORS = ["#12324A", "#2C6A94", "#0B1620", "#95580C"];

function Card({ b, i }: { b: (typeof brands)[number]; i: number }) {
  return (
    <div className="w-[230px] md:w-[260px] shrink-0 bg-cream border border-line rounded-2xl p-6 flex flex-col gap-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-display font-semibold text-[16px]" style={{ background: COLORS[i % COLORS.length] }}>
        {b.name[0]}
      </div>
      <p className="font-semibold text-[17px] text-ink tracking-[-0.01em] mt-1">{b.name}</p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-glass -mt-1">{b.kind}</p>
      <p className="text-[13px] text-muted leading-[1.5]">{b.description}</p>
    </div>
  );
}

export default function Brands() {
  const lead = useLead();

  return (
    <section className="section bg-white overflow-hidden">
      <div className="wrap">
        <SectionHead
          title="Чиним окна любых профилей"
          lead="Фурнитура и уплотнители для популярных систем — всегда в машине мастера."
          action={
            <button
              onClick={() =>
                lead.openForm({
                  source: "Бренды: не нашли профиль",
                  title: "Не нашли свой профиль?",
                  subtitle: "Напишите марку окна или маркировку с торца рамы — мастер скажет, есть ли запчасти.",
                  image: "repair",
                  withComment: true,
                  commentPlaceholder: "Марка профиля или фурнитуры (если знаете)",
                  cta: "Уточнить у мастера",
                })
              }
              className="btn btn-dark w-full md:w-auto"
            >
              Не нашли свой? Спросите
            </button>
          }
        />
      </div>

      {/* Pure CSS marquee: runs on the compositor, pauses on hover, no JS per frame */}
      <div
        className="relative"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="anim-marquee flex w-max gap-4 will-change-transform">
          {[...brands, ...brands].map((b, i) => (
            <Card key={b.name + i} b={b} i={i % brands.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
