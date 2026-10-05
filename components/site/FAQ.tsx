"use client";
import React, { useState } from "react";
import { Plus, Wrench, Wallet, ArrowRight } from "lucide-react";
import { useLead } from "@/components/lead/LeadProvider";
import Reveal, { SectionHead } from "@/components/ui/Reveal";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  repair: [
    { question: "Сколько стоит выезд мастера?", answer: "Выезд и диагностика бесплатны, если вы заказываете ремонт. Если решите не ремонтировать — выезд по Краснодару стоит 500 ₽." },
    { question: "Как быстро приедет мастер?", answer: "Обычно в день обращения или на следующий день — в удобное вам время. Работаем ежедневно." },
    { question: "Можно ли починить окно, а не менять?", answer: "В 7 из 10 случаев — да. Регулировка, замена уплотнителя, фурнитуры или стеклопакета возвращают окну нормальную работу за малую часть стоимости нового." },
    { question: "Найдёте запчасти для моего окна?", answer: "Да. У нас налажены связи с поставщиками, поэтому достанем фурнитуру и комплектующие даже для редких и снятых с производства систем. Ходовые детали всегда в машине мастера." },
    { question: "Сколько длится ремонт?", answer: "Регулировка одного окна — 20–40 минут. Комплексная подготовка квартиры к зиме — 2–4 часа. Стеклопакеты и москитные сетки изготавливаем и устанавливаем в течение недели." },
  ],
  pay: [
    { question: "Как оплатить работы?", answer: "Оплата после выполнения работ — наличными или переводом." },
    { question: "Может ли цена измениться после выезда?", answer: "Нет. Мастер называет стоимость до начала работ. Больше, чем озвучил мастер, вы не заплатите." },
    { question: "Какая гарантия?", answer: "Гарантия на все работы — 1 год. Если что-то пойдёт не так, приедем и исправим бесплатно." },
  ],
};

const tabs = [
  { id: "repair", label: "Ремонт", icon: Wrench },
  { id: "pay", label: "Оплата и гарантия", icon: Wallet },
];

export default function FAQ() {
  const lead = useLead();
  const [activeTab, setActiveTab] = useState("repair");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section bg-white">
      <div className="max-w-[820px] mx-auto">
        <SectionHead center title="Отвечаем честно" lead="Самые частые вопросы наших клиентов" />

        <div className="no-scrollbar flex md:justify-center gap-1 border-b border-line mb-2 overflow-x-auto overscroll-x-contain -mx-5 px-5 md:mx-0 md:px-0" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => { setActiveTab(tab.id); setOpenIndex(0); }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 h-12 text-[15px] border-b-2 -mb-px whitespace-nowrap transition-colors " +
                (activeTab === tab.id ? "text-ink font-semibold border-amber" : "text-muted font-medium border-transparent hover:text-ink")
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[activeTab].map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={activeTab + index} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="w-full flex justify-between items-center gap-4 text-left py-5"
                >
                  <span className="text-[16px] font-semibold text-ink">{item.question}</span>
                  <span
                    className={"w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-[transform,background-color] duration-300 " + (open ? "bg-amber text-ink rotate-45" : "bg-cream text-ink")}
                  >
                    <Plus size={16} strokeWidth={2} />
                  </span>
                </button>
                <div className="accordion" data-open={open} aria-hidden={!open}>
                  <div>
                    <p className="t-body text-ink/70 pb-5 pr-12">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-12 bg-cream rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center self-start md:self-auto">
            <div className="flex -space-x-3" aria-hidden>
              {["А", "М", "С"].map((l, i) => (
                <div
                  key={l}
                  className="w-11 h-11 rounded-full border-2 border-cream flex items-center justify-center font-semibold text-white"
                  style={{ background: ["#12324A", "#2C6A94", "#95580C"][i], zIndex: 3 - i }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="font-semibold text-[16px] text-ink">Остались вопросы?</p>
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
                cta: "Задать вопрос",
              })
            }
            className="btn btn-dark w-full md:w-auto"
          >
            Задать вопрос <ArrowRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
