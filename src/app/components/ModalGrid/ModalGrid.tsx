'use client'

import { memo, FC } from 'react'
import { Button, Card, InfiniteListView, Modal } from '@/app/components'

import styles from './ModalGrid.module.css'

export type ModalGridProps = {
  open: boolean
  title: string
  endpoint: 'muscules' | 'exercises' | 'equipment'
  checked: any[]
  onCancel: () => void
  handleCardClick: (value: any) => void
}

const ModalGrid: FC<ModalGridProps> = ({
  open,
  title,
  endpoint = 'muscules',
  checked,
  handleCardClick,
  onCancel,
}) => {
  return (
    <Modal open={open} title={title} onCancel={onCancel}>
      <div className={styles.grid}>
        <InfiniteListView
          withSearch
          endpoint={endpoint}
          renderItem={(item, index) => (
            <Card
              onClick={() => handleCardClick(item)}
              checked={checked.some(
                checkedCard => checkedCard.name === item.name,
              )}
              key={`${item?.name}-${index}`}
              title={item.name}
              img={item.image}
              {...item}
            />
          )}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button onClick={onCancel}>Подтвердить</Button>
      </div>
    </Modal>
  )
}

export default memo(ModalGrid)
