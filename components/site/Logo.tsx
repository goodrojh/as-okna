import { asset } from "@/lib/site";

/** Brand logo: glass «AS» letters (official artwork, transparent background) + «окна» wordmark. */
export default function Logo({ light = true, height = 30 }: { light?: boolean; height?: number }) {
  // artwork aspect ratio 725 × 327
  const width = Math.round((height * 725) / 327);
  return (
    <span className="flex items-center gap-1.5">
      <img
        src={asset("/brand/as-logo.webp")}
        alt="AS"
        width={width}
        height={height}
        decoding="async"
        fetchPriority="high"
        style={{ width, height }}
        className="block select-none"
        draggable={false}
      />
      <span className={"font-display font-bold text-[19px] leading-none tracking-[-0.035em] " + (light ? "text-white" : "text-ink")}>окна</span>
    </span>
  );
}
