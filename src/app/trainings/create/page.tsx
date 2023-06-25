import { NextPage } from 'next';
import Link from 'next/link';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  TrainingCardEditor,
  Container,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Тренировки', href: '/trainings' },
  { label: 'Новая тренировка', href: '/trainings/create' },
];

export const metadata = {
  title: 'Тренировки',
};

const Trainings: NextPage = () => {
  return (
    <main>
      <PageTitle title="Тренировка 23.06.23" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <TrainingCardEditor />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="/trainings">
            <Button>Закончить тренировку</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default Trainings;
