"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Quiz from "@/components/lead/Quiz";
import { img } from "@/lib/site";

export default function QuizSection() {
  return (
    <section id="calc" className="w-full px-3 md:px-6 py-3 md:py-6 bg-white">
      <div className="relative rounded-[28px] md:rounded-[36px] overflow-hidden bg-ink">
        <img src={img("balcony")} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 px-5 md:px-12 py-14 md:py-20 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-amber">Калькулятор</span>
            <h2 className="font-display text-[30px] md:text-5xl font-semibold text-white mt-3 leading-[1.1]">
              Узнайте цену <br />
              <span className="italic font-light text-amber">за 1 минуту</span>
            </h2>
            <p className="text-[16px] md:text-lg text-white/70 mt-5 max-w-[460px]">
              4 простых вопроса — и вы увидите вилку стоимости. Точную цену мастер пришлёт в течение 5 минут.
            </p>
            <ul className="mt-8 space-y-3">
              {["Скидка 10% на работы за расчёт на сайте", "Цена фиксируется в смете", "Без навязывания — просто узнайте стоимость"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-white/85 text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-amber" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[28px] bg-white/[0.06] backdrop-blur-2xl border border-white/15 p-5 md:p-8 shadow-2xl"
          >
            <Quiz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
