'use client'

import { FC, memo, useCallback, useEffect, useState } from 'react'
import { Button, Title, Image } from '@/components'
import Step, { StepType } from './Step'

export type StepsEditorProps = {
  title?: string
  value?: StepType[]
  onChange?: (value: StepType[]) => void
}

const StepsEditor: FC<StepsEditorProps> = ({
  title,
  value,
  onChange = () => null,
}) => {
  const [steps, setSteps] = useState<StepType[]>([{ image: '', text: '' }])

  const addStep = useCallback(() => {
    const updatedSteps = [...steps, { image: '', text: '' }]

    setSteps(updatedSteps)
    onChange(updatedSteps)
  }, [steps, onChange])

  const deleteStep = useCallback(
    (deletingStep: number) => {
      const updatedSteps = [
        ...steps.slice(0, deletingStep),
        ...steps.slice(deletingStep + 1),
      ]

      setSteps(updatedSteps)
      onChange(updatedSteps)
    },
    [steps, onChange],
  )

  const changeStep = useCallback(
    (value: any, index: number) => {
      const updatedSteps = [
        ...steps.slice(0, index),
        { ...steps[index], ...value },
        ...steps.slice(index + 1),
      ]

      setSteps(updatedSteps)
      onChange(updatedSteps)
    },
    [steps, onChange],
  )

  const moveItem = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const updatedSteps =
        direction === 'up'
          ? [
              ...steps.slice(0, index - 1),
              steps[index],
              steps[index - 1],
              ...steps.slice(index + 1),
            ]
          : [
              ...steps.slice(0, index),
              steps[index + 1],
              steps[index],
              ...steps.slice(index + 2),
            ]

      setSteps(updatedSteps)
      onChange(updatedSteps)
    },
    [steps, onChange],
  )

  useEffect(() => {
    if (value) {
      setSteps(value)
    }
  }, [value])

  return (
    <div>
      <Title
        extra={
          <Button className="py-1 px-2 min-w-max" onClick={addStep}>
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="Добавить"
            />
          </Button>
        }
      >
        {title}
      </Title>

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <Step
            key={index}
            step={step}
            index={index}
            length={steps.length}
            moveItem={moveItem}
            onChange={value => changeStep(value, index)}
            onDelete={() => deleteStep(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(StepsEditor)
