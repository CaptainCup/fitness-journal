'use client'

import { memo, FC, useState, useCallback, useEffect } from 'react'
import { Button, Card, InfiniteList, Modal, TextInput } from '@/app/components'

import styles from './ModalGrid.module.css'
import classNames from 'classnames'

export type ModalGridProps = {
  open: boolean
  title: string
  endpoint: 'muscules' | 'exercises' | 'equipment'
  params?: any
  initialChecked?: any[]
  onApply: (items: any) => void
  onClose: () => void
  onCancel?: () => void
}

const ModalGrid: FC<ModalGridProps> = ({
  open,
  title,
  endpoint = 'muscules',
  params,
  initialChecked,
  onApply,
  onClose,
  onCancel,
}) => {
  const [checked, setChecked] = useState<any[]>([])
  const [search, setSearch] = useState<string>('')

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

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

  const handleApply = useCallback(() => {
    onApply(checked)
    onClose()
  }, [checked, onApply, onClose])

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel()
    }
    onClose()
  }, [onCancel, onClose])

  useEffect(() => {
    if (open) {
      setChecked(initialChecked || [])
      setSearch('')
    }
  }, [open, initialChecked])

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      className="w-full max-w-3xl"
    >
      <div className="mb-5 sm:mb-10">
        <TextInput
          placeholder="Поиск"
          className="w-full flex"
          delay={1500}
          onChange={handleSearch}
          clear
        />
      </div>

      <div className={classNames(styles.grid, 'mb-5 sm:mb-10')}>
        <InfiniteList
          useWindow={false}
          pageLimit={24}
          params={{ search, ...params }}
          endpoint={endpoint}
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
        {onCancel && (
          <Button onClick={handleCancel} className="mr-5">
            Сбросить
          </Button>
        )}
        <Button onClick={handleApply}>Выбрать</Button>
      </div>
    </Modal>
  )
}

export default memo(ModalGrid)
