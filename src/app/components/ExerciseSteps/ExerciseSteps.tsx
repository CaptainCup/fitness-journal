import React, { FC, Fragment, memo } from 'react'
import { Title, Image } from '@/app/components'

type Step = {
  image: string
  text: string
}

type ExerciseStepsProps = {
  title: string
  steps: Step[]
}

const ExerciseSteps: FC<ExerciseStepsProps> = ({ title, steps }) => {
  return (
    <div>
      <Title>{title}</Title>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5">
        {steps.map(({ image, text }, index) => (
          <Fragment key={text}>
            <div className="relative aspect-square">
              <Image unoptimized alt={`Шаг ${index + 1}`} src={image} fill />
            </div>
            <div className="col-span-1 md:col-span-2 xl:col-span-3 flex items-center ">
              <p className="font-serif">{text}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(ExerciseSteps)
