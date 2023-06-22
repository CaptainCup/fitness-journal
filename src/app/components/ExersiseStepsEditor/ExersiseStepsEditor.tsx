'use client';

import { FC, memo, useCallback, useState } from 'react';
import { Button, ImageUpload, Textarea, Title } from '@/app/components';

type ExersiseStepProps = {
  step: number;
  onDelete: () => void;
};

const ExersiseStep: FC<ExersiseStepProps> = ({ step, onDelete }) => {
  return (
    <>
      <div className="w-full">
        <ImageUpload id={`Step ${step}`} />
      </div>

      <div className="md:col-span-2 flex items-center">
        <Textarea placeholder="Описание шага" />
      </div>

      <div className="sm:col-span-2 md:col-span-1">
        <Button type="danger" className="w-full" onClick={onDelete}>
          Удалить шаг
        </Button>
      </div>
    </>
  );
};

export type ExersiseStepsEditorProps = {
  title?: string;
};

const ExersiseStepsEditor: FC<ExersiseStepsEditorProps> = ({ title }) => {
  const [steps, setSteps] = useState<number[]>([]);

  const addStep = useCallback(() => {
    setSteps((draft) => [...draft, draft.length]);
  }, []);

  const deleteStep = useCallback((deletingStep: number) => {
    setSteps((draft) => draft.filter((step) => step !== deletingStep));
  }, []);

  return (
    <div>
      {title && <Title>{title}</Title>}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center">
        {steps.map((step) => (
          <ExersiseStep
            key={step}
            step={step}
            onDelete={() => deleteStep(step)}
          />
        ))}

        <div className="sm:col-span-2 md:col-span-4 flex items-center">
          <Button className="w-full" onClick={addStep}>
            Добавить шаг
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ExersiseStepsEditor);
