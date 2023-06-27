'use client';

import { FC, memo, useState, ChangeEvent } from 'react';
import { Button } from '@/app/components';
import Image from 'next/image';

export type ImageUploadProps = {
  id?: string;
  square?: boolean;
};

const ImageUpload: FC<ImageUploadProps> = ({ id = 'image-upload', square }) => {
  const [image, setImage] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file) {
        setImage(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        id={id}
        accept="image/*"
        type="file"
        onChange={handleChange}
        className="hidden"
      />

      {image && (
        <div className="mb-5 w-80 h-80 relative">
          <Image
            fill
            alt="Изображение не загрузилось"
            src={image}
            style={{ objectFit: square ? 'contain' : 'cover' }}
          />
        </div>
      )}

      <div className="w-full">
        <label htmlFor={id}>
          <Button className="inline-block w-full" component="span">{`${
            image ? 'Изменить' : 'Добавить'
          } изображение`}</Button>
        </label>
      </div>
    </div>
  );
};

export default memo(ImageUpload);
