'use client';

import { FC, memo } from 'react';

type TextInputProps = {
  placeholder?: string;
};

const TextInput: FC<TextInputProps> = ({ placeholder = 'Введите текст' }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border-b-2 border-black pb-2 outline-none"
    />
  );
};

export default memo(TextInput);
