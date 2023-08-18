'use client'

import React, { FC, forwardRef, useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'

export type DefaultCustomInputProps = {
  date: string
  onClick?: () => void
}

const DefaultCustomInput = forwardRef<
  HTMLParagraphElement,
  DefaultCustomInputProps
>(({ date, onClick }, ref) => {
  return (
    <p
      className="border-b-2 border-black cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      {date}
    </p>
  )
})

DefaultCustomInput.displayName = 'DefaultCustomInput'

export type CalendarProps = {
  value?: Date
  includeDates?: Date[]
  inline?: boolean
  fixedHeight?: boolean
  onChange?: (date: Date) => void
}

const Calendar: FC<CalendarProps> = ({
  value,
  includeDates,
  inline,
  fixedHeight,
  onChange = () => null,
}) => {
  const [date, setDate] = useState(new Date())

  const handleChange = useCallback(
    (date: Date) => {
      if (date) {
        setDate(date)
        onChange(date)
      }
    },
    [onChange],
  )

  useEffect(() => {
    if (value) {
      setDate(new Date(value))
    } else {
      setDate(new Date())
    }
  }, [value])

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      includeDates={includeDates}
      inline={inline}
      fixedHeight={fixedHeight}
      locale={ru}
      customInput={
        <DefaultCustomInput date={date.toLocaleDateString('ru-RU')} />
      }
    />
  )
}

export default Calendar
