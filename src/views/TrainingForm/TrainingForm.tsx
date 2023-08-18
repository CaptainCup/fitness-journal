'use client'

import { FC, memo, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Calendar } from '@/components'
import { TrainingCardEditor } from '@/views'
import { TrainingService } from '@/services-client'
import { ExercisesRecord, TrainingItem } from '@/types'

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

        const handleAutosave = setTimeout(formik.handleSubmit, 2000)

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

  return (
    <form>
      <div className="mb-5 sm:mb-10 flex">
        <p className="mr-5">Дата тренировки:</p>
        <Calendar
          value={formik.values.date}
          onChange={value => handleChangeField('date', value)}
        />
      </div>

      <div className="mb-5 sm:mb-10">
        <TrainingCardEditor
          user={user}
          value={formik.values.exercises}
          onChange={value => handleChangeField('exercises', value)}
        />
      </div>

      <div className="mb-5 sm:mb-10 flex">
        {!autosave && (
          <Button
            className="mr-5"
            onClick={() => {
              router.back()
            }}
          >
            Назад
          </Button>
        )}
        <Button onClick={handleSubmit}>
          {autosave ? 'Закончить тренировку' : 'Сохранить изменения'}
        </Button>
      </div>
    </form>
  )
}

export default memo(TrainingForm)
