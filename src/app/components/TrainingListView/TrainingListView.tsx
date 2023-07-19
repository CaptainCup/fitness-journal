'use client'

import { memo, FC, useCallback, useState } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import {
  InfiniteList,
  TrainingCard,
  Button,
  ModalGrid,
  Image,
  QRcode,
} from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { ExerciseItem } from '@/app/types'

const trainingsApi = new TrainingService()

export type TrainingListViewProps = {
  user: string
  canStartTraining: boolean
}

const TrainingListView: FC<TrainingListViewProps> = ({
  user,
  canStartTraining,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [exercises, setExercises] = useState<ExerciseItem[]>([])
  const router = useRouter()

  const handleModalToggle = useCallback(() => setModalOpen(draft => !draft), [])

  const handleModalSuccess = useCallback(
    (searchExercises: ExerciseItem[]) => {
      const updatedExercises = [...exercises, ...searchExercises]
      setExercises(updatedExercises)
    },
    [exercises],
  )

  const handleDeleteExercise = useCallback(
    (id: string) => {
      const updatedExercises = exercises.filter(({ _id }) => _id !== id)
      setExercises(updatedExercises)
    },
    [exercises],
  )

  const createTraining = useCallback(async () => {
    try {
      const newTrainingItem = await trainingsApi.create({ user })
      router.push(`/trainings/${user}/${newTrainingItem._id}/edit`)
    } catch (error) {
      console.log(`Произошла ошибка при создании тренировки: ${error}`)
    }
  }, [router, user])

  return (
    <>
      <div>
        <div className="mb-5 sm:mb-10 flex">
          {canStartTraining && (
            <Button className="w-full mr-5 sm:w-auto" onClick={createTraining}>
              Начать тренировку
            </Button>
          )}
          <QRcode buttonClassName="w-full sm:w-auto" title="Тренировки" />
        </div>

        <div className="mb-5 sm:mb-10">
          <div
            className={classNames(
              'flex flex-wrap items-center w-full sm:w-auto',
              exercises.length
                ? 'justify-start'
                : ' justify-between sm:justify-start',
            )}
          >
            <p className="mr-5 mb-2">Поиск по упражнению: </p>
            {exercises.map(({ _id, name }) => (
              <Button
                className="mr-2 mb-2 flex items-center"
                key={_id}
                onClick={() => handleDeleteExercise(_id)}
              >
                <p className="mr-2">{name}</p>
                <Image
                  className="rotate-45 translate-y-0.5"
                  src="/icons/plus.svg"
                  width={20}
                  height={20}
                  alt="Удалить"
                />
              </Button>
            ))}
            <Button className="mb-2" onClick={handleModalToggle}>
              <Image
                src="/icons/plus.svg"
                width={24}
                height={24}
                alt="Добавить"
              />
            </Button>
          </div>
        </div>

        <div className="mb-5 sm:mb-10">
          <InfiniteList
            pageLimit={8}
            params={{
              user,
              exercises: exercises?.map(({ _id }: { _id: string }) => _id),
            }}
            endpoint="trainings"
            listClassName="grid grid-cols-1 gap-y-10"
            renderItem={item => (
              <div key={item?._id}>
                <TrainingCard
                  {...item}
                  canStartTraining={canStartTraining}
                  user={user}
                />
              </div>
            )}
          />
        </div>
      </div>

      <ModalGrid
        title="Выберите упражнения"
        endpoint="exercises"
        params={{ exclude: exercises.map(({ _id }: { _id: string }) => _id) }}
        open={modalOpen}
        onCancel={handleModalToggle}
        onSuccess={handleModalSuccess}
      />
    </>
  )
}

export default memo(TrainingListView)
