'use client'

import { FC, memo, useCallback, useState, useEffect } from 'react'
import { Button, Calendar, Modal } from '@/app/components'
import { CalendarProps } from '@/app/components/Calendar/Calendar'

export type ModalCalendarProps = {
  title: string
  open: boolean
  onClose: () => void
  onCancel: () => void
  onApply: (value: Date | undefined) => void
} & CalendarProps

const ModalCalendar: FC<ModalCalendarProps> = ({
  title,
  open,
  value,
  onClose,
  onCancel,
  onApply,
  ...props
}) => {
  const [date, setDate] = useState<Date>()

  const handleChange = useCallback((value: Date) => setDate(value), [])

  const handleApply = useCallback(() => {
    onApply(date)
    onClose()
  }, [date, onApply, onClose])

  const handleCancel = useCallback(() => {
    onCancel()
    onClose()
  }, [onCancel, onClose])

  useEffect(() => {
    if (value) {
      setDate(new Date(value))
    } else {
      setDate(new Date())
    }
  }, [value])

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mb-5">
          <Calendar
            inline
            fixedHeight
            value={date}
            onChange={handleChange}
            {...props}
          />
        </div>
        <div className="flex">
          <Button onClick={handleCancel} className="mr-5">
            Сбросить
          </Button>
          <Button onClick={handleApply}>Выбрать</Button>
        </div>
      </div>
    </Modal>
  )
}

export default memo(ModalCalendar)
