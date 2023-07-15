'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

export type ExercisesListViewProps = {
  isTrainer?: boolean
}

const ExercisesListView: FC<ExercisesListViewProps> = ({ isTrainer }) => {
  const router = useRouter()

  return (
    <InfiniteListView
      withSearch
      {...(isTrainer
        ? { addLink: '/exercises/create', addCaption: 'Добавить упражнение' }
        : {})}
      endpoint="exercises"
      renderItem={item => (
        <Card
          key={item?._id}
          title={item?.name}
          img={item?.image}
          link={`exercises/${item?._id}`}
          {...(isTrainer
            ? {
                menu: [
                  {
                    label: 'Редактировать',
                    onClick: () => {
                      router.push(`exercises/${item?._id}/edit`)
                    },
                  },
                ],
              }
            : {})}
          {...item}
        />
      )}
    />
  )
}

export default memo(ExercisesListView)
