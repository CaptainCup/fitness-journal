import { PageTitle, Button, Breadcrumbs } from '@/app/components';
import { Exercise } from '@/app/views';
import { NextPage } from 'next';

const exercises = [
  {
    img: '',
    name: 'Сгибание ног сидя',
  },
  {
    img: '',
    name: 'Разгибание ног сидя',
  },
  {
    img: '',
    name: 'Жим лежа',
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
      <PageTitle>Упражнения</PageTitle>
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
            <Exercise key={exercise.name} {...exercise} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Exercises;
