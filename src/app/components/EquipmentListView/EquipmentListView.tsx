'use client'

import { memo, FC } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteListView, Card } from '@/app/components'

export type EquipmentListViewProps = {
  isTrainer?: boolean
}

const EquipmentListView: FC<EquipmentListViewProps> = ({ isTrainer }) => {
  const router = useRouter()

  return (
    <InfiniteListView
      withSearch
      {...(isTrainer
        ? { addLink: '/equipment/create', addCaption: 'Добавить оборудование' }
        : {})}
      endpoint="equipment"
      renderItem={item => (
        <Card
          key={item?._id}
          title={item?.name}
          img={item?.image}
          link={`equipment/${item?._id}`}
          {...(isTrainer
            ? {
                menu: [
                  {
                    label: 'Редактировать',
                    onClick: () => {
                      router.push(`equipment/${item?._id}/edit`)
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

export default memo(EquipmentListView)
