import { NextPage } from 'next';
import exercises from '@/app/mock/exercises';
import { PageTitle, Breadcrumbs, CardsGrid, Container } from '@/app/components';

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
          <CardsGrid
            withSearch
            addLink="/exercises/create"
            addCaption="Добавить упражнение"
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
