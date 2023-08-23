'use client'

import { FC, useState, Fragment, useEffect, useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { Listbox, Transition } from '@headlessui/react'

import styles from './Select.module.css'

export type Option = {
  label: string
  value: any
  danger?: boolean
}

export type SelectProps = {
  /**
   * Component value
   */
  value?: any

  /**
   * Component options
   */
  options: Option[]

  /**
   * Component custom classname
   */
  className?: string

  /**
   * Placeholder
   */
  placeholder?: string

  /**
   * OnChange component handler
   */
  onChange?: (value: any) => void
}

/**
 * Select component
 */
const Select: FC<SelectProps> = ({
  value,
  options,
  className,
  placeholder = 'Выберите значение',
  onChange = () => null,
}) => {
  const [selected, setSelected] = useState(null)

  const handleChange = useCallback(
    (value: any) => {
      setSelected(value)
      onChange(value)
    },
    [onChange],
  )

  const label = useMemo(
    () =>
      selected
        ? options.find(({ value }) => value === selected)?.label
        : placeholder,
    [selected, placeholder, options],
  )

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
  }, [value])

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className={classNames(className, 'relative')}>
        <Listbox.Button className="border-b-4 border-lime-400 w-full  relative h-12">
          {label}
          <div className={styles.arrow} />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full bg-black focus:outline-none border-b-4 border-lime-400 text-center z-10">
            {options.map(({ value, label, danger }) => (
              <Listbox.Option
                key={value}
                value={value}
                className="cursor-default select-none p-2"
              >
                {({ selected, active }) => (
                  <span
                    className={classNames(
                      'transition-all cursor-pointer hover:text-lime-400',
                      danger && 'text-red-500',
                      (selected || active) && 'text-lime-400',
                      !danger && !(selected || active) && 'text-white',
                    )}
                  >
                    {label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Select
