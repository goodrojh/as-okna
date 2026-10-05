"use client";
import React, { useId, useState } from "react";
import { Check, Loader2, Phone } from "lucide-react";
import { formatPhone, isPhoneValid, submitLead } from "@/lib/lead";
import { PHONE, PHONE_HREF } from "@/lib/site";

export interface LeadFormConfig {
  source: string;
  title: string;
  subtitle?: string;
  cta?: string;
  image?: string;
  badge?: string;
  withComment?: boolean;
  commentPlaceholder?: string;
  details?: Record<string, string | number>;
}

const inputBase =
  "w-full h-14 rounded-2xl bg-white border px-5 text-[16px] text-ink placeholder:text-ink/45 outline-none focus:ring-4 transition-[border-color,box-shadow] ";
export const inputCls = inputBase + "border-line focus:border-glass focus:ring-glass/10";
const inputErr = inputBase + "border-red-400 focus:border-red-400 focus:ring-red-100";

export default function LeadForm({ config }: { config: LeadFormConfig }) {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [touched, setTouched] = useState(false);

  const valid = isPhoneValid(phone);
  const showErr = touched && !valid;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid || status === "sending") return;
    setStatus("sending");
    try {
      await submitLead({
        source: config.source,
        phone,
        name,
        comment,
        details: config.details,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") return <LeadSuccess />;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col">
      {config.badge && (
        <span className="inline-flex w-fit items-center rounded-full bg-amber/20 text-amber-ink text-[13px] font-semibold px-3 py-1 mb-4">{config.badge}</span>
      )}
      <h3 className="t-h3 md:text-[30px] text-ink pr-12 text-balance">{config.title}</h3>
      {config.subtitle && <p className="t-body mt-3 text-muted">{config.subtitle}</p>}

      <div className="mt-7 space-y-3">
        <div>
          <label htmlFor={id + "n"} className="sr-only">Имя</label>
          <input id={id + "n"} value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor={id + "p"} className="sr-only">Телефон</label>
          <input
            id={id + "p"}
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            onFocus={() => !phone && setPhone("+7")}
            placeholder="+7 (___) ___-__-__"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={showErr}
            className={(showErr ? inputErr : inputCls) + " tabular-nums"}
          />
          {showErr && <p className="text-[13px] text-red-600 mt-1.5 ml-2">Введите номер полностью — мы перезвоним</p>}
        </div>

        {config.withComment && (
          <div>
            <label htmlFor={id + "c"} className="sr-only">Комментарий</label>
            <textarea
              id={id + "c"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={config.commentPlaceholder || "Опишите, что случилось с окном"}
              rows={3}
              className="w-full rounded-2xl bg-white border border-line px-5 py-4 text-[16px] text-ink placeholder:text-ink/45 outline-none focus:border-glass focus:ring-4 focus:ring-glass/10 transition-[border-color,box-shadow] resize-none"
            />
          </div>
        )}

      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-7 w-full disabled:opacity-70">
        {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : config.cta || "Жду звонка мастера"}
      </button>
      {status === "error" && <p className="text-[13px] text-red-600 mt-2 text-center">Не получилось отправить. Позвоните нам: {PHONE}</p>}
      <p className="mt-4 text-[12px] text-ink/50 leading-relaxed text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных. Не звоним с рекламой.</p>
      <a href={PHONE_HREF} className="mt-4 flex items-center justify-center gap-2 h-11 text-[15px] font-semibold text-ink hover:text-glass transition-colors tabular-nums">
        <Phone className="w-4 h-4" /> Или позвоните: {PHONE}
      </a>
    </form>
  );
}

export function LeadSuccess() {
  return (
    <div role="status" className="flex flex-col items-center text-center py-10">
      <div className="anim-pop w-20 h-20 rounded-full bg-amber flex items-center justify-center">
        <Check className="w-10 h-10 text-ink stroke-[3]" />
      </div>
      <h3 className="t-h3 md:text-[28px] text-ink mt-7">Заявка принята!</h3>
      <p className="t-body mt-3 text-muted max-w-[340px]">Мастер перезвонит в течение 5 минут, уточнит детали и согласует удобное время выезда.</p>
      <a href={PHONE_HREF} className="btn btn-light mt-8 tabular-nums">
        <Phone className="w-4 h-4" /> Не хотите ждать? {PHONE}
      </a>
    </div>
  );
}
