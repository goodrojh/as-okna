import React from "react";
import { Phone } from "lucide-react";
import { CONTACTS } from "@/lib/site";

/**
 * Both contact numbers.
 * - "stack": compact two-line block for the desktop header
 * - "list":  name + number rows (footer, menus)
 */
export default function Phones({ variant = "list", className = "" }: { variant?: "stack" | "list"; className?: string }) {
  if (variant === "stack") {
    return (
      <div className={"flex flex-col justify-center gap-0.5 " + className}>
        {CONTACTS.map((c) => (
          <a key={c.href} href={c.href} className="group flex items-baseline gap-2 leading-none whitespace-nowrap">
            <span className="text-[11px] text-white/55 w-[54px]">{c.name}</span>
            <span className="text-[14px] font-semibold text-white group-hover:text-amber transition-colors tabular-nums">{c.phone}</span>
          </a>
        ))}
      </div>
    );
  }
  return (
    <ul className={"space-y-2 " + className}>
      {CONTACTS.map((c) => (
        <li key={c.href}>
          <a href={c.href} className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity tabular-nums">
            <Phone className="w-4 h-4 shrink-0" />
            <span className="opacity-70">{c.name}</span>
            <span className="font-semibold">{c.phone}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
