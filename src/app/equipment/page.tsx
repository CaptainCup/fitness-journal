import { PageTitle, Button, Breadcrumbs, CardsGrid } from '@/app/components';
import { NextPage } from 'next';
import equipment from '@/app/mock/equipment';
import Link from 'next/link';

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
      <section className="container mx-auto px-5 sm:px-0">
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
      </section>
    </main>
  );
};

export default Equipment;
