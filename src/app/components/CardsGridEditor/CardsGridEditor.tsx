'use client';

import { FC, memo, useState, useCallback } from 'react';
import { Button, ModalGrid, Card } from '@/app/components';
import { CardProps } from '../Card/Card';

const captions = {
  muscules: {
    change: 'Изменить группы мышц',
    add: 'Добавить группу мышц',
    title: 'Выберите группу мышц',
  },
  exercises: {
    change: 'Изменить упражнения',
    add: 'Добавить упражнения',
    title: 'Выберите упражнения',
  },
  equipment: {
    change: 'Изменить оборудование',
    add: 'Добавить оборудование',
    title: 'Выберите оборудование',
  },
};

type CardsGridEditorProps = {
  title: string;
  type: 'muscules' | 'exercises' | 'equipment';
};

const CardsGridEditor: FC<CardsGridEditorProps> = ({
  title,
  type = 'muscules',
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cards, setCards] = useState<CardProps[]>([]);

  const handleModalOpen = useCallback(
    () => setModalOpen((draft) => !draft),
    []
  );

  const handleConfirm = useCallback((value: any[]) => {
    setCards(value);
  }, []);

  return (
    <>
      <div>
        <h4 className="text-xl w-full border-b-4 border-black mb-5">{title}</h4>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {cards?.map((card) => (
            <Card key={card.title} {...card} />
          ))}

          <div className="col-span-2 sm:col-span-3 md:col-span-4 xl:col-span-6 flex items-center">
            <Button className="w-full" onClick={handleModalOpen}>
              {cards.length ? captions[type].change : captions[type].add}
            </Button>
          </div>
        </div>
      </div>

      <ModalGrid
        title={captions[type].title}
        type={type}
        open={modalOpen}
        onCancel={handleModalOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default memo(CardsGridEditor);
