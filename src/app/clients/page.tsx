import { NextPage } from 'next';
import clients from '@/app/mock/clients';
import { PageTitle, Breadcrumbs, CardsGrid, Container } from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клиенты', href: '/clients' },
];

export const metadata = {
  title: 'Клиенты',
};

const Clients: NextPage = () => {
  return (
    <main>
      <PageTitle title="Клиенты" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            withSearch
            addLink="/clients/create"
            addCaption="Добавить клиента"
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

export default Clients;
