"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Wrench, Frame, Wallet } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  repair: [
    { question: "Сколько стоит выезд мастера?", answer: "Выезд и диагностика бесплатны, если вы заказываете ремонт. Если решите не ремонтировать — выезд по Краснодару стоит 500 ₽." },
    { question: "Как быстро приедет мастер?", answer: "Обычно в день обращения или на следующий день — в удобное вам время. Работаем ежедневно." },
    { question: "Можно ли починить окно, а не менять?", answer: "В 7 из 10 случаев — да. Регулировка, замена уплотнителя, фурнитуры или стеклопакета возвращают окну тепло и тишину за 10–20% стоимости нового." },
    { question: "Есть ли у мастера запчасти с собой?", answer: "Да, в машине есть фурнитура, ручки, уплотнители и замки для популярных профилей. Большинство поломок устраняем за один визит." },
    { question: "Сколько длится ремонт?", answer: "Регулировка одного окна — 20–40 минут. Комплексная подготовка квартиры к зиме — 2–4 часа. Стеклопакет изготавливаем 2–4 дня, меняем за час." },
  ],
  install: [
    { question: "Замер новых окон платный?", answer: "Нет, замер бесплатный и ни к чему не обязывает. Замерщик привезёт образцы профилей и рассчитает несколько вариантов." },
    { question: "Устанавливаете окна в частных домах?", answer: "Да, работаем в квартирах, частных домах, на дачах и в коммерческих помещениях по Краснодару и пригородам." },
    { question: "Будет ли грязь при монтаже?", answer: "Застилаем пол и мебель, вывозим старые окна и мусор, убираем после работ." },
    { question: "Делаете остекление балконов?", answer: "Да: холодное и тёплое остекление, панорамное остекление, отделка и утепление балконов и лоджий." },
  ],
  pay: [
    { question: "Как оплатить работы?", answer: "Оплата после выполнения работ — наличными, картой или переводом. Для новых окон — по договору с небольшой предоплатой." },
    { question: "Может ли цена измениться после выезда?", answer: "Нет. Мастер называет стоимость до начала работ и фиксирует её в смете. Больше, чем в смете, вы не заплатите." },
    { question: "Какая гарантия?", answer: "На ремонт — от 1 года, на комплексные работы — 2 года, на монтаж окон — 3 года. Гарантия прописывается в договоре." },
    { question: "Работаете с юридическими лицами?", answer: "Да, работаем по договору с безналичной оплатой, предоставляем закрывающие документы." },
  ],
};

const tabs = [
  { id: "repair", label: "Ремонт", icon: Wrench },
  { id: "install", label: "Новые окна", icon: Frame },
  { id: "pay", label: "Оплата и гарантия", icon: Wallet },
];

export default function FAQ() {
  const lead = useLead();
  const [activeTab, setActiveTab] = useState("repair");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 md:py-[100px] px-5 md:px-[80px]">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-[30px] md:text-[48px] font-semibold text-ink leading-tight mb-3">Отвечаем честно</h2>
          <p className="text-[16px] text-muted">Самые частые вопросы наших клиентов</p>
        </div>

        <div className="flex justify-start md:justify-center gap-1 border-b border-line mb-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(0); }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-3 text-[15px] transition-all border-b-2 whitespace-nowrap " +
                (activeTab === tab.id ? "text-amber-dark font-semibold border-amber" : "text-muted font-medium border-transparent")
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => (
            <div key={activeTab + index} className="border-b border-line py-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center gap-4 text-left">
                <span className="text-[16px] font-semibold text-ink">{item.question}</span>
                <span className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors " + (openIndex === index ? "bg-amber text-ink" : "bg-cream text-muted")}>
                  {openIndex === index ? <X size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 text-[15px] text-ink/70 leading-[1.7] pr-10">{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-cream rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {["А", "М", "С"].map((l, i) => (
                <div
                  key={l}
                  className="w-11 h-11 rounded-full border-2 border-cream flex items-center justify-center font-display font-semibold text-white"
                  style={{ background: ["#12324A", "#2F6F9A", "#D9861A"][i], zIndex: 3 - i }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="font-semibold text-[15px] text-ink">Остались вопросы?</p>
              <p className="text-[14px] text-muted">Мастер ответит бесплатно</p>
            </div>
          </div>
          <button
            onClick={() =>
              lead.openForm({
                source: "FAQ: остались вопросы",
                title: "Задайте вопрос мастеру",
                subtitle: "Напишите, что вас интересует, — перезвоним и ответим бесплатно.",
                image: "measure",
                withComment: true,
                commentPlaceholder: "Ваш вопрос",
                withTime: false,
                cta: "Задать вопрос",
              })
            }
            className="w-full md:w-auto bg-ink text-white rounded-[16px] px-6 py-4 text-[15px] font-semibold hover:bg-deep transition-all flex items-center justify-center gap-3 group"
          >
            Задать вопрос
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M7 7v6a2 2 0 0 0 2 2h9" />
              <path d="m15 11 4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
