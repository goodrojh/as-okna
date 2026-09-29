"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Wrench, ShieldCheck, Lock, PhoneCall, Truck, Check, Sparkles, Thermometer, FileText, Home } from "lucide-react";
import { img } from "@/lib/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section id="why" className="w-full px-5 md:px-6 py-20 md:py-[130px] bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glass/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-display text-[30px] md:text-5xl font-semibold text-ink mb-5 leading-[1.1]"
        >
          Почему в Краснодаре <br />
          звонят в <span className="italic font-light text-glass">AS·окна</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-[16px] md:text-lg text-muted max-w-2xl mx-auto"
        >
          Мы не продаём окна любой ценой. Сначала пробуем починить — это в разы дешевле, а результат тот же: тихо, тепло и без сквозняков.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Card 1: photo */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-[32px] border border-line p-5 md:p-6 flex flex-col gap-10 group relative overflow-hidden min-h-[460px]"
        >
          <div className="absolute inset-0 z-0">
            <img src={img("repair")} alt="Мастер регулирует фурнитуру окна" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/20 to-ink/75" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-[26px] md:text-4xl font-semibold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Чиним, а не продаём. <br />
              <span className="italic font-light text-amber">Экономия до 80%.</span>
            </h3>
            <p className="text-[15px] text-white/85 leading-relaxed max-w-[450px] mt-3 drop-shadow-md">
              В 7 из 10 случаев окно можно вернуть к жизни без замены. Если нельзя — честно скажем и покажем почему.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 relative z-10">
            {[
              { icon: Wrench, t: "Запчасти в машине", d: "Фурнитура, ручки и уплотнители для всех профилей — чиним сразу." },
              { icon: ShieldCheck, t: "Гарантия до 3 лет", d: "Письменно, в договоре. Приедем бесплатно, если что-то не так." },
            ].map((x) => (
              <div key={x.t} className="flex flex-col gap-3 p-5 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 transition-all hover:bg-white/20 group/item shadow-xl">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform group-hover/item:scale-110">
                  <x.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[15px] font-bold text-white">{x.t}</span>
                  <p className="text-[13px] text-white/75 leading-relaxed">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2: fixed price estimate mockup */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[32px] border border-line p-5 md:p-6 flex flex-col overflow-hidden relative min-h-[460px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-frost via-cream to-amber/10" />
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-amber/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-glass/15 rounded-full blur-[60px]" />

          <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none py-6">
            <div className="w-full max-w-[320px] bg-white/50 backdrop-blur-xl border border-white/70 rounded-[24px] p-5 md:p-6 shadow-2xl shadow-deep/10">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-glass" />
                <span className="text-[12px] font-bold text-ink uppercase tracking-wider">Смета № 1024</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Регулировка 3 створок", price: "1 500 ₽", color: "bg-glass" },
                  { label: "Уплотнитель, 12 м", price: "3 600 ₽", color: "bg-deep" },
                  { label: "Смазка фурнитуры", price: "0 ₽", color: "bg-amber" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 bg-white/85 rounded-xl p-3 border border-white/40 shadow-sm"
                  >
                    <div className={"w-2 h-2 rounded-full " + item.color} />
                    <span className="text-[12px] font-medium text-ink/80 flex-1">{item.label}</span>
                    <span className="text-[12px] font-bold text-ink">{item.price}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 bg-white/95 rounded-full border border-white p-2 flex items-center gap-3 shadow-lg shadow-amber/10">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white stroke-[3]" />
                </div>
                <span className="text-[12px] font-semibold text-ink flex-1">Итого: 5 100 ₽</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber to-amber-dark flex items-center justify-center">
                  <Lock className="h-3.5 w-3.5 text-ink" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto relative z-10 pt-6">
            <h3 className="font-display text-xl font-semibold text-ink">Цена не вырастет после выезда</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Мастер называет стоимость до начала работ и фиксирует её в смете. Никаких «а тут ещё доплатить».
            </p>
          </div>
        </motion.div>

        {/* Card 3: same-day workflow */}
        <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-line overflow-hidden flex flex-col">
          <div className="h-72 relative flex items-center justify-center overflow-hidden border-b border-line p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-frost/70 via-white to-amber/10" />
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] items-center justify-center"
            >
              <Truck className="h-6 w-6 text-glass" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden sm:flex absolute bottom-8 left-8 w-16 h-16 rounded-[22px] bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] items-center justify-center"
            >
              <Sparkles className="h-7 w-7 text-amber" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[270px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-3.5 shadow-xl shadow-deep/5 border border-frost flex items-center gap-3 w-full mb-8 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
                  <PhoneCall className="h-5 w-5 text-amber" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-ink">Заявка · 09:12</span>
                  <span className="text-[11px] text-muted">«Дует из окна в детской»</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-glass/30 to-glass/60" />
              </motion.div>
              <div className="grid grid-cols-2 gap-3 w-full relative">
                <div className="absolute -top-4 left-1/4 right-1/4 h-px bg-glass/30" />
                <div className="absolute -top-4 left-1/4 w-px h-4 bg-glass/30" />
                <div className="absolute -top-4 right-1/4 w-px h-4 bg-glass/30" />
                {[
                  { icon: PhoneCall, t: "Перезвон · 5 мин" },
                  { icon: Truck, t: "Выезд · 14:00" },
                ].map((n, i) => (
                  <motion.div
                    key={n.t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white/85 backdrop-blur-md rounded-xl p-3 shadow-lg shadow-deep/5 border border-white flex flex-col gap-2 items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-frost flex items-center justify-center">
                      <n.icon className="h-4 w-4 text-glass" />
                    </div>
                    <span className="text-[11px] font-bold text-ink">{n.t}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-7 bg-amber text-ink text-[11px] font-bold py-2 px-4 rounded-full shadow-lg shadow-amber/30 flex items-center gap-2"
              >
                <Check className="h-3 w-3 stroke-[3]" /> 15:10 · В детской тепло
              </motion.div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Мастер у вас в день обращения</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Работаем ежедневно по Краснодару и пригородам. Перезваниваем за 5 минут, приезжаем в удобное вам время.
            </p>
          </div>
        </motion.div>

        {/* Card 4: temperature chart */}
        <motion.div variants={cardVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="bg-white rounded-[32px] border border-line overflow-hidden flex flex-col">
          <div className="h-72 relative flex flex-col items-center justify-center border-b border-line p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-frost/70 via-white to-amber/10" />
            <div className="w-full h-full bg-white/60 backdrop-blur-xl rounded-2xl border border-white/80 shadow-2xl shadow-deep/5 p-5 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber/15 flex items-center justify-center">
                    <Thermometer className="h-5 w-5 text-amber-dark" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-ink leading-none">У окна, °C</p>
                    <p className="text-[10px] text-muted mt-1">до и после ремонта</p>
                  </div>
                </div>
                <div className="flex gap-3 text-[10px] text-muted">
                  <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-glass/40" />до</span>
                  <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-amber" />после</span>
                </div>
              </div>
              <div className="flex-1 flex items-end gap-2 px-1">
                {[
                  [35, 78], [42, 82], [30, 75], [38, 85],
                ].map(([b, a], i) => (
                  <div key={i} className="flex-1 flex items-end gap-1 h-full">
                    <motion.div initial={{ height: 0 }} whileInView={{ height: b + "%" }} transition={{ duration: 1, delay: i * 0.1 }} className="flex-1 bg-glass/25 rounded-t-md" />
                    <motion.div initial={{ height: 0 }} whileInView={{ height: a + "%" }} transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }} className="flex-1 bg-gradient-to-t from-amber/80 to-amber rounded-t-md shadow-lg shadow-amber/20" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-black/5">
                <span className="text-[11px] text-muted flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Спальня · Кухня · Детская · Зал</span>
                <span className="text-[12px] font-bold text-emerald-600">+5…6 °C</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-ink">Тепло, которое можно измерить</h3>
            <p className="text-[15px] text-muted leading-relaxed mt-2">
              Замеряем температуру у окна до и после работ — вы видите результат, а не верите на слово.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
