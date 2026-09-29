"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { PhoneCall, CalendarCheck, CheckCircle, ShieldCheck } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { img } from "@/lib/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function HowItWorks() {
  const lead = useLead();

  return (
    <section id="how" className="w-full px-5 md:px-12 lg:px-20 py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-amber/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-glass/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10"
      >
        <h2 className="font-display font-semibold text-[30px] md:text-[48px] text-center leading-[1.1] max-w-3xl text-ink">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="block">
            Тёплый дом
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="block">
            за <span className="italic font-light text-amber-dark">3 простых шага</span>
          </motion.span>
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-16 md:mb-20 max-w-7xl mx-auto relative z-10"
      >
        {/* STEP 01 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("measure")} alt="Замерщик у клиента" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 bg-ink/10" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-4 md:p-6 flex flex-col justify-center gap-2 shadow-2xl shadow-black/5 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: [0, -2, 0] }}
                  transition={{ opacity: { delay: 0.4 }, x: { delay: 0.4 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                  className="bg-white/50 backdrop-blur-md rounded-[8px] border border-white/40 px-2 py-1.5 flex items-center gap-2 shadow-lg shadow-black/5"
                >
                  <div className="w-5 h-5 rounded-[6px] bg-white/40 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-3 w-3 text-ink/70" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none mb-0.5 text-ink">Заявка принята</span>
                    <span className="text-[8px] text-ink/60 leading-none">с сайта · 09:12</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative bg-white rounded-[8px] px-2.5 py-2 flex items-center gap-2 shadow-2xl shadow-amber/10 z-10 border border-amber/30 overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber/25 to-transparent -skew-x-12 pointer-events-none"
                  />
                  <div className="w-7 h-7 rounded-[6px] bg-amber/15 flex items-center justify-center shrink-0">
                    <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <PhoneCall className="h-3.5 w-3.5 text-amber-dark" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold leading-none mb-1 text-ink">Мастер перезванивает</span>
                    <span className="text-[9px] text-muted leading-none">через 5 минут</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0, y: [0, 2, 0] }}
                  transition={{ opacity: { delay: 0.6 }, x: { delay: 0.6 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                  className="bg-white/50 backdrop-blur-md rounded-[8px] border border-white/40 px-2 py-1.5 flex items-center gap-2 shadow-lg shadow-black/5"
                >
                  <div className="w-5 h-5 rounded-[6px] bg-white/40 flex items-center justify-center shrink-0">
                    <CalendarCheck className="h-3 w-3 text-ink/70" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold leading-none mb-0.5 text-ink">Выезд согласован</span>
                    <span className="text-[8px] text-ink/60 leading-none">сегодня, 14:00</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-dark text-xs font-bold px-3 py-1 border border-amber">Шаг 01</span>
            <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">Звоните или оставьте заявку</h3>
            <p className="text-[15px] text-muted leading-relaxed">Перезвоним за 5 минут, зададим пару вопросов и назовём ориентир по цене.</p>
          </div>
        </motion.div>

        {/* STEP 02 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("install")} alt="Мастер выполняет работы" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-white/20 backdrop-blur-2xl rounded-[15px] border border-white/30 p-4 md:p-6 flex items-center justify-between shadow-2xl shadow-black/5 overflow-hidden"
              >
                <div className="relative w-1/2 h-full flex items-center justify-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-3 h-3 rounded-full bg-amber shadow-[0_0_15px_#F2A33A] z-10"
                    />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ scale: [0.2, 1.8], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }}
                        className="absolute border border-white/50 rounded-full"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ))}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={"s" + i} className="absolute border border-white/20 rounded-full" style={{ width: i * 25 + "%", height: i * 25 + "%" }} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end pr-1">
                  {["Диагностика", "Ремонт", "Проверка"].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={
                        "rounded-[8px] px-3 py-2 shadow-xl shadow-black/5 border flex items-center justify-center min-w-[92px] " +
                        (i === 1 ? "bg-amber border-amber text-ink" : "bg-white border-white text-ink")
                      }
                    >
                      <span className="text-[11px] font-bold tracking-tight leading-none">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-dark text-xs font-bold px-3 py-1 border border-amber">Шаг 02</span>
            <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">Мастер чинит за 1 визит</h3>
            <p className="text-[15px] text-muted leading-relaxed">Застилаем пол, работаем аккуратно, убираем за собой. Цена — как в смете, ни рублём больше.</p>
          </div>
        </motion.div>

        {/* STEP 03 */}
        <motion.div variants={stepVariants} className="flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
            <img src={img("night")} alt="Уютный вечер у тёплого окна" className="object-cover w-full h-full absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-white/15 backdrop-blur-2xl rounded-[15px] border border-white/30 p-4 md:p-6 flex flex-col justify-center gap-3 shadow-2xl shadow-black/5 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-[8px] p-2 flex items-center gap-3 shadow-xl shadow-black/5 border border-white relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber/15 to-transparent -skew-x-12 pointer-events-none"
                  />
                  <div className="w-10 h-10 rounded-[8px] bg-amber/15 flex items-center justify-center shrink-0">
                    <div className="grid grid-cols-2 gap-0.5 w-5 h-5 rounded-[3px] border-2 border-amber-dark p-[2px]">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} className="bg-amber-dark rounded-[1px]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-1 h-8 px-1">
                    {[4, 6, 8, 7, 9, 10, 11, 12, 12, 13].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: [h * 1.5 + "px", h * 2.2 + "px", h * 1.5 + "px"] }}
                        transition={{ height: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 } }}
                        className="w-1.5 bg-amber/40 rounded-[1px]"
                      />
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-[8px] px-3 py-1.5 w-fit shadow-lg shadow-black/5 border border-white flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold tracking-tight leading-none text-ink">Гарантия до 3 лет · в договоре</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full text-amber-dark text-xs font-bold px-3 py-1 border border-amber">Шаг 03</span>
            <h3 className="font-display text-[22px] font-semibold leading-tight text-ink">Живёте в тепле с гарантией</h3>
            <p className="text-[15px] text-muted leading-relaxed">Письменная гарантия до 3 лет. Если что-то пойдёт не так — приедем и исправим бесплатно.</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            lead.openForm({
              source: "Как работаем: вызвать мастера",
              title: "Начнём с шага 01",
              subtitle: "Оставьте номер — перезвоним за 5 минут и согласуем выезд мастера.",
              image: "measure",
              badge: "Выезд и диагностика — 0 ₽",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-amber text-ink shadow-xl shadow-amber/30 hover:shadow-2xl transition-all"
        >
          Вызвать мастера
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            lead.openForm({
              source: "Как работаем: вопрос",
              title: "Задайте вопрос мастеру",
              subtitle: "Опишите ситуацию — мастер перезвонит и бесплатно проконсультирует.",
              image: "repair",
              withComment: true,
              commentPlaceholder: "Ваш вопрос",
              withTime: false,
              cta: "Получить консультацию",
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-ink border border-line shadow-lg hover:shadow-xl transition-all"
        >
          Задать вопрос
        </motion.button>
      </motion.div>
    </section>
  );
}
