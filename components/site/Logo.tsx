export default function Logo({ light = true }: { light?: boolean }) {
  const stroke = light ? "#fff" : "#0B1620";
  return (
    <span className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <rect x="1.5" y="1.5" width="29" height="29" rx="7" fill="none" stroke={stroke} strokeWidth="2.5" />
        <line x1="16" y1="2" x2="16" y2="30" stroke={stroke} strokeWidth="2.5" />
        <line x1="2" y1="15" x2="30" y2="15" stroke={stroke} strokeWidth="2.5" />
        <rect x="19" y="18" width="8.5" height="9.5" rx="2" fill="#F2A33A" />
      </svg>
      <span className={"font-display font-bold text-[18px] tracking-[-0.03em] " + (light ? "text-white" : "text-ink")}>
        AS<span className="text-amber">·</span>окна
      </span>
    </span>
  );
}
