"use client";
import React, { useEffect, useState } from "react";
import { Phone, MessageCircle, Wrench } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";

export default function StickyCta() {
  const lead = useLead();
  const [show, setShow] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide the desktop floating button where the footer already has its own form
    const footer = document.getElementById("contacts");
    const io = footer ? new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), { rootMargin: "0px 0px -30% 0px" }) : null;
    if (footer && io) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = "translate-y-0 opacity-100";
  const hidden = "translate-y-[140%] opacity-0 pointer-events-none";

  return (
    <>
      {/* Mobile bottom bar */}
      <div
        className={
          "md:hidden fixed bottom-0 left-0 right-0 z-[60] px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 ease-out " +
          (show ? visible : hidden)
        }
      >
        <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-1.5 rounded-3xl bg-ink/95 border border-white/10 p-1.5 shadow-2xl shadow-black/40">
          <a href={PHONE_HREF} className="flex flex-col items-center justify-center gap-1 rounded-2xl h-14 text-white active:bg-white/10">
            <Phone className="w-5 h-5" />
            <span className="text-[11px] font-medium">Позвонить</span>
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 rounded-2xl h-14 text-white active:bg-white/10">
            <MessageCircle className="w-5 h-5" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </a>
          <button
            onClick={() =>
              lead.openForm({
                source: "Мобильная панель: вызвать мастера",
                title: "Вызвать мастера",
                subtitle: "Перезвоним за 5 минут. Выезд и диагностика — 0 ₽ при заказе ремонта.",
                image: "measure",
                withComment: true,
              })
            }
            className="flex items-center justify-center gap-2 rounded-2xl h-14 bg-amber text-ink font-semibold text-[15px] active:bg-amber-dark"
          >
            <Wrench className="w-4 h-4" /> Мастер
          </button>
        </div>
      </div>

      {/* Desktop floating callback */}
      <button
        onClick={() =>
          lead.openForm({
            source: "Плавающая кнопка: перезвоните мне",
            title: "Перезвоним за 5 минут",
            subtitle: "Оставьте номер — мастер сам вам позвонит и ответит на все вопросы.",
            image: "measure",
            cta: "Перезвоните мне",
          })
        }
        aria-label="Заказать обратный звонок"
        className={
          "hidden md:flex fixed bottom-8 right-8 z-[60] items-center gap-3 rounded-full bg-amber text-ink pl-2 pr-6 h-14 font-semibold shadow-[0_16px_40px_-12px_rgba(242,163,58,0.8)] hover:bg-amber-dark transition-[transform,opacity,background-color] duration-300 " +
          (show && !atFooter ? visible : hidden)
        }
      >
        <span className="relative flex w-10 h-10 items-center justify-center rounded-full bg-ink text-amber">
          <span className="absolute inset-0 rounded-full bg-ink animate-ping opacity-25" />
          <Phone className="w-4 h-4 relative" />
        </span>
        Перезвоните мне
      </button>
    </>
  );
}
