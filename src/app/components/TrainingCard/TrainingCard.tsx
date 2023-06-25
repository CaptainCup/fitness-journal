'use client';

import { FC, Fragment, memo, useState } from 'react';
import exercises from '@/app/mock/exercises';
import { Card, Title } from '@/app/components';

const repeats = [
  [1, 10, 20],
  [2, 15, 15],
  [3, 20, 10],
  [4, 15, 15],
];

const TrainingCard: FC = () => {
  const [allExercises, setAllExercises] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();

  const exercisesArray = allExercises ? exercises : exercises.slice(0, 5);

  const showAllExercises = () => setAllExercises(true);

  const selectCard = (card: any) =>
    setSelectedCard((draft: any) =>
      card.title === draft?.title ? null : card
    );

  return (
    <div>
      <Title>Среда 22.06.23</Title>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
        {exercisesArray.map((card) => (
          <Fragment key={card.title}>
            <Card
              key={card.title}
              onClick={() => selectCard(card)}
              checked={selectedCard?.title === card.title}
              {...card}
            />
            {selectedCard?.title === card.title && (
              <div className="col-span-2 lg:col-span-6 grid grid-cols-2 gap-5">
                {repeats.map(([number, weight, count]) => (
                  <Fragment key={number}>
                    <p className="text-right text-lime-400">{weight} кг </p>
                    <p className="text-left">{count} раз</p>
                  </Fragment>
                ))}
              </div>
            )}
          </Fragment>
        ))}
        {!allExercises && (
          <button
            onClick={showAllExercises}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +3
          </button>
        )}
        {/* {selectedCard && (
          <div className="col-span-2 lg:col-span-6 grid grid-cols-2 gap-5">
            {repeats.map(([number, weight, count]) => (
              <Fragment key={number}>
                <p className="text-right text-lime-400">{weight} кг </p>
                <p className="text-left">{count} раз</p>
              </Fragment>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default memo(TrainingCard);
