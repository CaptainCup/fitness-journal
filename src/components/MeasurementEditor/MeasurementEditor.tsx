'use client'

import { FC, memo, useCallback, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Title, Button, Select, Image } from '@/components'
import { MeasurementLabel } from '@/types'

const options = [
  ...Object.entries(MeasurementLabel).map(([value, label]) => ({
    label,
    value,
  })),
  { label: 'Удалить', value: 'delete', danger: true },
]

export type MeasurementEditorProps = {
  title: string
  value?: string[]
  error?: boolean
  onChange?: (value: string[]) => void
}

const MeasurementEditor: FC<MeasurementEditorProps> = ({
  title,
  value,
  error,
  onChange = () => null,
}) => {
  const [measurements, setMeasurements] = useState<string[]>([])

  const addMeasurement = useCallback(() => {
    const updatedMeasurements = [...measurements, '']
    onChange(updatedMeasurements)
    setMeasurements(updatedMeasurements)
  }, [measurements, onChange])

  const handleChange = useCallback(
    (value: string, index: number) => {
      const updatedMeasurements =
        value === 'delete'
          ? [...measurements.slice(0, index), ...measurements.slice(index + 1)]
          : [
              ...measurements.slice(0, index),
              value,
              ...measurements.slice(index + 1),
            ]
      onChange(updatedMeasurements)
      setMeasurements(updatedMeasurements)
    },
    [measurements, onChange],
  )

  useEffect(() => {
    if (value) {
      setMeasurements(value)
    }
  }, [value])

  return (
    <div>
      <Title
        error={error}
        extra={
          <Button className="py-1 px-2" onClick={addMeasurement}>
            <Image
              src="/icons/plus.svg"
              width={20}
              height={20}
              alt="Добавить"
            />
          </Button>
        }
      >
        {title}
      </Title>
      <div className="flex flex-col sm:flex-row">
        {measurements.map((measurement, index) => (
          <Select
            key={index}
            value={measurement}
            options={options}
            className={classNames(
              'w-full',
              index < measurements.length - 1 && 'mb-5 sm:mb-0 sm:mr-5',
            )}
            onChange={value => handleChange(value, index)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(MeasurementEditor)
