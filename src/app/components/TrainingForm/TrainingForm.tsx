'use client'

import { FC, memo, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Calendar, TrainingCardEditor } from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { ExercisesRecord, TrainingItem } from '@/app/types'

const trainingsApi = new TrainingService()

export type TrainingFormProps = {
  user: string
  autosave?: boolean
  initialData?: TrainingItem
}

const TrainingForm: FC<TrainingFormProps> = ({
  user,
  autosave,
  initialData = { exercises: [], date: new Date(), _id: '' },
}) => {
  const { exercises, date, _id } = initialData

  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [trainingId, setTrainingId] = useState<string>(_id)

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      exercises,
      date,
    },
    onSubmit: async ({ exercises, date }) => {
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
        date,
        user,
      }

      if (!trainingId) {
        const newTrainingItem = await trainingsApi.create(res)
        setTrainingId(newTrainingItem._id)
      } else {
        trainingsApi.update(trainingId, res)
      }
    },
  })

  const handleChangeField = useCallback(
    (field: string, value: any) => {
      formik.setFieldValue(field, value)

      if (autosave) {
        if (timer) {
          clearTimeout(timer)
        }

        const handleAutosave = setTimeout(() => {
          console.log('autosaved')
          formik.handleSubmit()
        }, 2000)

        setTimer(handleAutosave)
      }
    },
    [formik, timer, autosave],
  )

  const handleSubmit = useCallback(async () => {
    if (timer) {
      clearTimeout(timer)
    }

    await formik.handleSubmit()
    router.push(`/trainings/${user}`)
  }, [timer, formik, router, user])

  console.log('trainingId: ', trainingId)

  return (
    <form>
      <div className="mb-5 sm:mb-10">
        <Calendar
          value={formik.values.date}
          onChange={value => handleChangeField('date', value)}
          label="Дата тренировки:"
        />
      </div>

      <div className="mb-5 sm:mb-10">
        <TrainingCardEditor
          value={formik.values.exercises}
          onChange={value => handleChangeField('exercises', value)}
        />
      </div>

      <div className="mb-5 sm:mb-10">
        <Button onClick={handleSubmit}>Закончить тренировку</Button>
      </div>
    </form>
  )
}

export default memo(TrainingForm)
