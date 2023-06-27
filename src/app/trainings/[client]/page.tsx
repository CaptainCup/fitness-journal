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
  { label: 'Клиенты', href: '/clients' },
  { label: 'Тренировки', href: '/clients' },
];

export const metadata = {
  title: 'Тренировки',
};

const Trainings: NextPage = () => {
  return (
    <main>
      <PageTitle
        title="Тренировки А. Шварценеггера"
        image="/images/client-1.jpg"
        withBack
      />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="create">
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
