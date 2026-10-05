/** Two contact people. Георгий is the master (also on WhatsApp). */
export const CONTACTS = [
  { name: "Георгий", phone: "+7 961 440-00-14", href: "tel:+79614400014" },
  { name: "Владимир", phone: "+7 962 876-14-00", href: "tel:+79628761400" },
] as const;

export const PHONE = CONTACTS[0].phone;
export const PHONE_HREF = CONTACTS[0].href;

/** Number used for WhatsApp (same as the main phone). */
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
