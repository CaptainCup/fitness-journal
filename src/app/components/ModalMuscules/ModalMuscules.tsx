'use client'

import { memo, FC, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { Button, Card, Modal } from '@/app/components'
import { MusculeArray } from '@/app/types'

import styles from './ModalMuscules.module.css'

export type ModalMusculesProps = {
  open: boolean
  title: string
  exclude?: string[]
  onSuccess: (items: any) => void
  onCancel: () => void
}

const ModalMuscules: FC<ModalMusculesProps> = ({
  open,
  title,
  exclude = [],
  onSuccess,
  onCancel,
}) => {
  const [checked, setChecked] = useState<any[]>([])

  const handleCardClick = useCallback(
    (muscule: any) => {
      const checkedIndex = checked.findIndex(
        ({ value }) => value === muscule.value,
      )

      const updatedChecked =
        checkedIndex === -1
          ? [...checked, muscule]
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
      <div
        className={classNames(
          styles.grid,
          'grid gap-2 md:gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-5',
        )}
      >
        {MusculeArray.filter(({ value }) => !exclude?.includes(value)).map(
          item => (
            <Card
              key={item.value}
              onClick={() => handleCardClick(item)}
              checked={checked?.some(
                checkedMuscule => checkedMuscule.value === item.value,
              )}
              title={item.name}
              img={item.image}
            />
          ),
        )}
      </div>

      <div className="w-full flex justify-center">
        <Button onClick={onOk}>Подтвердить</Button>
      </div>
    </Modal>
  )
}

export default memo(ModalMuscules)