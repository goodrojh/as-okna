"use client";
import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import LeadForm, { type LeadFormConfig } from "./LeadForm";
import Quiz from "./Quiz";
import { pic } from "@/lib/site";
import { useRussianTypography } from "@/lib/typography";

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

const PERKS = ["Выезд и диагностика — бесплатно", "Цена фиксируется до начала работ", "Гарантия на работы до 3 лет"];

export default function LeadProvider({ children }: { children: React.ReactNode }) {
  useRussianTypography();
  const [state, setState] = useState<ModalState>(null);
  const [shown, setShown] = useState(false); // drives the CSS enter/exit transition
  const lastFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    setShown(false);
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    unmountTimer.current = setTimeout(() => setState(null), 260);
  }, []);

  const open = useCallback((s: ModalState) => {
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    lastFocus.current = document.activeElement as HTMLElement;
    setState(s);
  }, []);

  const api = useMemo<LeadApi>(
    () => ({
      openForm: (config) => open({ kind: "form", config }),
      openQuiz: (preset) => open({ kind: "quiz", preset }),
      openArticle: (article) => open({ kind: "article", article }),
      close,
    }),
    [open, close]
  );

  const isOpen = state !== null;
  const overlayRef = useRef<HTMLDivElement>(null);

  // Enter transition without rAF (rAF can be paused in background tabs / in-app browsers):
  // force a style flush of the closed state, then flip to open in the same tick.
  useLayoutEffect(() => {
    if (!isOpen) return;
    overlayRef.current?.getBoundingClientRect();
    setShown(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => dialogRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      clearTimeout(t);
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, close]);

  const image =
    state?.kind === "form" ? state.config.image || "measure" : state?.kind === "quiz" ? "balcony" : state?.kind === "article" ? state.article.image : "measure";

  return (
    <LeadContext.Provider value={api}>
      {children}
      {state && (
        <div
          ref={overlayRef}
          data-open={shown}
          className="modal-overlay fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-ink/75 md:p-6"
          onClick={close}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={state.kind === "form" ? state.config.title : state.kind === "quiz" ? "Калькулятор стоимости" : state.article.title}
            onClick={(e) => e.stopPropagation()}
            className="modal-panel relative w-full md:max-w-[960px] max-h-[92dvh] overflow-y-auto overflow-x-hidden overscroll-contain bg-cream rounded-t-3xl md:rounded-3xl shadow-2xl grid md:grid-cols-[0.9fr_1.1fr] outline-none"
          >
            {/* Close button stays visible while the sheet scrolls */}
            <div className="sticky top-0 z-20 h-0 col-span-full">
              <button
                onClick={close}
                aria-label="Закрыть"
                className="absolute top-3 right-3 md:top-4 md:right-4 w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center hover:border-ink/30 transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            {/* Left visual (desktop) */}
            <div className="relative hidden md:block min-h-[580px]">
              <img {...pic(image, "420px")} alt="" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="t-h3">Мастер у вас уже сегодня</p>
                <ul className="mt-5 space-y-2.5 text-[14px] text-white/85">
                  {PERKS.map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber text-ink flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right content */}
            <div className="px-5 pt-6 pb-[max(24px,env(safe-area-inset-bottom))] md:p-10">
              <div className="md:hidden mx-auto -mt-2 mb-4 h-1.5 w-12 rounded-full bg-ink/15" aria-hidden />
              {state.kind === "form" && <LeadForm key={state.config.source} config={state.config} />}
              {state.kind === "quiz" && <Quiz compact preset={state.preset} />}
              {state.kind === "article" && (
                <ArticleView
                  article={state.article}
                  onCta={() =>
                    setState({
                      kind: "form",
                      config: {
                        source: "Статья: " + state.article.title,
                        title: "Нужна помощь мастера?",
                        subtitle: "Перезвоним за 5 минут и подскажем, что делать с вашим окном.",
                        image: state.article.image,
                      },
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}

function ArticleView({ article, onCta }: { article: Article; onCta: () => void }) {
  return (
    <article>
      <img {...pic(article.image, "100vw")} alt="" decoding="async" className="md:hidden w-full aspect-[16/9] object-cover rounded-2xl mb-5" />
      <h3 className="t-h3 md:text-[28px] text-ink mb-5 pr-12 text-balance">{article.title}</h3>
      <div className="space-y-4 t-body text-ink/75">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <button onClick={onCta} className="btn btn-primary w-full mt-8">
        Вызвать мастера бесплатно
      </button>
    </article>
  );
}
