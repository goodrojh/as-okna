export const PHONE = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";
export const WHATSAPP_HREF = "https://wa.me/70000000000";
export const TELEGRAM_HREF = "https://t.me/+70000000000";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const FULL_WIDTH: Record<string, number> = { hero: 2200, night: 2200 };

export function img(name: string) {
  return `${base}/img/${name}.webp`;
}

/** Responsive <img> attributes: 800px variant for phones, full size for desktop. */
export function pic(name: string, sizes = "100vw") {
  return {
    src: img(name),
    srcSet: `${base}/img/${name}-800.webp 800w, ${img(name)} ${FULL_WIDTH[name] || 1400}w`,
    sizes,
  };
}

export function thumb(name: string) {
  return `${base}/img/${name}-thumb.webp`;
}

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "Как работаем", href: "#how" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
];
