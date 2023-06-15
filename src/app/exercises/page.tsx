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
      <section className="container mx-auto">
        <div className="mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-10">
          <Button>Добавить новое упражнение</Button>
        </div>
        <div className="grid gap-3 grid-cols-3">
          {exercises.map((exercise) => (
            <Exercise key={exercise.name} {...exercise} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Exercises;
