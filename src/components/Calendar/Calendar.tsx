'use client'

import React, { FC, useCallback, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import DefaultCustomInput from './DefaultCustomInput'

export type CalendarProps = {
  /**
   * Component value
   */
  value?: Date

  /**
   * Avaible only this dates
   */
  includeDates?: Date[]

  /**
   * Button content
   */
  inline?: boolean

  /**
   * Fixed calendar height
   */
  fixedHeight?: boolean

  /**
   * onChange event handler
   */
  onChange?: (date: Date) => void
}

/**
 * Calendar component
 */
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
