'use client';

import { FC, Fragment, memo, useCallback, useState, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Card, ModalGrid } from '@/app/components';
import { CardProps } from '../Card/Card';

const TrainingCardEditor: FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const [exercises, setExercises] = useState<
    (CardProps & { repeats: string[][] })[]
  >([]);

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const exercisesPerRow = useMemo(() => {
    switch (true) {
      case isDesktop: {
        return 6;
      }
      case isMobile: {
        return 2;
      }
      default: {
        return 4;
      }
    }
  }, [isDesktop, isMobile]);

  const selectCard = (card: string) =>
    setSelectedCard((draft) => (card === draft ? '' : card));

  const toggleModal = useCallback(() => setModalOpen((draft) => !draft), []);

  const handleConfirm = useCallback((value: any[]) => {
    setExercises((draft) => [
      ...draft,
      ...value.map((item) => ({ ...item, repeats: [['', '']] })),
    ]);

    if (value.length === 1) {
      setSelectedCard(value[0].title);
    }
  }, []);

  const handleRepeatsChange = (index: number, place: number, value: string) => {
    const currentExercise = exercises.findIndex(
      ({ title }) => selectedCard === title
    );

    const updatedValue = [
      ...exercises[currentExercise].repeats[index].slice(0, place),
      value,
      ...exercises[currentExercise].repeats[index].slice(place + 1),
    ];

    const updatedRepeats = [
      ...exercises[currentExercise].repeats.slice(0, index),
      updatedValue,
      ...exercises[currentExercise].repeats.slice(index + 1),
    ];

    if (
      updatedRepeats[updatedRepeats.length - 1].every((value: any) => value)
    ) {
      updatedRepeats.push(['', '']);
    }

    const updatedExercises = [
      ...exercises.slice(0, currentExercise),
      { ...exercises[currentExercise], repeats: updatedRepeats },
      ...exercises.slice(currentExercise + 1),
    ];

    setExercises(updatedExercises);
  };

  const showStatsAfterCardIndex = useMemo(() => {
    const selectedCardIndex = exercises.findIndex(
      ({ title }) => title === selectedCard
    );
    const res =
      Math.ceil((selectedCardIndex + 1) / exercisesPerRow) * exercisesPerRow -
      1;
    return res;
  }, [selectedCard, exercises, exercisesPerRow]);

  const showStatsAfterButton = useMemo(
    () => showStatsAfterCardIndex > exercises.length - 1,
    [showStatsAfterCardIndex, exercises]
  );

  const currentStats = exercises.find(
    ({ title }) => selectedCard === title
  )?.repeats;

  const stats = (
    <div className="col-span-2 lg:col-span-6 grid grid-cols-2 gap-2 lg:gap-5 my-5">
      {currentStats?.map(([first, second], index: number) => (
        <Fragment key={index}>
          <div className="flex">
            <input
              type="number"
              className="w-full border-b-2 border-lime-400 pb-2 outline-none text-lime-400 text-center"
              onChange={(e) => handleRepeatsChange(index, 0, e.target.value)}
              value={first}
            />
            <p className=" text-lime-400">кг </p>
          </div>

          <div className="flex">
            <input
              type="number"
              className="w-full border-b-2 border-black pb-2 outline-none text-center"
              onChange={(e) => handleRepeatsChange(index, 1, e.target.value)}
              value={second}
            />
            <p>раз </p>
          </div>
        </Fragment>
      ))}
    </div>
  );

  return (
    <>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
          {exercises?.map((card, index) => (
            <Fragment key={card.title}>
              <Card
                key={card.title}
                onClick={() => selectCard(card.title)}
                checked={selectedCard === card.title}
                {...card}
              />
              {index === showStatsAfterCardIndex && stats}
            </Fragment>
          ))}

          <button
            onClick={toggleModal}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +
          </button>

          {showStatsAfterButton && stats}
        </div>
      </div>

      <ModalGrid
        withSearch
        title="Выберите упражнение"
        type="exercises"
        open={modalOpen}
        onCancel={toggleModal}
        onConfirm={handleConfirm}
        filterData={(item: CardProps) =>
          !exercises.some(({ title }) => title === item.title)
        }
      />
    </>
  );
};

export default memo(TrainingCardEditor);
