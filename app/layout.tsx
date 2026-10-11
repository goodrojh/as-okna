import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SITE_URL, YANDEX_METRIKA_ID } from "@/lib/site";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  // variable font: one file per subset covers all weights 400–700
  display: "swap",
});

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const title = "Ремонт и обслуживание пластиковых окон в Краснодаре — AS·окна";
const description =
  "Ремонт, регулировка и обслуживание пластиковых окон в Краснодаре. Устраним сквозняк, заменим уплотнитель, фурнитуру, ручки, стеклопакет. Выезд мастера в день обращения, стоимость — до начала работ. ☎ +7 961 440-00-14";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ["ремонт окон Краснодар", "регулировка окон", "замена стеклопакета", "москитные сетки Краснодар", "замена фурнитуры окон", "замена уплотнителя"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  openGraph: {
    title: "AS·окна — ремонт и обслуживание окон в Краснодаре",
    description: "Ремонт пластиковых окон за 1 визит. Выезд мастера в день обращения, гарантия 1 год.",
    url: SITE_URL,
    siteName: "AS·окна",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "AS·окна — ремонт окон в Краснодаре" }],
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
  url: SITE_URL,
  image: SITE_URL + "/og.jpg",
  telephone: ["+7 961 440-00-14", "+7 962 876-14-00"],
  areaServed: ["Краснодар", "Краснодарский край", "Юг России"],
  address: { "@type": "PostalAddress", addressLocality: "Краснодар", addressCountry: "RU" },
  openingHours: "Mo-Su 08:00-21:00",
  priceRange: "от 500 ₽",
  founder: { "@type": "Person", name: "Георгий" },
  foundingDate: "2007",
};

/*
 * Yandex.Metrika. Loaded on the first user action (or after 6 s) so it never slows down the first screen.
 * Goals sent from the site (create them in Metrika as «JavaScript-событие»):
 *   lead      — заявка отправлена (любая форма / калькулятор)
 *   call      — клик по номеру телефона
 *   messenger — клик по MAX / Telegram / WhatsApp
 */
const metrika = `
(function(){
  var ID=${YANDEX_METRIKA_ID};
  window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};window.ym.l=1*new Date();
  ym(ID,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
  var done=false,EV=["scroll","pointerdown","keydown","touchstart","mousemove"];
  function load(){if(done)return;done=true;EV.forEach(function(e){window.removeEventListener(e,load)});
    var s=document.createElement("script");s.async=1;s.src="https://mc.yandex.ru/metrika/tag.js";document.head.appendChild(s);}
  // Load on the visitor's first action, or after 6 s — the first screen never waits for the counter.
  EV.forEach(function(e){window.addEventListener(e,load,{once:true,passive:true})});
  setTimeout(load,6000);
  document.addEventListener("click",function(e){
    var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a)return;
    var h=a.getAttribute("href")||"";
    if(h.indexOf("tel:")===0)ym(ID,"reachGoal","call",{phone:h.slice(4)});
    else if(/wa\\.me|t\\.me|max\\.ru/.test(h))ym(ID,"reachGoal","messenger",{to:a.getAttribute("aria-label")||h});
  },{capture:true,passive:true});
})();`;

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
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
        <script dangerouslySetInnerHTML={{ __html: metrika }} />
      </head>
      <body>
        {children}
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
