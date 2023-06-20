'use client';

import { FC, memo, useCallback, useState } from 'react';
import { Button, ImageUpload, Textarea } from '@/app/components';

type ExersiseStepProps = {
  step: number;
  onDelete: () => void;
};

const ExersiseStep: FC<ExersiseStepProps> = ({ step, onDelete }) => {
  return (
    <>
      <div>
        <ImageUpload id={`Step ${step}`} />
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center">
        <Textarea placeholder="Описание шага" />
      </div>

      <div>
        <Button type="danger" className="w-full" onClick={onDelete}>
          Удалить шаг
        </Button>
      </div>
    </>
  );
};

const ExersiseStepsEditor: FC = () => {
  const [steps, setSteps] = useState<number[]>([]);

  const addStep = useCallback(() => {
    setSteps((draft) => [...draft, draft.length]);
  }, []);

  const deleteStep = useCallback((deletingStep: number) => {
    setSteps((draft) => draft.filter((step) => step !== deletingStep));
  }, []);

  return (
    <div>
      <h4 className="text-xl w-full border-b-4 border-black mb-5">
        Порядок выполнения
      </h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-y-5 items-center">
        {steps.map((step) => (
          <ExersiseStep
            key={step}
            step={step}
            onDelete={() => deleteStep(step)}
          />
        ))}

        <div className="col-span-2 md:col-span-4 flex items-center">
          <Button className="w-full" onClick={addStep}>
            Добавить шаг
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ExersiseStepsEditor);
