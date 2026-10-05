export const PHONE = "+7 000 000 00 00";
export const PHONE_HREF = "tel:+70000000000";

/** Number used for WhatsApp. */
export const MESSENGER_PHONE = "79614400014";
export const WHATSAPP_HREF = `https://wa.me/${MESSENGER_PHONE}`;
export const TELEGRAM_HREF = "https://t.me/As_okna";
export const MAX_HREF = "https://max.ru/u/f9LHodD0cOKNUnBfh-lZQBE3Kk7V0bJ95YNiKXbkIyxBaiHarVhzFxkURdI";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const FULL_WIDTH: Record<string, number> = { hero: 2200, night: 2200 };

export function img(name: string) {
  return `${base}/img/${name}.webp`;
}

export function asset(path: string) {
  return `${base}${path}`;
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

/** Official messenger logos (files in /public/icons, not redrawn). */
export const MESSENGERS = [
  { id: "max", label: "MAX", href: MAX_HREF, icon: "/icons/max.webp" },
  { id: "telegram", label: "Telegram", href: TELEGRAM_HREF, icon: "/icons/telegram.svg" },
  { id: "whatsapp", label: "WhatsApp", href: WHATSAPP_HREF, icon: "/icons/whatsapp.svg" },
] as const;

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#pricing" },
  { label: "О мастере", href: "#master" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
];
