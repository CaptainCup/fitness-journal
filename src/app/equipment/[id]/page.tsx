import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
} from '@/app/components';
import { NextPage } from 'next';

const equipment = {
  id: '1',
  name: 'Leg Curl Techogym',
  image: '/leg-curl-equipment.jpg',
  description: `Прорабатывайте с оптимальной эффективностью мышцы задней и передней поверхности бедра на одном тренажере. Расширяет комплекс упражнений при использовании меньшего количества оборудования.`,

  steps: [
    {
      img: '/leg-curl-equipment-step-1.jpg',
      description:
        'Благодаря тому, что регулирующие устройства окрашены в ярко-желтый цвет, даже неопытные пользователи легко найдут их и смогут самостоятельно настроить тренажер.',
    },
    {
      img: '/leg-curl-equipment-step-2.jpg',
      description:
        'Эта функция позволяет пользователю установить сверху стека дополнительную пластину массой в половину обычной. В результате появляется возможность постепенного увеличения нагрузки.',
    },
  ],

  exercises: [
    {
      title: 'Сгибание ног сидя',
      img: '/leg-curl-exercise.jpg',
      link: '/exercises/2',
    },
  ],
};

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: equipment.name, href: '/exercises/1' },
];

export const metadata = {
  title: equipment.name,
};

const Exercise: NextPage = () => {
  return (
    <main>
      <PageTitle title={equipment.name} image={equipment.image} withBack />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <p className="whitespace-pre-wrap mb-10 font-serif">
          {equipment.description}
        </p>

        <div className="mb-10">
          <ExerciseSteps
            title="Настройка оборудования"
            steps={equipment.steps}
          />
        </div>

        <div className="mb-10">
          <CardsGrid
            title="Используется в упражнениях"
            cards={equipment.exercises}
          />
        </div>
      </section>
    </main>
  );
};

export default Exercise;
