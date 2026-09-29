"use client";
import React, { useCallback } from "react";

/* One shared IntersectionObserver for the whole page: no per-element JS animation, no re-renders. */
let io: IntersectionObserver | null = null;
function getObserver() {
  if (io || typeof window === "undefined") return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
  );
  return io;
}

/** Scroll reveal (plays once, opacity/transform only). Content stays visible without JS. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useCallback((el: HTMLDivElement | null) => {
    if (el) getObserver()?.observe(el);
  }, []);
  return (
    <div ref={ref} className={"reveal " + className} style={delay ? { transitionDelay: delay + "s" } : undefined}>
      {children}
    </div>
  );
}

export function SectionHead({
  title,
  lead,
  dark = false,
  center = false,
  action,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className={"mb-10 md:mb-14 flex flex-col gap-6 " + (center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between")}>
      <Reveal className={center ? "max-w-3xl flex flex-col items-center" : "max-w-3xl"}>
        <h2 className={"t-h2 " + (dark ? "text-white" : "text-ink")}>{title}</h2>
        {lead && <p className={"t-lead mt-4 max-w-2xl " + (dark ? "text-white/70" : "text-muted")}>{lead}</p>}
      </Reveal>
      {action && (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
