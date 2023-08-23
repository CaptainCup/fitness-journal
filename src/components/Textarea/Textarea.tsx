'use client'

import { FC, useRef, useState, ChangeEvent, useEffect } from 'react'

export type TextareaProps = {
  /**
   * Placeholder component
   */
  placeholder?: string

  /**
   * HTML name
   */
  name?: string

  /**
   * Component value
   */
  value?: string

  /**
   * OnChange handler
   */
  onChange?: (value: string) => void
}

/**
 * Textarea component
 */
const Textarea: FC<TextareaProps> = ({
  placeholder = 'Введите текст',
  name,
  value = '',
  onChange = () => null,
}) => {
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [height, setHeight] = useState<string>()
  const textareaRef = useRef<any>(null)

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setTextareaValue(newValue)

    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`)
    }
    onChange(newValue)
  }

  useEffect(() => {
    setTextareaValue(value)
  }, [value])

  return (
    <textarea
      value={textareaValue}
      ref={textareaRef}
      name={name}
      onChange={handleInput}
      placeholder={placeholder}
      style={{ height }}
      className="w-full border-b-2 border-black pb-2 outline-none overflow-y-hidden"
    />
  )
}

export default Textarea
