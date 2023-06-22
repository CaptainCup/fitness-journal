import { NextPage } from 'next';
import Link from 'next/link';
import { PageTitle, Button, Title } from '@/app/components';

export const metadata = {
  title: 'Тренировки',
};

const Trainings: NextPage = () => {
  return (
    <main>
      <PageTitle title="Добро пожаловать в X-Fit!" />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Title>Оборудование</Title>
          <p className="mb-5">
            Узнайте какие тренажеры и спортивные саряды есть в клубе X-fit, как
            их настраивать и какие упражнения можно с помощью них выполнять.
          </p>
          <Link href="/equipment">
            <Button>Перейти к оборудованию</Button>
          </Link>
        </div>

        <div className="mb-5 sm:mb-10">
          <Title>Упражнения</Title>
          <p className="mb-5">
            Узнайте как правильно выполнять упражнения, ищите упражнения на
            интересующие вас группы мышц и похожие упражнения.
          </p>
          <Link href="/exercises">
            <Button>Перейти к упражнениям</Button>
          </Link>
        </div>

        <div className="mb-5 sm:mb-10">
          <Title>Тренировки</Title>
          <p className="mb-5">
            Ведите свой журнал тренировок и отслеживайте ваши результаты.
          </p>
          <Link href="/trainings">
            <Button>Перейти к тренировкам</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Trainings;
