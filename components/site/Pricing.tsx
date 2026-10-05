"use client";
import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import Reveal, { SectionHead } from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

const plans = [
  {
    name: "Сервис",
    tagline: "Когда окно просто капризничает",
    price: "от 500 ₽",
    unit: "за створку",
    isPopular: false,
    image: "repair",
    features: ["Выезд и диагностика", "Регулировка прижима", "Чистка и смазка фурнитуры", "Проверка запоров и ручек", "Советы по уходу", "Гарантия на работы — 1 год"],
  },
  {
    name: "Тёплая зима",
    tagline: "Полная подготовка к холодам",
    price: "от 1 900 ₽",
    unit: "за окно",
    isPopular: true,
    image: "night",
    features: ["Всё из пакета «Сервис»", "Замена уплотнителя", "Перевод в зимний режим", "Герметизация швов", "Устранение продуваний", "Гарантия на работы — 1 год"],
  },
];

export default function Pricing() {
  const lead = useLead();

  return (
    <section id="pricing" className="section bg-cream">
      <div className="wrap">
        <SectionHead
          center
          title={<>Готовые пакеты. <span className="text-glass">Понятные цены.</span></>}
          lead="Выберите, что нужно вашему окну. Не уверены — мастер подскажет бесплатно."
        />

        <Reveal className="relative rounded-3xl md:rounded-[32px] overflow-hidden isolate shadow-[0_30px_80px_-30px_rgba(11,22,32,0.4)]">
          <img {...pic("balcony")} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep/30" />

          <div className="relative m-3 md:m-10 lg:mx-auto lg:my-12 lg:max-w-[880px] rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-white/50">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink/10">
              {plans.map((plan) => (
                <div key={plan.name} className={"flex flex-col p-6 md:p-8 " + (plan.isPopular ? "bg-white/70" : "")}>
                  <div className="flex items-center justify-between gap-2 min-h-[28px]">
                    <h3 className="t-h3 text-ink">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase bg-amber text-ink">Выбирают чаще</span>
                    )}
                  </div>
                  <p className="text-[14px] text-muted mt-1.5">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2 flex-wrap">
                    <span className="font-display font-semibold text-[36px] md:text-[42px] text-ink leading-none tracking-[-0.03em] tabular-nums">{plan.price}</span>
                    <span className="text-[13px] text-muted">{plan.unit}</span>
                  </div>

                  <button
                    onClick={() =>
                      lead.openForm({
                        source: "Пакет: " + plan.name,
                        title: "Пакет «" + plan.name + "»",
                        subtitle: plan.tagline + ". Мастер перезвонит, уточнит количество окон и назовёт итоговую цену.",
                        badge: plan.price + " " + plan.unit,
                        image: plan.image,
                        withComment: true,
                        commentPlaceholder: "Сколько окон и где (необязательно)",
                        cta: "Заказать пакет",
                      })
                    }
                    className={"btn mt-6 w-full justify-between pl-6 pr-2 " + (plan.isPopular ? "btn-primary" : "btn-dark")}
                  >
                    Заказать
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center " + (plan.isPopular ? "bg-ink text-amber" : "bg-amber text-ink")}>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>

                  <ul className="mt-7 pt-7 border-t border-ink/10 flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[14px] text-ink/85">
                        <span className="w-5 h-5 rounded-full bg-ink/5 border border-ink/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-ink stroke-[2.5]" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
