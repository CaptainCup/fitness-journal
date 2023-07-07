'use client'

import { memo, FC } from 'react'
import { InfiniteListView, Card } from '@/app/components'

const UsersListView: FC = () => {
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
          img={item.avatar}
          link={`users/${item._id}`}
          {...item}
        />
      )}
    />
  )
}

export default memo(UsersListView)
