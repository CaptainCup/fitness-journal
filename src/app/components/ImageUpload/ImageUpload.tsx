'use client'

import { FC, memo, useState, ChangeEvent, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/app/components'
import { FilesService } from '@/app/services'

const filesService = new FilesService()

const baseURL = 'http://localhost:4000/'

export type ImageUploadProps = {
  id?: string
  square?: boolean
  value?: string
  onChange?: (value: string) => void
}

const ImageUpload: FC<ImageUploadProps> = ({
  id = 'image-upload',
  square,
  value,
  onChange = () => null,
}) => {
  const [image, setImage] = useState<string>()

  const loadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      await filesService
        .upload(file)
        .then((res: string) => {
          setImage(URL.createObjectURL(file))
          onChange(res)
        })
        .catch(() => {
          console.log('Ошибка при загрузке картинки')
        })
    }
  }

  useEffect(() => {
    if (value) {
      setImage(`${baseURL}${value}`)
    }
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <input
        id={id}
        accept="image/*"
        type="file"
        onChange={loadImg}
        className="hidden"
      />

      {image && (
        <div className="mb-5 w-80 h-80 relative">
          <Image
            fill
            unoptimized
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
  )
}

export default memo(ImageUpload)
