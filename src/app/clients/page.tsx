import { NextPage } from 'next';
import Link from 'next/link';
import clients from '@/app/mock/clients';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  CardsGrid,
  Container,
} from '@/app/components';

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
      <Container>
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
      </Container>
    </main>
  );
};

export default Equipment;
