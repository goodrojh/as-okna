"use client";
import React from "react";
import { Check } from "lucide-react";
import Quiz from "@/components/lead/Quiz";
import Reveal from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

export default function QuizSection() {
  return (
    <section id="calc" className="w-full px-3 md:px-6 bg-white">
      <div className="relative rounded-3xl md:rounded-[32px] overflow-hidden bg-ink isolate">
        <img {...pic("balcony")} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
        <div className="relative wrap grid lg:grid-cols-2 gap-10 lg:gap-16 px-5 md:px-12 py-14 md:py-20 items-center">
          <Reveal>
            <span className="t-eyebrow text-amber">Калькулятор</span>
            <h2 className="t-h2 text-white mt-4">
              Узнайте цену <span className="text-amber">за 1 минуту</span>
            </h2>
            <p className="t-lead text-white/70 mt-5 max-w-[460px]">
              4 простых вопроса — и вы увидите вилку стоимости. Точную цену мастер пришлёт в течение 5 минут.
            </p>
            <ul className="mt-8 space-y-3">
              {["Скидка 10% на работы за расчёт на сайте", "Цена фиксируется в смете", "Без навязывания — просто узнайте стоимость"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-white/85 text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-amber/15 border border-amber/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-white/[0.06] border border-white/15 p-5 md:p-8">
            <Quiz />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
