"use client";
import { motion } from "framer-motion";
import { useLead, type Article } from "@/components/lead/LeadProvider";
import { img } from "@/lib/site";

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
      "Проверьте швы и отливы. Влажный ветер с Кубани находит любую щель: герметизация швов защищает от продуваний и плесени на откосах.",
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
      "Если в доме есть питомец — переплата оправдана: обычную сетку кот порвёт за сезон, а падение из окна — главная причина травм у домашних кошек.",
    ],
  },
];

export default function Blog() {
  const lead = useLead();
  return (
    <section className="bg-cream py-20 md:py-24 px-5 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <h2 className="font-display font-semibold text-[28px] md:text-[44px] text-ink leading-[1.15] max-w-2xl">
            Полезно знать <span className="italic font-light text-glass">о своих окнах</span>
          </h2>
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
            className="bg-ink text-white rounded-[14px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-deep transition-colors"
          >
            Бесплатная консультация <span className="text-[14px] leading-none">↳</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {posts.map((post) => (
            <motion.button
              key={post.title}
              whileHover={{ y: -3 }}
              onClick={() => lead.openArticle(post)}
              className="text-left bg-white border border-line rounded-[18px] p-5 flex flex-col transition-all duration-200 hover:shadow-[0_8px_32px_rgba(11,22,32,0.08)] group"
            >
              <div className="w-full h-[220px] rounded-[12px] overflow-hidden mb-5 relative">
                <img src={img(post.image)} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[12px] font-semibold text-ink">{post.tag}</span>
              </div>
              <h3 className="font-bold text-[17px] text-ink leading-[1.4] mb-2.5">{post.title}</h3>
              <p className="text-[14px] text-muted leading-[1.6] mb-5 line-clamp-3">{post.description}</p>
              <span className="mt-auto text-[14px] font-semibold text-ink inline-flex items-center gap-1.5 group-hover:text-amber-dark transition-colors">
                Читать за 2 минуты <span className="text-[16px] leading-none">↳</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
