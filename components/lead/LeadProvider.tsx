"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import LeadForm, { type LeadFormConfig } from "./LeadForm";
import Quiz from "./Quiz";
import { img } from "@/lib/site";

export interface Article {
  title: string;
  image: string;
  body: string[];
}

type ModalState =
  | { kind: "form"; config: LeadFormConfig }
  | { kind: "quiz"; preset?: string }
  | { kind: "article"; article: Article }
  | null;

interface LeadApi {
  openForm: (config: LeadFormConfig) => void;
  openQuiz: (preset?: string) => void;
  openArticle: (article: Article) => void;
  close: () => void;
}

const LeadContext = createContext<LeadApi | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead outside LeadProvider");
  return ctx;
}

export default function LeadProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>(null);

  const close = useCallback(() => setState(null), []);
  const api: LeadApi = {
    openForm: (config) => setState({ kind: "form", config }),
    openQuiz: (preset) => setState({ kind: "quiz", preset }),
    openArticle: (article) => setState({ kind: "article", article }),
    close,
  };

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [state, close]);

  const image =
    state?.kind === "form" ? state.config.image || "measure" : state?.kind === "quiz" ? "balcony" : state?.kind === "article" ? state.article.image : "measure";

  return (
    <LeadContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/70 backdrop-blur-md md:p-6"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full md:max-w-[960px] max-h-[92svh] overflow-y-auto bg-cream rounded-t-[28px] md:rounded-[28px] shadow-2xl grid md:grid-cols-[0.9fr_1.1fr]"
            >
              <button
                onClick={close}
                aria-label="Закрыть"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-black/5 flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
              <div className="md:hidden mx-auto mt-3 h-1.5 w-12 rounded-full bg-ink/15" />

              {/* Left visual */}
              <div className="relative hidden md:block min-h-[560px]">
                <img src={img(image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <p className="font-display text-2xl leading-tight">Мастер у вас уже сегодня</p>
                  <ul className="mt-5 space-y-2.5 text-[14px] text-white/85">
                    {["Выезд и диагностика — бесплатно", "Цена фиксируется до начала работ", "Гарантия на работы до 3 лет"].map((t) => (
                      <li key={t} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-amber text-ink text-[11px] font-bold flex items-center justify-center">✓</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right content */}
              <div className="p-6 pt-5 md:p-10">
                {state.kind === "form" && <LeadForm config={state.config} />}
                {state.kind === "quiz" && <Quiz compact preset={state.preset} />}
                {state.kind === "article" && (
                  <ArticleView
                    article={state.article}
                    onCta={() =>
                      setState({
                        kind: "form",
                        config: { source: "Статья: " + state.article.title, title: "Нужна помощь мастера?", subtitle: "Перезвоним за 5 минут и подскажем, что делать с вашим окном." },
                      })
                    }
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadContext.Provider>
  );
}

function ArticleView({ article, onCta }: { article: Article; onCta: () => void }) {
  return (
    <div className="pr-8">
      <img src={img(article.image)} alt="" className="md:hidden w-full h-44 object-cover rounded-2xl mb-5" />
      <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-glass">Полезно знать</span>
      <h3 className="font-display text-2xl md:text-[28px] leading-tight text-ink mt-2 mb-5">{article.title}</h3>
      <div className="space-y-4 text-[15px] leading-relaxed text-ink/75">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <button onClick={onCta} className="mt-8 w-full rounded-full bg-amber hover:bg-amber-dark text-ink font-semibold py-4 transition-colors">
        Вызвать мастера бесплатно
      </button>
    </div>
  );
}
