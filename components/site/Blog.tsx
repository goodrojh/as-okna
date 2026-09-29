"use client";
import { ArrowRight } from "lucide-react";
import { useLead, type Article } from "@/components/lead/LeadProvider";
import Reveal, { SectionHead } from "@/components/ui/Reveal";
import { pic } from "@/lib/site";

const posts: (Article & { description: string; tag: string })[] = [
  {
    image: "old",
    tag: "Ремонт",
    title: "5 признаков, что окну нужен ремонт, а не замена",
    description: "Дует, потеет, плохо закрывается? Рассказываем, когда хватит регулировки за 500 ₽, а когда пора менять.",
    body: [
      "1. Дует по периметру створки. Чаще всего сбита регулировка прижима или износился уплотнитель. Лечится регулировкой и заменой резины — окно снова держит тепло.",
      "2. Створка цепляет раму или закрывается с усилием. Створка провисла — мастер поднимет её и отрегулирует петли за 20–30 минут.",
      "3. Ручка болтается или проворачивается туго. Нужна смазка или замена ручки — это недорого и быстро.",
      "4. Конденсат только внизу стекла зимой. Часто это вопрос вентиляции и режима фурнитуры, а не брака окна.",
      "5. Стеклопакет треснул или запотел изнутри. Менять нужно только стеклопакет — рама остаётся на месте.",
      "Замена окна нужна, если деформирован профиль или окну больше 25–30 лет. Во всех остальных случаях ремонт обойдётся в 5–10 раз дешевле.",
    ],
  },
  {
    image: "night",
    tag: "Сезон",
    title: "Как подготовить окна к зиме в Краснодаре",
    description: "Кубанская зима мягкая, но сырая и ветреная. Чек-лист из 4 шагов, который сэкономит на отоплении.",
    body: [
      "Переведите фурнитуру в зимний режим. На торце створки есть эксцентрики (цапфы) — их поворот усиливает прижим. Мастер сделает это для всех окон за полчаса.",
      "Проверьте уплотнитель. Если резинка затвердела, потрескалась или почернела — её пора менять. Это главный источник сквозняков.",
      "Смажьте фурнитуру. Сухой механизм изнашивается быстрее и может заклинить в холод.",
      "Проверьте швы и отливы. Влажный ветер находит любую щель: герметизация швов защищает от продуваний и плесени на откосах.",
      "Комплексная подготовка всех окон квартиры обычно занимает 2–4 часа и заметно снижает счёт за отопление.",
    ],
  },
  {
    image: "net",
    tag: "Лето",
    title: "Москитная сетка «антикошка»: стоит ли переплачивать",
    description: "Разбираем, чем отличаются рамочные, плиссе и усиленные сетки и какую выбрать для квартиры с питомцем.",
    body: [
      "Обычная рамочная сетка — самый доступный вариант: защищает от комаров и мошек, снимается на зиму.",
      "Плиссе — складная сетка для дверей и больших проёмов: не мешает проходу и не требует снятия.",
      "«Антикошка» — сетка из прочного полимера на усиленной раме с металлическими креплениями. Выдерживает когти и вес кошки, служит годами.",
      "Если в доме есть питомец — переплата оправдана: обычную сетку кот порвёт за сезон, а падение из окна — частая причина травм у домашних кошек.",
    ],
  },
];

export default function Blog() {
  const lead = useLead();
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <SectionHead
          eyebrow="Полезно знать"
          title={<>Коротко <span className="text-glass">о ваших окнах</span></>}
          action={
            <button
              onClick={() =>
                lead.openForm({
                  source: "Блог: бесплатная консультация",
                  title: "Бесплатная консультация мастера",
                  subtitle: "Расскажите, что с окном, — подскажем, можно ли обойтись без ремонта.",
                  image: "repair",
                  withComment: true,
                  withTime: false,
                  cta: "Получить консультацию",
                })
              }
              className="btn btn-dark w-full md:w-auto"
            >
              Бесплатная консультация
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08} className="h-full">
              <button
                onClick={() => lead.openArticle(post)}
                className="group h-full w-full text-left bg-white border border-line rounded-3xl p-4 md:p-5 flex flex-col transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(11,22,32,0.18)]"
              >
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 relative">
                  <img
                    {...pic(post.image, "(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-ink">{post.tag}</span>
                </div>
                <h3 className="text-[18px] font-semibold text-ink leading-snug tracking-[-0.01em] px-1">{post.title}</h3>
                <p className="t-body text-muted mt-2 mb-5 line-clamp-3 px-1">{post.description}</p>
                <span className="mt-auto px-1 text-[14px] font-semibold text-glass inline-flex items-center gap-1.5">
                  Читать за 2 минуты <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
