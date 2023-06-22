'use client';

import { FC, Fragment, memo, useCallback, useState } from 'react';
import { Card, ModalGrid } from '@/app/components';
import { CardProps } from '../Card/Card';

const TrainingCardEditor: FC = () => {
  const [selectedCard, setSelectedCard] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [exercises, setExercises] = useState<CardProps[]>([]);
  const [repeats, setRepeats] = useState<any>([[null, null]]);

  const selectCard = (card: any) =>
    setSelectedCard((draft: any) =>
      card.title === draft?.title ? null : card
    );

  const toggleModal = useCallback(() => setModalOpen((draft) => !draft), []);

  const handleConfirm = useCallback((value: any[]) => {
    setExercises(value.map((item) => ({ ...item, repeats: [] })));
  }, []);

  const handleRepeatsChange = (index: number, place: number, value: string) => {
    const updatedValue = [
      ...repeats[index].slice(0, place),
      value,
      ...repeats[index].slice(place + 1),
    ];

    const updatedRepeats = [
      ...repeats.slice(0, index),
      updatedValue,
      ...repeats.slice(index + 1),
    ];

    if (
      updatedRepeats[updatedRepeats.length - 1].every((value: any) => value)
    ) {
      updatedRepeats.push([null, null]);
    }

    setRepeats(updatedRepeats);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
          {exercises?.map((card) => (
            <Fragment key={card.title}>
              <Card
                key={card.title}
                onClick={() => selectCard(card)}
                checked={selectedCard?.title === card.title}
                {...card}
              />
              {selectedCard?.title === card.title && (
                <div className="col-span-2 lg:col-span-6 grid grid-cols-2 gap-2 lg:gap-5">
                  {repeats.map((_: any, index: number) => (
                    <Fragment key={index}>
                      <div className="flex">
                        <input
                          type="number"
                          className="w-full border-b-2 border-lime-400 pb-2 outline-none text-lime-400 text-center"
                          onChange={(e) =>
                            handleRepeatsChange(index, 0, e.target.value)
                          }
                        />
                        <p className=" text-lime-400">кг </p>
                      </div>

                      <div className="flex">
                        <input
                          type="number"
                          className="w-full border-b-2 border-black pb-2 outline-none text-center"
                          onChange={(e) =>
                            handleRepeatsChange(index, 1, e.target.value)
                          }
                        />
                        <p>раз </p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </Fragment>
          ))}

          <button
            onClick={toggleModal}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <ModalGrid
        title="Выберите упражнение"
        type="exercises"
        open={modalOpen}
        onCancel={toggleModal}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default memo(TrainingCardEditor);
