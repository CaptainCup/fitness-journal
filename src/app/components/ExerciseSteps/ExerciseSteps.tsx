import React, { FC, Fragment, memo } from 'react';
import Image from 'next/image';
import { Title } from '@/app/components';

type Step = {
  img: string;
  description: string;
};

type ExerciseStepsProps = {
  title: string;
  steps: Step[];
};

const ExerciseSteps: FC<ExerciseStepsProps> = ({ title, steps }) => {
  return (
    <div>
      <Title>{title}</Title>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5">
        {steps.map(({ img, description }, index) => (
          <Fragment key={description}>
            <div className="relative aspect-square">
              <Image alt={`Шаг ${index + 1}`} src={img} fill />
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 flex items-center ">
              <p className="font-serif">{description}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(ExerciseSteps);
