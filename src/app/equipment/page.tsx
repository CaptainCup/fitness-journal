import { NextPage } from 'next';
import Link from 'next/link';
import equipment from '@/app/mock/equipment';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  CardsGrid,
  Container,
} from '@/app/components';

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
          <Link href="equipment/create">
            <Button className="w-full sm:w-auto">
              Добавить новое оборудование
            </Button>
          </Link>
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
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
