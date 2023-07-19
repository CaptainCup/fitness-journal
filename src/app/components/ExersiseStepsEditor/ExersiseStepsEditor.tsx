'use client'

import { FC, memo, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, ImageUpload, Textarea, Title } from '@/app/components'

import styles from './ExersiseStepsEditor.module.css'
import classNames from 'classnames'

type Step = {
  image: string
  text: string
}

export type ExersiseStepProps = {
  step: Step
  index: number
  length: number
  moveItem: (index: number, direction: 'up' | 'down') => void
  onChange: (value: any) => void
  onDelete: () => void
}

const ExersiseStep: FC<ExersiseStepProps> = ({
  step,
  index,
  length,
  moveItem,
  onDelete,
  onChange,
}) => {
  return (
    <div className="flex items-center mb-5">
      <div
        className={classNames(
          styles.description,
          'flex flex-col md:flex-row flex-grow items-center h-full mr-5',
        )}
      >
        <div className="mb-5 md:mb-0 md:mr-5 w-full md:w-auto">
          <ImageUpload
            value={step.image}
            onChange={image => onChange({ image })}
            id={`Step ${index}`}
          />
        </div>

        <div className="flex-grow w-full md:w-auto">
          <Textarea
            value={step.text}
            onChange={text => onChange({ text })}
            placeholder="Описание шага"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {index !== 0 && (
          <Button onClick={() => moveItem(index, 'up')} className="mb-2">
            <div className={classNames('relative', styles.up)} />
          </Button>
        )}
        <Button danger className="mb-2 min-w-max" onClick={onDelete}>
          <Image src="/icons/trash.svg" width={20} height={20} alt="Добавить" />
        </Button>
        {index !== length - 1 && (
          <Button onClick={() => moveItem(index, 'down')}>
            <div className={classNames('relative', styles.down)} />
          </Button>
        )}
      </div>
    </div>
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
  const [steps, setSteps] = useState<Step[]>([{ image: '', text: '' }])

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
      <div>
        {steps.map((step, index) => (
          <ExersiseStep
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

export default memo(ExersiseStepsEditor)
