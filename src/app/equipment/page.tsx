import { NextPage } from 'next';
import equipment from '@/app/mock/equipment';
import { PageTitle, Breadcrumbs, CardsGrid, Container } from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
];

export const metadata = {
  title: 'Оборудование',
};

const Equipment: NextPage = () => {
  return (
    <main>
      <PageTitle title="Оборудование" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            withSearch
            addLink="/equipment/create"
            addCaption="Добавить оборудование"
            cards={equipment.map((equipmentItem) => ({
              ...equipmentItem,
              link: `equipment/${equipmentItem.title}`,
            }))}
          />
        </div>
      </Container>
    </main>
  );
};

export default Equipment;
