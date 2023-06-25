'use client';

import { useState, useCallback } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import exercises from '@/app/mock/exercises';
import {
  PageTitle,
  Button,
  Breadcrumbs,
  CardsGrid,
  Container,
  TextInput,
  ModalGrid,
} from '@/app/components';

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
];

export const metadata = {
  title: 'Упражнения',
};

const Exercises: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleModalOpen = useCallback(
    () => setModalOpen((draft) => !draft),
    []
  );

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <>
      <main>
        <PageTitle title="Упражнения" />
        <Container>
          <div className="mb-5 sm:mb-10">
            <Breadcrumbs path={breadcrumbsPath} />
          </div>

          <div className="mb-5 sm:mb-10">
            <div className="flex">
              <TextInput
                placeholder="Поиск"
                className="w-full flex"
                delay={1500}
                onChange={handleSearch}
                clear
              />
              <Button className="mx-5" onClick={handleModalOpen}>
                <Image
                  src="/icons/filter.svg"
                  width={40}
                  height={40}
                  alt="Фильтр"
                  className="block md:hidden"
                />
                <p className="hidden md:inline">Фильтр</p>
              </Button>

              <Button onClick={() => router.push('/exercises/create')}>
                <Image
                  src="/icons/plus.svg"
                  width={40}
                  height={40}
                  alt="Добавить"
                  className="block md:hidden"
                />
                <p className="hidden md:inline whitespace-nowrap">
                  Добавить упражнение
                </p>
              </Button>
            </div>
          </div>

          <div className="mb-5 sm:mb-10">
            <CardsGrid
              cards={exercises
                .filter(({ title }) =>
                  title.toLocaleLowerCase().includes(search)
                )
                .map((exercise) => ({
                  ...exercise,
                  link: `exercises/${exercise.title}`,
                }))}
            />
          </div>
        </Container>
      </main>
      <ModalGrid
        withSearch
        title="Выберите группу мышц"
        type="muscules"
        open={modalOpen}
        onCancel={handleModalOpen}
        onConfirm={() => null}
      />
    </>
  );
};

export default Exercises;
