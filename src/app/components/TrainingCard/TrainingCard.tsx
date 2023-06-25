'use client';

import { FC, Fragment, memo, useMemo, useState } from 'react';
import exercises from '@/app/mock/exercises';
import { Card, Title } from '@/app/components';
import { useMediaQuery } from 'react-responsive';

const repeats = [
  [1, 10, 20],
  [2, 15, 15],
  [3, 20, 10],
  [4, 15, 15],
];

const TrainingCard: FC = () => {
  const [allExercises, setAllExercises] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const maxExercises = useMemo(() => (isDesktop ? 5 : 3), [isDesktop]);
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

  const restExercises = useMemo(() => {
    return maxExercises > exercises.length
      ? 0
      : exercises.length - maxExercises;
  }, [maxExercises]);

  const exercisesArray = allExercises
    ? exercises
    : exercises.slice(0, maxExercises);

  const showStatsAfterCardIndex = useMemo(() => {
    const selectedCardIndex = exercisesArray.findIndex(
      ({ title }) => title === selectedCard?.title
    );
    const res =
      Math.ceil((selectedCardIndex + 1) / exercisesPerRow) * exercisesPerRow -
      1;
    return res;
  }, [selectedCard, exercisesArray, exercisesPerRow]);

  const showStatsAfterButton = useMemo(
    () => showStatsAfterCardIndex > exercisesArray.length - 1,
    [showStatsAfterCardIndex, exercisesArray]
  );

  const showAllExercises = () => setAllExercises(true);

  const selectCard = (card: any) =>
    setSelectedCard((draft: any) =>
      card.title === draft?.title ? null : card
    );

  const stats = (
    <div className="col-span-2 sm:col-span-4 lg:col-span-6 grid grid-cols-2 gap-5 my-5">
      {repeats.map(([number, weight, count]) => (
        <Fragment key={number}>
          <p className="text-right text-lime-400">{weight} кг </p>
          <p className="text-left">{count} раз</p>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div>
      <Title>Среда 22.06.23</Title>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
        {exercisesArray.map((card, index) => (
          <Fragment key={card.title}>
            <Card
              key={card.title}
              onClick={() => selectCard(card)}
              checked={selectedCard?.title === card.title}
              {...card}
            />
            {index === showStatsAfterCardIndex && stats}
          </Fragment>
        ))}

        {!!restExercises && !allExercises && (
          <button
            onClick={showAllExercises}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +{restExercises}
          </button>
        )}

        {showStatsAfterButton && stats}
      </div>
    </div>
  );
};

export default memo(TrainingCard);
