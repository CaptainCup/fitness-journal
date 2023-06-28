'use client'

import { FC, memo, useRef, useState, ChangeEvent } from 'react'

export type TextareaProps = {
  placeholder?: string
  name?: string
  onChange?: (value: ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<TextareaProps> = ({
  placeholder = 'Введите текст',
  name,
  onChange = () => null,
}) => {
  const [height, setHeight] = useState<string>()
  const textareaRef = useRef<any>(null)

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`)
    }
    onChange(e)
  }

  return (
    <textarea
      ref={textareaRef}
      name={name}
      onChange={handleInput}
      placeholder={placeholder}
      style={{ height }}
      className="w-full border-b-2 border-black pb-2 outline-none overflow-y-hidden"
    />
  )
}

export default memo(Textarea)
