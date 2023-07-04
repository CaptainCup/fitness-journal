'use client'

import { memo, FC } from 'react'
import { InfiniteListView, Card } from '@/app/components'

const EquipmentView: FC = () => {
  return (
    <InfiniteListView
      withSearch
      addLink="/equipment/create"
      addCaption="Добавить оборудование"
      endpoint="equipment"
      renderItem={item => (
        <Card
          key={item?._id}
          title={item.name}
          img={item.image}
          link={`equipment/${item._id}`}
          {...item}
        />
      )}
    />
  )
}

export default memo(EquipmentView)
