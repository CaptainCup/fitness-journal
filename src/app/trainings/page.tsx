import { NextPage } from 'next';
import Link from 'next/link';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  TrainingCard,
  Container,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Тренировки', href: '/trainings' },
];

export const metadata = {
  title: 'Тренировки',
};

const Trainings: NextPage = () => {
  return (
    <main>
      <PageTitle title="Тренировки" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="trainings/create">
            <Button className="w-full sm:w-auto">Начать тренировку</Button>
          </Link>
        </div>

        <div className="mb-5 sm:mb-10">
          <TrainingCard />
        </div>
        <div className="mb-5 sm:mb-10">
          <TrainingCard />
        </div>
        <div className="mb-5 sm:mb-10">
          <TrainingCard />
        </div>
        <div className="mb-5 sm:mb-10">
          <TrainingCard />
        </div>
        <div className="mb-5 sm:mb-10">
          <TrainingCard />
        </div>
      </Container>
    </main>
  );
};

export default Trainings;
