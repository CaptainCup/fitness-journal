'use client';

import { useState, useCallback, FC, memo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, Title } from '@/app/components';
import { Button, TextInput } from '@/app/components';
import { CardProps } from '../Card/Card';

export type CardsGridProps = {
  title?: string;
  cards: CardProps[];
  cardAction?: 'link' | 'check' | 'none';
  addLink?: string;
  addCaption?: string;
  withSearch?: boolean;
};

const CardsGrid: FC<CardsGridProps> = ({
  title,
  cards,
  addLink,
  addCaption = 'Добавить',
  withSearch,
}) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div>
      <div className="mb-5 sm:mb-10">
        <div className="flex -mr-2 lg:-mr-5">
          {withSearch && (
            <TextInput
              placeholder="Поиск"
              className="w-full flex mr-2 lg:mr-5"
              delay={1500}
              onChange={handleSearch}
              clear
            />
          )}

          {addLink && (
            <Button
              className="min-w- flex mr-2 lg:mr-5"
              onClick={() => router.push(addLink)}
            >
              <Image
                src="/icons/plus.svg"
                width={40}
                height={40}
                alt="Добавить"
                className="block md:hidden"
              />
              <p className="hidden md:inline whitespace-nowrap">{addCaption}</p>
            </Button>
          )}
        </div>
      </div>

      {title && <Title>{title}</Title>}

      <div className="grid gap-2 lg:gap-5 grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {cards
          .filter(({ title }) => title.toLocaleLowerCase().includes(search))
          .map((card) => (
            <Card key={card.title} {...card} />
          ))}
      </div>
    </div>
  );
};

export default memo(CardsGrid);
