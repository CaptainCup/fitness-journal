import { PageTitle, Button, Breadcrumbs, CardsGrid } from '@/app/components';
import { NextPage } from 'next';
import exercises from '@/app/mock/exercises';
import Link from 'next/link';

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
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Link href="exercises/create">
              <Button className="w-full">Добавить новое упражнение</Button>
            </Link>
            <Button className="w-full">Фильтр</Button>
            <Button className="w-full">Поиск</Button>
          </div>
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            cards={exercises.map((exercise) => ({
              ...exercise,
              link: `exercises/${exercise.title}`,
            }))}
          />
        </div>
      </section>
    </main>
  );
};

export default Exercises;
