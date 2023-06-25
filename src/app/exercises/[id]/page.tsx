import { NextPage } from 'next';
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
} from '@/app/components';

const exercise = {
  id: '1',
  name: 'Сгибание ног сидя',
  image: '/leg-curl-exercise.jpg',
  description: `Сгибание ног в положении сидя - одно из лучших упражнений на подколенные сухожилия, которое вы можете выполнять, и оно прекрасно дополняет упражнения на разгибание бедер.

Исследования показали, что сгибание ног в положении сидя отлично подходит для активности и роста мышц подколенного сухожилия. Одной из причин его эффективности является то, что сгибание ног в положении сидя выполняется с согнутым бедром, что приводит к увеличению длины подколенных сухожилий. И тренировка с большой длиной мышц, по-видимому, эффективна для роста мышц.
  
В то время как такие упражнения, как становая тяга на негнущихся ногах, в основном воздействуют на верхние отделы подколенных сухожилий, сгибание ног также воздействует на нижние отделы подколенных сухожилий. Сочетание обоих типов упражнений в тренировках ног, вероятно, является хорошей идеей для оптимальной тренировки подколенных сухожилий.`,

  steps: [
    {
      img: '/leg-curl-equipment.jpg',
      description:
        'Отрегулируйте тренажер таким образом, чтобы он был установлен правильно. Ваши колени должны находиться на одной линии с суставом тренажера.',
    },
    {
      img: '/leg-curl-step-2.webp',
      description:
        'Опустите вес тела вниз, согнув ноги в коленях как можно дальше.',
    },
    {
      img: '/leg-curl-step-3.webp',
      description: 'Медленно верните вес обратно.',
    },
  ],

  muscules: [
    {
      title: 'Бедро',
      img: '/muscules-hip.webp',
    },
  ],

  equipment: [
    {
      title: 'Leg Curl Techogym',
      img: '/leg-curl-equipment.jpg',
      link: '/equipment/1',
    },
  ],

  exercises: [
    {
      title: 'Сгибание ног лежа',
      img: '/lying-leg-curl-exercise.jpg',
      link: '/exercises/2',
    },
  ],
};

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: exercise.name, href: '/exercises/1' },
];

export const metadata = {
  title: exercise.name,
};

const Exercise: NextPage = () => {
  return (
    <main>
      <PageTitle title={exercise.name} image={exercise.image} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <p className="whitespace-pre-wrap font-serif mb-5 sm:mb-10 ">
          {exercise.description}
        </p>

        <div className="mb-5 sm:mb-10">
          <ExerciseSteps title="Порядок выполнения" steps={exercise.steps} />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid title="Задействованные мышцы" cards={exercise.muscules} />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            title="Используемое оборудование"
            cards={exercise.equipment}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid title="Похожие упражнения" cards={exercise.exercises} />
        </div>
      </Container>
    </main>
  );
};

export default Exercise;
