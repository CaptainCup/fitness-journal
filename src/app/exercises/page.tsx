import { PageTitle, Button, Breadcrumbs, Card } from '@/app/components';
import { NextPage } from 'next';

const exercises = [
  {
    id: '1',
    img: '',
    title: 'Сгибание ног сидя',
  },
  {
    id: '2',
    img: '',
    title: 'Разгибание ног сидя',
  },
  {
    id: '3',
    img: '',
    title: 'Жим лежа',
  },
];

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
];

export const metadata = {
  title: 'Упражнения',
};

const Exercises: NextPage = () => {
  return (
    <main>
      <PageTitle title="Упражнения" />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Button className="w-full sm:w-auto">
            Добавить новое упражнение
          </Button>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pb-3">
          {exercises.map((exercise) => (
            <Card
              key={exercise.id}
              link={`exercises/${exercise.id}`}
              {...exercise}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Exercises;
