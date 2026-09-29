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

Сайт публикуется на GitHub Pages из ветки `gh-pages` (собранная папка `out/`):

```bash
GITHUB_PAGES=true npm run build
```

затем содержимое `out/` (+ пустой файл `.nojekyll`) коммитится в ветку `gh-pages`.
