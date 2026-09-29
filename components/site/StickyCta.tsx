"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Wrench } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import { PHONE_HREF, WHATSAPP_HREF } from "@/lib/site";

export default function StickyCta() {
  const lead = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const callback = () =>
    lead.openForm({
      source: "Плавающая кнопка: перезвоните мне",
      title: "Перезвоним за 5 минут",
      subtitle: "Оставьте номер — мастер сам вам позвонит и ответит на все вопросы.",
      image: "measure",
      cta: "Перезвоните мне",
    });

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Mobile bottom bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2"
          >
            <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2 rounded-[22px] bg-ink/90 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-black/40">
              <a href={PHONE_HREF} className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-white">
                <Phone className="w-5 h-5" />
                <span className="text-[11px] font-medium">Позвонить</span>
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-white">
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
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber text-ink font-semibold text-[14px]"
              >
                <Wrench className="w-4 h-4" /> Мастер
              </button>
            </div>
          </motion.div>

          {/* Desktop floating callback */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={callback}
            aria-label="Заказать обратный звонок"
            className="hidden md:flex fixed bottom-8 right-8 z-[60] items-center gap-3 rounded-full bg-amber text-ink pl-4 pr-6 py-3 font-semibold shadow-2xl shadow-amber/40 hover:bg-amber-dark transition-colors group"
          >
            <span className="relative flex w-10 h-10 items-center justify-center rounded-full bg-ink text-amber">
              <span className="absolute inset-0 rounded-full bg-ink animate-ping opacity-30" />
              <Phone className="w-4 h-4 relative" />
            </span>
            Перезвоните мне
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
