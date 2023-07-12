'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, TrainingCardEditor } from '@/app/components'
import { TrainingService } from '@/app/services'
import { ExercisesRecord, TrainingItem } from '@/app/services/TrainingService'

const trainingsApi = new TrainingService()

export type TrainingFormProps = {
  user: string
  initialData?: TrainingItem
}

const TrainingForm: FC<TrainingFormProps> = ({
  user,
  initialData = { exercises: [], date: null, _id: '' },
}) => {
  const router = useRouter()

  const { exercises, date, _id } = initialData

  const formik = useFormik({
    initialValues: {
      exercises,
    },
    onSubmit: ({ exercises }) => {
      const transformedExercises = exercises?.map(
        ({ exercise, approaches }: ExercisesRecord) => ({
          exercise: exercise._id,
          approaches: approaches?.filter((approache: string[]) =>
            approache.every((value: string) => value),
          ),
        }),
      )

      const res = {
        exercises: transformedExercises,
        date: date || new Date(),
        user,
      }

      if (_id) {
        trainingsApi.update(_id, res)
      } else {
        trainingsApi.create(res)
      }

      router.push(`/trainings/${user}`)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-5 sm:mb-10">
        <TrainingCardEditor
          value={exercises}
          onChange={value => formik.setFieldValue('exercises', value)}
        />
      </div>

      <div className="mb-5 sm:mb-10">
        <Button type="submit">Закончить тренировку</Button>
      </div>
    </form>
  )
}

export default memo(TrainingForm)
