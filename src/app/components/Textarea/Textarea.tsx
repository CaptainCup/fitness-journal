'use client';

import { FC, memo, useRef, useState } from 'react';

type TextareaProps = {
  placeholder?: string;
};

const Textarea: FC<TextareaProps> = ({ placeholder = 'Введите текст' }) => {
  const [height, setHeight] = useState<string>();
  const textareaRef = useRef<any>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleInput}
      placeholder={placeholder}
      style={{ height }}
      className="w-full border-b-2 border-black pb-2 outline-none overflow-y-hidden"
    />
  );
};

export default memo(Textarea);
