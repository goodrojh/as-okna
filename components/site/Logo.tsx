import { useId } from "react";

/** Brand mark: window with a warm-lit sash and a sill, in a navy badge. Source: /logo/as-okna-mark.svg */
export function LogoMark({ size = 34 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id={id + "bg"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B4A6B" />
          <stop offset="1" stopColor="#0B1620" />
        </linearGradient>
        <linearGradient id={id + "gl"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFC56B" />
          <stop offset="1" stopColor="#F2A33A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      <rect x="33.6" y="14.6" width="13.8" height="27.8" rx="1.6" fill={`url(#${id}gl)`} />
      <rect x="14" y="13" width="36" height="31" rx="4" fill="none" stroke="#fff" strokeWidth="3.2" />
      <line x1="32" y1="14.5" x2="32" y2="42.5" stroke="#fff" strokeWidth="3.2" />
      <path d="M18.5 22 L24 16.5" stroke="#9CC4DD" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18.5 28 L26.5 20" stroke="#9CC4DD" strokeWidth="2.2" strokeLinecap="round" opacity=".55" />
      <rect x="35.4" y="24" width="3" height="8.5" rx="1.5" fill="#0B1620" />
      <rect x="10" y="47.5" width="44" height="4.2" rx="2.1" fill="#fff" />
    </svg>
  );
}

export default function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={"font-display font-bold text-[19px] tracking-[-0.035em] " + (light ? "text-white" : "text-ink")}>
        AS<span className="text-amber">·</span>окна
      </span>
    </span>
  );
}
