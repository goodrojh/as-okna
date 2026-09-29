"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, Thermometer, Truck, Star } from "lucide-react";
import Logo from "./Logo";
import { useLead } from "@/components/lead/LeadProvider";
import { img, NAV_LINKS, PHONE, PHONE_HREF } from "@/lib/site";

const STATS = [
  { value: "12 лет", label: "чиним окна в Краснодаре" },
  { value: "8 400+", label: "окон вернули к жизни" },
  { value: "до 3 лет", label: "гарантия на работы" },
  { value: "1 визит", label: "на большинство ремонтов" },
];

export default function Hero() {
  const lead = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const callMaster = () =>
    lead.openForm({
      source: "Hero: вызвать мастера",
      title: "Вызвать мастера бесплатно",
      subtitle: "Перезвоним за 5 минут, согласуем время. Выезд и диагностика — 0 ₽ при заказе ремонта.",
      image: "measure",
      badge: "● Мастер свободен сегодня",
      withComment: true,
    });

  return (
    <section className="min-h-[100svh] md:min-h-[108vh] flex flex-col bg-ink relative w-full overflow-hidden">
      {/* Background photo with slow cinematic zoom */}
      <motion.img
        src={img("hero")}
        alt="Новое пластиковое окно в квартире в Краснодаре вечером"
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover z-0 object-[30%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/35 to-ink/85 z-[1]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_20%_60%,rgba(242,163,58,0.18),transparent_55%)]" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-8 pt-3 md:pt-5"
      >
        <div
          className={
            "max-w-6xl mx-auto flex items-center justify-between p-[8px] md:p-[10px] rounded-full backdrop-blur-xl border transition-all duration-500 " +
            (scrolled ? "bg-ink/80 border-white/10 shadow-2xl shadow-black/30" : "bg-white/5 border-white/10")
          }
        >
          <a href="#top" className="flex items-center pl-3 flex-shrink-0">
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 flex-shrink-0">
            <a href={PHONE_HREF} className="hidden md:flex items-center gap-2 text-[15px] font-semibold text-white hover:text-amber transition-colors px-3 py-2">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a href={PHONE_HREF} aria-label="Позвонить" className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </a>
            <button
              onClick={callMaster}
              className="hidden sm:block rounded-full px-5 py-2.5 text-[15px] font-semibold bg-amber text-ink hover:bg-amber-dark transition-all hover:scale-105 active:scale-95"
            >
              Вызвать мастера
            </button>
            <button onClick={() => setMenu((v) => !v)} aria-label="Меню" className="lg:hidden w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center">
              {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden max-w-6xl mx-auto mt-2 rounded-[28px] bg-ink/95 backdrop-blur-xl border border-white/10 p-5"
            >
              {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenu(false)} className="block py-3 text-[18px] font-medium text-white border-b border-white/10 last:border-none">
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setMenu(false); callMaster(); }}
                className="mt-4 w-full rounded-full py-4 font-semibold bg-amber text-ink"
              >
                Вызвать мастера бесплатно
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating glass chips (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ opacity: { delay: 1.2 }, x: { delay: 1.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="hidden xl:flex absolute left-[4%] top-[60%] z-10 items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-amber/90 flex items-center justify-center">
          <Thermometer className="w-5 h-5 text-ink" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">Сквозняк устранён</p>
          <p className="text-[12px] text-white/60">+5 °C в спальне · ул. Красная</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.4 }, x: { delay: 1.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
        className="hidden xl:flex absolute right-[4%] top-[66%] z-10 items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-3 shadow-2xl"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white">Мастер выехал</p>
          <p className="text-[12px] text-white/60">будет через ~40 минут</p>
        </div>
        <span className="relative flex h-2.5 w-2.5 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
      </motion.div>

      <div id="top" className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[120px] md:pt-[148px] pb-10 md:pb-16 z-10">
        <div className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[13px] text-white/90"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Мастер свободен сегодня · Краснодар и пригороды
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display text-center font-semibold text-[34px] sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-[-0.02em] text-white max-w-5xl mb-5 text-balance"
          >
            Окна, в которых <span className="italic font-light text-amber">тепло</span>
            <span className="block mt-3 text-[0.62em] leading-[1.15] font-medium text-white/95">Ремонт и установка за&nbsp;1&nbsp;визит</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-center text-[16px] md:text-lg text-white/85 max-w-[600px] leading-relaxed mb-8 text-pretty"
          >
            Уберём сквозняк, отрегулируем фурнитуру, заменим стеклопакет или поставим новое окно. Цену фиксируем до начала работ — она не вырастет.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={callMaster}
                className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold bg-amber text-ink hover:bg-amber-dark transition-all hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 10px 40px 0 rgba(242, 163, 58, 0.45)" }}
              >
                Вызвать мастера бесплатно
              </button>
              <button
                onClick={() => lead.openQuiz()}
                className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-lg border border-white/25 text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                Рассчитать цену за 1 минуту
              </button>
            </div>
            <span className="text-sm text-white/60">Выезд и диагностика — 0 ₽ при заказе ремонта</span>
          </motion.div>

          {/* Trust stats instead of logos */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            initial="hidden"
            animate="show"
            className="mt-12 md:mt-[64px] w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -3 }}
                className="rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/15 px-4 py-4 md:py-5 text-left"
              >
                <p className="font-display text-[22px] md:text-[28px] text-white leading-none">{s.value}</p>
                <p className="text-[12px] md:text-[13px] text-white/60 mt-2 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-5 flex items-center gap-2 text-[13px] text-white/70"
          >
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber text-amber" />
              ))}
            </span>
            4,9 — средняя оценка клиентов на Яндекс Картах
          </motion.div>
        </div>
      </div>
    </section>
  );
}
