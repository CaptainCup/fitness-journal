'use client';

import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import equipment from '@/app/mock/equipment';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  CardsGrid,
  Container,
  TextInput,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Оборудование', href: '/equipment' },
];

export const metadata = {
  title: 'Оборудование',
};

const Equipment: NextPage = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <main>
      <PageTitle title="Оборудование" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <div className="flex">
            <TextInput
              placeholder="Поиск"
              className="w-full flex mr-5"
              delay={1500}
              onChange={handleSearch}
              clear
            />

            <Button onClick={() => router.push('/equipment/create')}>
              <Image
                src="/icons/plus.svg"
                width={40}
                height={40}
                alt="Добавить"
                className="block md:hidden"
              />
              <p className="hidden md:inline whitespace-nowrap">
                Добавить оборудование
              </p>
            </Button>
          </div>
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            cards={equipment
              .filter(({ title }) => title.toLocaleLowerCase().includes(search))
              .map((equipmentItem) => ({
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
