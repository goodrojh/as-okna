import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({ variable: "--font-unbounded", subsets: ["latin", "cyrillic"], weight: ["300", "400", "500", "600", "700"] });
const sans = Manrope({ variable: "--font-manrope", subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Ремонт и установка пластиковых окон в Краснодаре — AS·окна",
  description:
    "Ремонт, регулировка и обслуживание пластиковых окон в Краснодаре. Устраним сквозняк, заменим уплотнитель, фурнитуру, стеклопакет. Выезд мастера в день обращения, цена фиксируется до начала работ. ☎ +7 000 000 00 00",
  keywords: ["ремонт окон Краснодар", "регулировка окон", "замена стеклопакета", "москитные сетки Краснодар", "установка окон Краснодар"],
  openGraph: {
    title: "AS·окна — окна, в которых тепло",
    description: "Ремонт и установка пластиковых окон в Краснодаре за 1 визит. Выезд мастера сегодня.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1620",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "AS·окна",
  telephone: "+7 000 000 00 00",
  areaServed: "Краснодар",
  address: { "@type": "PostalAddress", addressLocality: "Краснодар", addressCountry: "RU" },
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "от 500 ₽",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${display.variable} ${sans.variable} antialiased`}>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
