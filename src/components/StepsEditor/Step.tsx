'use client'

import { FC, memo } from 'react'
import classNames from 'classnames'
import { Button, ImageUpload, Textarea, Image } from '@/components'

import styles from './Step.module.css'

export type StepType = {
  image: string
  text: string
}

export type StepProps = {
  step: StepType
  index: number
  length: number
  moveItem: (index: number, direction: 'up' | 'down') => void
  onChange: (value: any) => void
  onDelete: () => void
}

const Step: FC<StepProps> = ({
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

export default memo(Step)
