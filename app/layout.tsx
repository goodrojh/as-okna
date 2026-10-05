import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  // variable font: one file per subset covers all weights 400–700
  display: "swap",
});

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Ремонт и обслуживание пластиковых окон в Краснодаре — AS·окна",
  description:
    "Ремонт, регулировка и обслуживание пластиковых окон в Краснодаре. Устраним сквозняк, заменим уплотнитель, фурнитуру, стеклопакет. Выезд мастера в день обращения, цена фиксируется до начала работ. ☎ +7 961 440-00-14",
  keywords: ["ремонт окон Краснодар", "регулировка окон", "замена стеклопакета", "москитные сетки Краснодар", "замена фурнитуры окон", "замена уплотнителя"],
  openGraph: {
    title: "AS·окна — окна, в которых тепло",
    description: "Ремонт и обслуживание пластиковых окон в Краснодаре за 1 визит. Выезд мастера сегодня.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1620",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "AS·окна",
  telephone: "+7 961 440-00-14",
  areaServed: "Краснодар",
  address: { "@type": "PostalAddress", addressLocality: "Краснодар", addressCountry: "RU" },
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "от 500 ₽",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={onest.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint → scroll-reveal hides content only when it can reveal it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={`${base}/img/hero.webp`}
          imageSrcSet={`${base}/img/hero-800.webp 800w, ${base}/img/hero.webp 2200w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
