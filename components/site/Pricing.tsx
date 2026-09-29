"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { img } from "@/lib/site";

const plans = [
  {
    name: "Сервис",
    tagline: "Когда окно просто капризничает",
    price: "от 500 ₽",
    unit: "/створка",
    isPopular: false,
    image: "repair",
    features: ["Выезд и диагностика", "Регулировка прижима", "Чистка и смазка фурнитуры", "Проверка запоров и ручек", "Советы по уходу", "Гарантия 1 год"],
  },
  {
    name: "Тёплая зима",
    tagline: "Полная подготовка к холодам",
    price: "от 1 900 ₽",
    unit: "/окно",
    isPopular: true,
    image: "night",
    features: ["Всё из пакета «Сервис»", "Замена уплотнителя", "Перевод в зимний режим", "Герметизация швов", "Устранение продуваний", "Гарантия 2 года"],
  },
  {
    name: "Под ключ",
    tagline: "Новые окна и остекление балконов",
    price: "по замеру",
    unit: "",
    isPopular: false,
    image: "house",
    features: ["Бесплатный замер", "Демонтаж и вывоз мусора", "Монтаж по ГОСТ", "Откосы и подоконники", "Уборка после работ", "Гарантия 3 года"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-ink" />
      ))}
    </div>
  );
}

export default function Pricing() {
  const lead = useLead();

  return (
    <section id="pricing" className="w-full px-0 py-16 md:py-24 bg-cream overflow-hidden relative">
      <div className="text-center px-5 mb-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display font-semibold text-[30px] md:text-[48px] text-ink leading-[1.06] tracking-tight"
        >
          Готовые пакеты. <span className="italic font-light text-glass">Понятные цены.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-[15px] md:text-base text-muted"
        >
          Выберите, что нужно вашему окну. Не уверены — мастер подскажет бесплатно.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-3 md:mx-10 lg:mx-auto max-w-[1360px] relative rounded-[24px] shadow-[0_30px_80px_-20px_rgba(11,22,32,0.35)] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img src={img("balcony")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-deep/25" />
        </div>

        <div className="relative z-10 bg-white/65 backdrop-blur-xl m-3 md:m-[40px] rounded-[16px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ink/10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (plan.isPopular ? "bg-white/50" : "")}
              >
                <div className="pb-7 border-b border-ink/10">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="font-display font-semibold text-2xl text-ink">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase bg-amber text-ink">
                        Выбирают чаще
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/75 mt-1">{plan.tagline}</p>
                  <div className="mt-7 flex items-baseline gap-1">
                    <span className="font-display font-bold text-[38px] md:text-[44px] text-ink leading-none">{plan.price}</span>
                    <span className="text-xs font-medium tracking-[0.1em] uppercase text-ink/50 ml-1">{plan.unit}</span>
                  </div>
                  <button
                    onClick={() =>
                      lead.openForm({
                        source: "Пакет: " + plan.name,
                        title: "Пакет «" + plan.name + "»",
                        subtitle: plan.tagline + ". Мастер перезвонит, уточнит количество окон и назовёт итоговую цену.",
                        badge: plan.price + (plan.unit ? " " + plan.unit : ""),
                        image: plan.image,
                        withComment: true,
                        commentPlaceholder: "Сколько окон и где (необязательно)",
                        cta: "Заказать пакет",
                      })
                    }
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (plan.isPopular ? "bg-amber hover:bg-amber-dark text-ink" : "bg-ink hover:bg-deep text-white")
                    }
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-semibold text-left">Заказать</span>
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 " + (plan.isPopular ? "bg-white/70" : "bg-amber")}>
                      <DotGridIcon />
                    </span>
                  </button>
                </div>
                <div className="pt-7 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-ink/5 border border-ink/15 flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-ink stroke-[2.5]" />
                      </div>
                      <span className="text-[12px] font-semibold tracking-[0.06em] uppercase text-ink/85">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
