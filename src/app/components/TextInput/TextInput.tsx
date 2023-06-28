'use client'

import { FC, memo, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import Image from 'next/image'

import styles from './TextInput.module.css'

export type TextInputProps = {
  placeholder?: string
  delay?: number
  className?: string
  clear?: boolean
  name?: string
  onChange?: (value: string) => void
}

const TextInput: FC<TextInputProps> = ({
  placeholder = 'Введите текст',
  delay,
  clear,
  className,
  name,
  onChange = () => null,
}) => {
  const [value, setValue] = useState<string>('')
  const [showLoader, setShowLoader] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const handleClear = () => {
    setValue('')
    onChange('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)

    if (delay) {
      setShowLoader(true)
      if (timer) {
        clearTimeout(timer)
      }
      if (value) {
        const handleChangeWithDelay = setTimeout(() => {
          onChange(value)
          setShowLoader(false)
        }, delay)
        setTimer(handleChangeWithDelay)
      } else {
        onChange('')
        setShowLoader(false)
      }
    } else {
      onChange(value)
    }
  }

  return (
    <div className={classNames(className, 'relative')}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full border-b-2 border-black pb-2 outline-none pr-6"
        value={value}
        name={name}
      />

      {showLoader && <div className={styles.loader} />}
      {clear && !showLoader && value && (
        <button onClick={handleClear} className={styles.clear}>
          <Image width={20} height={20} src="/icons/x-mark.svg" alt="X" />
        </button>
      )}
    </div>
  )
}

export default memo(TextInput)
