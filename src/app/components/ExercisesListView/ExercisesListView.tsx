'use client'

import { memo, FC } from 'react'
import { InfiniteListView, Card } from '@/app/components'

const ExercisesListView: FC = () => {
  return (
    <InfiniteListView
      withSearch
      addLink="/exercises/create"
      addCaption="Добавить упражнение"
      endpoint="exercises"
      renderItem={item => (
        <Card
          key={item?._id}
          title={item?.name}
          img={item?.image}
          link={`exercises/${item?._id}`}
          {...item}
        />
      )}
    />
  )
}

export default memo(ExercisesListView)
