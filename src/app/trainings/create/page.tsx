import { NextPage } from 'next';
import Link from 'next/link';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  TrainingCardEditor,
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
      <section className="container mx-auto px-5 sm:px-0">
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
      </section>
    </main>
  );
};

export default Trainings;
