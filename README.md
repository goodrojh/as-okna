# AS·окна — сайт

Лендинг компании по ремонту и установке пластиковых окон в Краснодаре.
Next.js 15 (App Router, static export) · Tailwind CSS 4 · framer-motion · lucide-react.

## Запуск

```bash
npm install
npm run dev
```

## Что где менять

| Что | Файл |
| --- | --- |
| Телефон, WhatsApp, Telegram | `lib/site.ts` |
| Отправка заявок | `lib/lead.ts` — задайте переменную `NEXT_PUBLIC_LEAD_ENDPOINT` (или repo variable `LEAD_ENDPOINT` для GitHub Pages) |
| Цвета и шрифты | `app/globals.css`, `app/layout.tsx` |
| Цифры в первом экране (лет, окон, рейтинг) | `components/site/Hero.tsx` |
| Прайс | `components/site/Services.tsx`, `components/site/Pricing.tsx` |
| Отзывы (сейчас — примеры!) | `components/site/Reviews.tsx` |
| Фото | `public/img/*.webp` (сгенерированы в Higgsfield) |

## Деплой

**Боевой сайт — https://as-okna23.ru** (сборка без префикса пути):

```bash
npm run build          # → папка out/ — это весь сайт (статичные файлы)
```

Содержимое `out/` загружается в корень хостинга домена (или на GitHub Pages с привязанным доменом —
тогда в `out/` нужно положить файл `CNAME` с текстом `as-okna23.ru`).

**Превью на GitHub Pages** (https://goodrojh.github.io/as-okna/):

```bash
GITHUB_PAGES=true npm run build
```

затем содержимое `out/` (+ пустой файл `.nojekyll`) коммитится в ветку `gh-pages`.

## Аналитика и заявки

- Яндекс Метрика 44147844 (`lib/site.ts`), цели: `lead`, `call`, `messenger`.
- Заявки → Google Таблица + почта: `integrations/`.
