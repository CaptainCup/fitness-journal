'use client'

import { FC, memo, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, ImageUpload, Textarea, Title } from '@/app/components'

type Step = {
  image: string
  text: string
}

type ExersiseStepProps = {
  step: Step
  index: number
  onChange: (value: any) => void
  onDelete: () => void
}

const ExersiseStep: FC<ExersiseStepProps> = ({
  step,
  index,
  onDelete,
  onChange,
}) => {
  return (
    <>
      <div className="md:col-span-2">
        <ImageUpload
          value={step.image}
          onChange={image => onChange({ image })}
          id={`Step ${index}`}
        />
      </div>

      <div className="md:col-span-2 flex items-center">
        <Textarea
          value={step.text}
          onChange={text => onChange({ text })}
          placeholder="Описание шага"
        />
      </div>

      <div className="sm:col-span-2 md:col-span-1">
        <Button danger className="w-full" onClick={onDelete}>
          Удалить шаг
        </Button>
      </div>
    </>
  )
}

export type ExersiseStepsEditorProps = {
  title?: string
  value?: Step[]
  onChange?: (value: Step[]) => void
}

const ExersiseStepsEditor: FC<ExersiseStepsEditorProps> = ({
  title,
  value,
  onChange = () => null,
}) => {
  const [steps, setSteps] = useState<Step[]>([])

  const addStep = () => {
    const updatedSteps = [...steps, { image: '', text: '' }]

    setSteps(updatedSteps)
    onChange(updatedSteps)
  }

  const deleteStep = (deletingStep: number) => {
    const updatedSteps = [
      ...steps.slice(0, deletingStep),
      ...steps.slice(deletingStep + 1),
    ]

    setSteps(updatedSteps)
    onChange(updatedSteps)
  }

  const changeStep = (value: any, index: number) => {
    const updatedSteps = [
      ...steps.slice(0, index),
      { ...steps[index], ...value },
      ...steps.slice(index + 1),
    ]

    setSteps(updatedSteps)
    onChange(updatedSteps)
  }

  useEffect(() => {
    if (value) {
      setSteps(value)
    }
  }, [value])

  return (
    <div>
      <Title
        extra={
          <Button className="py-1 px-2">
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="Добавить"
              onClick={addStep}
            />
          </Button>
        }
      >
        {title}
      </Title>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center">
        {steps.map((step, index) => (
          <ExersiseStep
            key={index}
            step={step}
            index={index}
            onChange={value => changeStep(value, index)}
            onDelete={() => deleteStep(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(ExersiseStepsEditor)
