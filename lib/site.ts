export const PHONE = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";
export const WHATSAPP_HREF = "https://wa.me/70000000000";
export const TELEGRAM_HREF = "https://t.me/+70000000000";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function img(name: string) {
  return `${base}/img/${name}.webp`;
}

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "Как работаем", href: "#how" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
];
