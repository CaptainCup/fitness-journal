'use client'

import { memo, FC, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  InfiniteList,
  TrainingCard,
  Button,
  ModalGrid,
  Image,
  ModalCalendar,
  ModalShare,
} from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { ExerciseItem } from '@/app/types'

const trainingsApi = new TrainingService()

export type TrainingListViewProps = {
  user: string
  userName: string
  trainingDates?: Date[]
  canStartTraining: boolean
}

const TrainingListView: FC<TrainingListViewProps> = ({
  user,
  userName,
  trainingDates,
  canStartTraining,
}) => {
  const [modalOpen, setModalOpen] = useState<'QR' | 'search' | 'calendar'>()
  const [exercises, setExercises] = useState<ExerciseItem[]>([])
  const [dateFilter, setDateFilter] = useState<Date>()
  const router = useRouter()

  const closeModals = useCallback(() => {
    setModalOpen(undefined)
  }, [])

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
            <Button
              className="mr-5 w-full flex justify-center items-center"
              onClick={createTraining}
            >
              <Image
                src="/icons/play.svg"
                width={24}
                height={24}
                alt="QR Code"
              />
              <p className="hidden lg:inline ml-2">Начать</p>
            </Button>
          )}

          <Button
            onClick={() => setModalOpen('calendar')}
            className="mr-5 w-full flex justify-center items-center"
          >
            <Image
              src="/icons/calendar.svg"
              width={24}
              height={24}
              alt="Календарь"
            />
            <p className="hidden lg:inline ml-2">Календарь</p>
          </Button>

          <Button
            onClick={() => setModalOpen('search')}
            className="mr-5 w-full flex justify-center items-center"
          >
            <Image src="/icons/filter.svg" width={24} height={24} alt="Поиск" />
            <p className="hidden lg:inline ml-2">Фильтр</p>
          </Button>

          <Button
            onClick={() => setModalOpen('QR')}
            className="w-full flex justify-center items-center"
          >
            <Image
              src="/icons/share.svg"
              width={24}
              height={24}
              alt="QR Code"
            />
            <p className="hidden lg:inline ml-2">Поделиться</p>
          </Button>
        </div>

        {(!!exercises.length || dateFilter) && (
          <div className="mb-5 sm:mb-10">
            {!!exercises.length && (
              <p className="mb-2">
                <span className="text-lime-400">Упражнения:</span>{' '}
                {exercises.map(({ name }) => name).join(', ')}
              </p>
            )}
            {dateFilter && (
              <p>
                <span className="text-lime-400">Дата:</span>{' '}
                {dateFilter?.toLocaleDateString('ru-RU')}
              </p>
            )}
          </div>
        )}

        <div className="mb-5 sm:mb-10">
          <InfiniteList
            pageLimit={8}
            params={{
              user,
              exercises: exercises?.map(({ _id }: { _id: string }) => _id),
              date: dateFilter?.toISOString(),
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
        initialChecked={exercises}
        open={modalOpen === 'search'}
        onClose={closeModals}
        onApply={value => setExercises(value)}
        onCancel={() => setExercises([])}
      />

      <ModalShare
        title={`Тренировки ${userName}`}
        open={modalOpen === 'QR'}
        onClose={closeModals}
      />

      <ModalCalendar
        title="Выберите день"
        open={modalOpen === 'calendar'}
        onClose={closeModals}
        includeDates={trainingDates}
        value={dateFilter}
        onApply={value => setDateFilter(value)}
        onCancel={() => setDateFilter(undefined)}
      />
    </>
  )
}

export default memo(TrainingListView)
