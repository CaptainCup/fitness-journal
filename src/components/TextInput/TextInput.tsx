'use client'

import { FC, memo, useState, ChangeEvent, useEffect } from 'react'
import classNames from 'classnames'
import { Image } from '@/components'

import styles from './TextInput.module.css'

export type TextInputProps = {
  placeholder?: string
  delay?: number
  className?: string
  clear?: boolean
  name?: string
  value?: string
  error?: boolean
  onChange?: (value: string) => void
}

const TextInput: FC<TextInputProps> = ({
  placeholder = 'Введите текст',
  delay,
  clear,
  className,
  name,
  value,
  error,
  onChange = () => null,
}) => {
  const [textInputValue, setTextInputValue] = useState<string>('')
  const [showLoader, setShowLoader] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const handleClear = () => {
    setTextInputValue('')
    onChange('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setTextInputValue(newValue)

    if (delay) {
      setShowLoader(true)
      if (timer) {
        clearTimeout(timer)
      }
      if (newValue) {
        const handleChangeWithDelay = setTimeout(() => {
          onChange(newValue)
          setShowLoader(false)
        }, delay)
        setTimer(handleChangeWithDelay)
      } else {
        onChange('')
        setShowLoader(false)
      }
    } else {
      onChange(newValue)
    }
  }

  useEffect(() => {
    if (value) {
      setTextInputValue(value)
    }
  }, [value])

  return (
    <div className={classNames(className, 'relative')}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className={classNames(
          'w-full border-b-2 pb-2 outline-none pr-6 transition-all',
          error ? 'border-red-500 placeholder:text-red-500' : 'border-black',
        )}
        value={textInputValue}
        name={name}
      />

      {showLoader && <div className={styles.loader} />}

      {clear && !showLoader && textInputValue && (
        <button onClick={handleClear} className={styles.clear}>
          <Image
            className="rotate-45 translate-y-0.5"
            src="/icons/plus.svg"
            width={20}
            height={20}
            alt="Очистить"
          />
        </button>
      )}
    </div>
  )
}

export default memo(TextInput)
