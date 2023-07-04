'use client'

import {
  FC,
  memo,
  useState,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import classNames from 'classnames'
import { Listbox, Transition } from '@headlessui/react'

import styles from './Select.module.css'

export type Option = {
  label: string
  value: any
}

export type SelectProps = {
  value?: any
  options: Option[]
  className?: string
  placeholder?: string
  onChange?: (value: any) => void
}

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
            {options.map(option => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="cursor-default select-none p-2"
              >
                {({ selected, active }) => (
                  <span
                    className={classNames(
                      'transition-all',
                      selected || active ? 'text-lime-400' : 'text-white',
                    )}
                  >
                    {option.label}
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

export default memo(Select)
