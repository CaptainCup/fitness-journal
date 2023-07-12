'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

const UsersListView: FC = () => {
  const router = useRouter()

  return (
    <InfiniteListView
      withSearch
      addLink="/users/create"
      addCaption="Добавить пользователя"
      endpoint="users"
      renderItem={item => (
        <Card
          key={item?._id}
          title={`${item?.firstName ? `${item?.firstName[0]}. ` : ''}${
            item?.lastName
          }`}
          img={item?.avatar}
          link={`/trainings/${item?._id}`}
          menu={[
            {
              label: 'Редактировать',
              onClick: () => {
                router.push(`users/${item?._id}/edit`)
              },
            },
          ]}
          {...item}
        />
      )}
    />
  )
}

export default memo(UsersListView)
