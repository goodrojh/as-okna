"use client";
import React, { useEffect, useState } from "react";
import { Menu, Phone, X, Wrench, Truck, Star } from "lucide-react";
import Logo from "./Logo";
import Messengers from "@/components/ui/Messengers";
import Phones from "@/components/ui/Phones";
import { useLead } from "@/components/lead/LeadProvider";
import { NAV_LINKS, pic } from "@/lib/site";

const STATS = [
  { value: "19 лет", label: "работаем по югу России" },
  { value: "8 400+", label: "окон вернули к жизни" },
  { value: "1 год", label: "гарантия на работы" },
  { value: "1 визит", label: "на большинство ремонтов" },
];

const delay = (s: number): React.CSSProperties => ({ animationDelay: s + "s" });

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

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

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(false);
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menu]);

  const callMaster = () =>
    lead.openForm({
      source: "Hero: вызвать мастера",
      title: "Вызвать мастера бесплатно",
      subtitle: "Перезвоним за 5 минут и согласуем время. Выезд и диагностика — 0 ₽ при заказе ремонта.",
      image: "measure",
      badge: "Мастер свободен сегодня",
      withComment: true,
    });

  return (
    <section className="relative w-full min-h-[100svh] md:min-h-[100vh] flex flex-col bg-ink overflow-hidden">
      {/* Background: static (no transform animation under the glass panels → no per-frame re-blur) */}
      <img
        {...pic("hero")}
        alt="Новое пластиковое окно в квартире в Краснодаре вечером"
        fetchPriority="high"
        decoding="async"
        className="anim-hero-in absolute inset-0 w-full h-full object-cover object-[30%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/85" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 lg:px-3 xl:px-8 pt-3 md:pt-5">
        <div
          className={
            "wrap flex items-center justify-between gap-3 h-14 md:h-16 pl-4 lg:pl-3 xl:pl-4 pr-2 rounded-full border transition-colors duration-300 " +
            (scrolled || menu ? "bg-ink/90 border-white/10 shadow-xl shadow-black/20 backdrop-blur-md" : "bg-white/[0.06] border-white/15 backdrop-blur-md")
          }
        >
          <a href="#top" aria-label="AS·окна — на главную" onClick={() => setMenu(false)}>
            <Logo />
          </a>

          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="text-[14px] xl:text-[15px] font-medium text-white/75 hover:text-white transition-colors whitespace-nowrap">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Messengers size={30} className="hidden md:flex gap-1.5 xl:gap-2" />
            <Phones variant="stack" className="hidden md:flex px-1" />
            <button onClick={() => lead.openCall()} aria-label="Позвонить" className="call-blink md:hidden relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <Phone className="call-blink-icon w-[18px] h-[18px] text-white fill-white" />
            </button>
            <button onClick={callMaster} className="hidden lg:inline-flex btn btn-sm btn-primary px-4 xl:px-5">
              Вызвать мастера
            </button>
            <button
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menu}
              className="lg:hidden w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center"
            >
              {menu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menu && (
            <div
              className="anim-fade-in lg:hidden wrap mt-2 rounded-3xl bg-ink/95 border border-white/10 p-3 shadow-2xl"
            >
              {NAV_LINKS.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenu(false)} className="flex items-center h-14 px-4 rounded-2xl text-[17px] font-medium text-white active:bg-white/10">
                  {item.label}
                </a>
              ))}
              <Phones className="px-4 py-3 text-[17px] text-amber" />
              <Messengers variant="pill" className="px-3 pb-3 flex-wrap" />
              <button onClick={() => { setMenu(false); callMaster(); }} className="btn btn-primary w-full mt-1">
                Вызвать мастера бесплатно
              </button>
            </div>
          )}
      </nav>

      {/* Floating status chips (large desktop only) */}
      <div className="hidden xl:flex absolute left-[4%] top-[58%] z-10 anim-fade-up" style={delay(1)}>
        <div className="anim-float flex items-center gap-3 rounded-2xl bg-ink/60 border border-white/15 px-4 py-3 shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center">
            <Wrench className="w-5 h-5 text-ink" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">Окно отрегулировано</p>
            <p className="text-[12px] text-white/65">за 40 минут · ул. Красная</p>
          </div>
        </div>
      </div>
      <div className="hidden xl:flex absolute right-[4%] top-[66%] z-10 anim-fade-up" style={delay(1.2)}>
        <div className="anim-float flex items-center gap-3 rounded-2xl bg-ink/60 border border-white/15 px-4 py-3 shadow-2xl" style={{ animationDelay: "-3s" }}>
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">Мастер выехал</p>
            <p className="text-[12px] text-white/65">будет через ~40 минут</p>
          </div>
          <LiveDot />
        </div>
      </div>

      <div id="top" className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="anim-fade-up inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[13px] text-white/90">
          <LiveDot />
          Мастер свободен сегодня<span className="hidden sm:inline"> · Краснодар и пригороды</span>
        </div>

        <h1 className="t-h1 text-white max-w-[15ch] md:max-w-none mt-6">
          Окна, в&nbsp;которых <span className="text-amber">тепло</span>
        </h1>
        <p className="mt-3 md:mt-4 font-display font-medium text-white/90 text-[22px] md:text-[34px] leading-tight tracking-[-0.02em]">
          Ремонт и обслуживание за&nbsp;1&nbsp;визит
        </p>

        <p className="t-lead text-white/75 max-w-[560px] mt-5 md:mt-6">
          Уберём сквозняк, отрегулируем и заменим фурнитуру, ручки, уплотнитель или стеклопакет. Стоимость мастер называет до начала работ.
        </p>

        <div className="mt-8 w-full sm:w-auto flex flex-col sm:flex-row gap-3 anim-fade-up" style={delay(0.1)}>
          <button onClick={callMaster} className="btn btn-primary w-full sm:w-auto">
            Вызвать мастера бесплатно
          </button>
          <button onClick={() => lead.openQuiz()} className="btn btn-glass w-full sm:w-auto">
            Рассчитать цену за 1 минуту
          </button>
        </div>
        <p className="mt-3 text-[13px] text-white/60 anim-fade-up" style={delay(0.14)}>
          Выезд и диагностика — 0 ₽ при заказе ремонта
        </p>

        <ul className="mt-12 md:mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 anim-fade-up" style={delay(0.2)}>
          {STATS.map((s) => (
            <li key={s.label} className="rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/15 px-4 py-4 md:px-5 md:py-5 text-left">
              <p className="font-display font-semibold text-[22px] md:text-[28px] text-white leading-none tracking-[-0.02em] tabular-nums">{s.value}</p>
              <p className="text-[12px] md:text-[13px] text-white/65 mt-2 leading-snug">{s.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-white/70 anim-fade-up" style={delay(0.26)}>
          <span className="flex" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber text-amber" />
            ))}
          </span>
          4,9 — средняя оценка клиентов на Яндекс Картах
        </p>
      </div>
    </section>
  );
}
