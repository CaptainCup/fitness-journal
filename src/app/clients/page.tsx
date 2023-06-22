import { PageTitle, Button, Breadcrumbs, CardsGrid } from '@/app/components';
import { NextPage } from 'next';
import clients from '@/app/mock/clients';
import Link from 'next/link';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клиенты', href: '/clients' },
];

export const metadata = {
  title: 'Клиенты',
};

const Equipment: NextPage = () => {
  return (
    <main>
      <PageTitle title="Клиенты" />
      <section className="container mx-auto px-5 sm:px-0">
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="equipment/create">
            <Button className="w-full sm:w-auto">
              Добавить нового клиента
            </Button>
          </Link>
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            cards={clients.map((client) => ({
              ...client,
              link: `trainings/${client.title}`,
            }))}
          />
        </div>
      </section>
    </main>
  );
};

export default Equipment;
