'use client';

import { FC, memo, useState, ChangeEvent } from 'react';
import { Button } from '@/app/components';
import Image from 'next/image';

type ImageUploadProps = {
  id?: string;
};

const ImageUpload: FC<ImageUploadProps> = ({ id = 'image-upload' }) => {
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
    <div>
      <input
        id={id}
        accept="image/*"
        type="file"
        onChange={handleChange}
        className="hidden"
      />

      {image && (
        <div className="mb-5">
          <Image
            width={300}
            height={300}
            alt="Изображение не загрузилось"
            src={image}
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
