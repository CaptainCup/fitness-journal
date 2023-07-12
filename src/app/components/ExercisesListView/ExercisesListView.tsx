'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

const ExercisesListView: FC = () => {
  const router = useRouter()

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
          menu={[
            {
              label: 'Редактировать',
              onClick: () => {
                router.push(`exercises/${item?._id}/edit`)
              },
            },
          ]}
          {...item}
        />
      )}
    />
  )
}

export default memo(ExercisesListView)
