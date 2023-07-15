'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

export type UsersListViewProps = {
  isTrainer?: boolean
}

const UsersListView: FC<UsersListViewProps> = ({ isTrainer }) => {
  const router = useRouter()

  return (
    <InfiniteListView
      withSearch
      {...(isTrainer
        ? { addLink: '/users/create', addCaption: 'Добавить пользователя' }
        : {})}
      endpoint="users"
      renderItem={item => (
        <Card
          key={item?._id}
          title={`${item?.firstName ? `${item?.firstName[0]}. ` : ''}${
            item?.lastName
          }`}
          img={item?.avatar}
          link={`/trainings/${item?._id}`}
          {...(isTrainer
            ? {
                menu: [
                  {
                    label: 'Редактировать',
                    onClick: () => {
                      router.push(`users/${item?._id}/edit`)
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

export default memo(UsersListView)
