'use client'

import { memo, FC, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteList, TrainingCard, Button } from '@/app/components'
import { TrainingService } from '@/app/services-client'

const trainingsApi = new TrainingService()

export type TrainingListViewProps = {
  user: string
  canStartTraining: boolean
}

const TrainingListView: FC<TrainingListViewProps> = ({
  user,
  canStartTraining,
}) => {
  const router = useRouter()

  const createTraining = useCallback(async () => {
    try {
      const newTrainingItem = await trainingsApi.create()
      router.push(`/trainings/${user}/${newTrainingItem._id}/edit`)
    } catch {
      console.log('Произошла ошибка при создании тренировки: ')
    }
  }, [router, user])

  return (
    <div>
      <div className="mb-5 sm:mb-10">
        <div className="flex">
          <Button onClick={createTraining}>Начать тренировку</Button>
        </div>
      </div>

      <div className="mb-5 sm:mb-10">
        <InfiniteList
          pageLimit={8}
          params={{ user }}
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
  )
}

export default memo(TrainingListView)
