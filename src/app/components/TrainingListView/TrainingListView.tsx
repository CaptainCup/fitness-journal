'use client'

import { memo, FC } from 'react'
import { InfiniteListView, TrainingCard } from '@/app/components'

export type TrainingListViewProps = {
  user: string
}

const TrainingListView: FC<TrainingListViewProps> = ({ user }) => {
  return (
    <InfiniteListView
      addLink={`/trainings/${user}/create`}
      addCaption="Начать тренировку"
      endpoint="trainings"
      params={{ user }}
      listClassName="grid grid-cols-1 gap-y-10"
      renderItem={item => (
        <div key={item?._id}>
          <TrainingCard {...item} user={user} />
        </div>
      )}
    />
  )
}

export default memo(TrainingListView)
