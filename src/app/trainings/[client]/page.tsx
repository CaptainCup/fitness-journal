import { PageTitle, Button, Breadcrumbs, TrainingCard } from '@/app/components';
import { NextPage } from 'next';
import Link from 'next/link';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клиенты', href: '/clents' },
  { label: 'Тренировки', href: '/clents' },
];

export const metadata = {
  title: 'Тренировки',
};

const Trainings: NextPage = () => {
  return (
    <main>
      <PageTitle title="Тренировки А. Шварценеггера" withBack />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="equipment/create">
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
      </section>
    </main>
  );
};

export default Trainings;
