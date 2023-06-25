'use client';

import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clients from '@/app/mock/clients';
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
  { label: 'Клиенты', href: '/clients' },
];

export const metadata = {
  title: 'Клиенты',
};

const Clients: NextPage = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);
  return (
    <main>
      <PageTitle title="Клиенты" />
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

            <Button onClick={() => router.push('/clients/create')}>
              <Image
                src="/icons/plus.svg"
                width={40}
                height={40}
                alt="Добавить"
                className="block md:hidden"
              />
              <p className="hidden md:inline whitespace-nowrap">
                Добавить клиента
              </p>
            </Button>
          </div>
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGrid
            cards={clients
              .filter(({ title }) => title.toLocaleLowerCase().includes(search))
              .map((client) => ({
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
