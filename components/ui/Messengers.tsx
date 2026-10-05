import React from "react";
import { MESSENGERS, asset } from "@/lib/site";

/** Row of official messenger logos. `variant="pill"` shows a label next to each icon. */
export default function Messengers({ variant = "icon", size = 36, className = "" }: { variant?: "icon" | "pill"; size?: number; className?: string }) {
  return (
    <div className={"flex items-center gap-2 " + className}>
      {MESSENGERS.map((m) =>
        variant === "pill" ? (
          <a
            key={m.id}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"Написать в " + m.label}
            className="flex items-center gap-2 h-10 pl-1.5 pr-3.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors"
          >
            <img src={asset(m.icon)} alt="" width={28} height={28} className="w-7 h-7 rounded-full" />
            <span className="text-[13px] font-semibold text-white">{m.label}</span>
          </a>
        ) : (
          <a
            key={m.id}
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={"Написать в " + m.label}
            className="shrink-0 rounded-full transition-transform hover:scale-105 active:scale-95"
            style={{ width: size, height: size }}
          >
            <img src={asset(m.icon)} alt="" width={size} height={size} className="w-full h-full rounded-full" />
          </a>
        )
      )}
    </div>
  );
}
