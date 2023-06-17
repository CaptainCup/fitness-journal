import { PageTitle, Card, Breadcrumbs } from '@/app/components';
import { NextPage } from 'next';
import Image from 'next/image';

const exercise = {
  id: '1',
  name: 'Сгибание ног сидя',
  description: `Сгибание ног в положении сидя - одно из лучших упражнений на подколенные сухожилия, которое вы можете выполнять, и оно прекрасно дополняет упражнения на разгибание бедер.

Исследования показали, что сгибание ног в положении сидя отлично подходит для активности и роста мышц подколенного сухожилия. Одной из причин его эффективности является то, что сгибание ног в положении сидя выполняется с согнутым бедром, что приводит к увеличению длины подколенных сухожилий. И тренировка с большой длиной мышц, по-видимому, эффективна для роста мышц.
  
В то время как такие упражнения, как становая тяга на негнущихся ногах, в основном воздействуют на верхние отделы подколенных сухожилий, сгибание ног также воздействует на нижние отделы подколенных сухожилий. Сочетание обоих типов упражнений в тренировках ног, вероятно, является хорошей идеей для оптимальной тренировки подколенных сухожилий.`,
};

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: exercise.name, href: '/exercises/1' },
];

export const metadata = {
  title: 'Упражнения',
};

const Exercises: NextPage = () => {
  return (
    <main>
      <PageTitle
        title={exercise.name}
        image="/leg-curl-exercise.jpg"
        withBack
      />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <p className="whitespace-pre-wrap mb-10">{exercise.description}</p>

        <div className="mb-10">
          <h4 className="text-xl w-full border-b-4 border-black mb-5">
            Порядок выполнения
          </h4>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5">
            <div className="relative aspect-square">
              <Image alt="Шаг 1" src="/leg-curl-equipment.jpg" fill />
            </div>
            <div className="col-span-2 flex items-center">
              <p>
                Отрегулируйте тренажер таким образом, чтобы он был установлен
                правильно. Ваши колени должны находиться на одной линии с
                суставом тренажера.
              </p>
            </div>

            <div className="relative aspect-square">
              <Image alt="Шаг 1" src="/leg-curl-step-2.webp" fill />
            </div>
            <div className="col-span-2 flex items-center">
              <p>
                Опустите вес тела вниз, согнув ноги в коленях как можно дальше.
              </p>
            </div>

            <div className="relative aspect-square">
              <Image alt="Шаг 1" src="/leg-curl-step-3.webp" fill />
            </div>
            <div className="col-span-2 flex items-center">
              <p>Медленно верните вес обратно.</p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h4 className="text-xl w-full border-b-4 border-black mb-5">
            Задействованные мышцы
          </h4>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Card title="Бедро" img="/muscules-hip.webp" />
          </div>
        </div>

        <div className="mb-10">
          <h4 className="text-xl w-full border-b-4 border-black mb-5">
            Используемое оборудование
          </h4>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Card
              title="Leg Curl Techogym"
              img="/leg-curl-equipment.jpg"
              link="equipments/1"
            />
          </div>
        </div>

        <div className="mb-10">
          <h4 className="text-xl w-full border-b-4 border-black mb-5">
            Похожие упражнения
          </h4>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <Card
              title="Сгибание ног лежа"
              img="/lying-leg-curl-exercise.jpg"
              link="/exercises/2"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Exercises;
