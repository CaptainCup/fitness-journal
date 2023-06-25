import { NextPage } from 'next';
import Link from 'next/link';
import exercises from '@/app/mock/exercises';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  CardsGrid,
  Container,
} from '@/app/components';

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
      <Container>
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
      </Container>
    </main>
  );
};

export default Exercises;
