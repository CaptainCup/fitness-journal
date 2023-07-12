'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

const EquipmentListView: FC = () => {
  const router = useRouter()

  return (
    <InfiniteListView
      withSearch
      addLink="/equipment/create"
      addCaption="Добавить оборудование"
      endpoint="equipment"
      renderItem={item => (
        <Card
          key={item?._id}
          title={item?.name}
          img={item?.image}
          link={`equipment/${item?._id}`}
          menu={[
            {
              label: 'Редактировать',
              onClick: () => {
                router.push(`equipment/${item?._id}/edit`)
              },
            },
          ]}
          {...item}
        />
      )}
    />
  )
}

export default memo(EquipmentListView)
