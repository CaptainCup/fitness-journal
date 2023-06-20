'use client';

import { FC, memo, useState, useCallback } from 'react';
import { Button, ModalGrid, Card } from '@/app/components';
import { CardProps } from '../Card/Card';

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

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {cards?.map((card) => (
            <Card key={card.title} {...card} />
          ))}

          <div className="sm:col-span-2 md:col-span-3 flex items-center">
            <Button className="w-full" onClick={handleModalOpen}>
              {cards.length ? 'Изменить группы мышц' : 'Добавить группу мышц'}
            </Button>
          </div>
        </div>
      </div>

      <ModalGrid
        title="Выберите группу мышц"
        type={type}
        open={modalOpen}
        onCancel={handleModalOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default memo(CardsGridEditor);
