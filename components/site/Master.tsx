"use client";
import React from "react";
import { Phone, Building2, Home, MapPin, CalendarCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Messengers from "@/components/ui/Messengers";
import { useLead } from "@/components/lead/LeadProvider";
import { PHONE, PHONE_HREF, img } from "@/lib/site";

const FACTS = [
  { icon: CalendarCheck, value: "С 2007 года", label: "в оконном деле" },
  { icon: Building2, value: "Гособъекты", label: "реализованные проекты" },
  { icon: Home, value: "Коттеджи", label: "множество загородных домов" },
  { icon: MapPin, value: "Юг России", label: "география работ" },
];

export default function Master() {
  const lead = useLead();
  return (
    <section id="master" className="section bg-cream">
      <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <Reveal className="relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-ink isolate">
            <img
              src={img("master")}
              srcSet={`${img("master-800")} 700w, ${img("master")} 1100w`}
              sizes="(min-width:1024px) 40vw, 100vw"
              alt="Георгий — мастер по ремонту окон AS·окна"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-white font-semibold text-[20px] leading-tight">Георгий</p>
                <p className="text-white/75 text-[14px]">мастер и основатель AS·окна</p>
              </div>
              <span className="rounded-full bg-amber text-ink text-[12px] font-semibold px-3 py-1.5 whitespace-nowrap">19 лет опыта</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="t-h2 text-ink">
            Здравствуйте, я <span className="text-glass">Георгий</span>
          </h2>
          <div className="t-lead text-ink/80 mt-6 space-y-4">
            <p>
              Окнами я занимаюсь с 2007 года. За это время реализовывал государственные объекты, множество загородных коттеджей, квартиры и офисы — по всему
              югу России.
            </p>
            <p>
              Мой подход простой: честно сказать, что можно починить, а что нет, и назвать цену до начала работ. Если окно можно вернуть к жизни ремонтом — я не
              буду навязывать замену.
            </p>
            <p>За годы работы у меня налажены связи с поставщиками, поэтому достану любые комплектующие — даже для редких систем. На все работы даю гарантию 1 год.</p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {FACTS.map((f) => (
              <li key={f.value} className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 rounded-2xl bg-white border border-line p-4">
                <span className="w-10 h-10 rounded-xl bg-frost text-deep flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold text-ink leading-tight">{f.value}</span>
                  <span className="block text-[13px] text-muted leading-snug mt-0.5">{f.label}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <a href={PHONE_HREF} className="btn btn-dark tabular-nums">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <button
              onClick={() =>
                lead.openForm({
                  source: "О мастере: вызвать Георгия",
                  title: "Вызвать Георгия",
                  subtitle: "Оставьте номер — я перезвоню, задам пару вопросов и назову ориентир по цене.",
                  image: "measure",
                  withComment: true,
                })
              }
              className="btn btn-primary"
            >
              Вызвать мастера
            </button>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-[14px] text-muted">или напишите мне:</span>
            <Messengers size={38} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
