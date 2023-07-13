'use client'

import { memo, FC, useState, useCallback, useEffect } from 'react'
import { Button, Card, InfiniteListView, Modal } from '@/app/components'

import styles from './ModalGrid.module.css'

export type ModalGridProps = {
  open: boolean
  title: string
  endpoint: 'muscules' | 'exercises' | 'equipment'
  params?: any
  onSuccess: (items: any) => void
  onCancel: () => void
}

const ModalGrid: FC<ModalGridProps> = ({
  open,
  title,
  endpoint = 'muscules',
  params,
  onSuccess,
  onCancel,
}) => {
  const [checked, setChecked] = useState<any[]>([])

  const handleCardClick = useCallback(
    (item: any) => {
      const checkedIndex = checked.findIndex(({ _id }) => _id === item._id)

      const updatedChecked =
        checkedIndex === -1
          ? [...checked, item]
          : [
              ...checked.slice(0, checkedIndex),
              ...checked.slice(checkedIndex + 1),
            ]

      setChecked(updatedChecked)
    },
    [checked],
  )

  const onOk = useCallback(() => {
    onSuccess(checked)
    onCancel()
  }, [checked, onSuccess, onCancel])

  useEffect(() => {
    if (open) {
      setChecked([])
    }
  }, [open])

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      className="w-full max-w-3xl"
    >
      <div className={styles.grid}>
        <InfiniteListView
          withSearch
          endpoint={endpoint}
          params={params}
          renderItem={item => (
            <Card
              key={item._id}
              onClick={() => handleCardClick(item)}
              checked={checked?.some(
                checkedCard => checkedCard._id === item._id,
              )}
              title={item.name}
              img={item.image}
              {...item}
            />
          )}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button onClick={onOk}>Подтвердить</Button>
      </div>
    </Modal>
  )
}

export default memo(ModalGrid)
