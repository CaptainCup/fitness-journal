'use client'

import { FC, useState, ChangeEvent, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Popover, Image } from '@/components'
import { FilesService } from '@/services-client'
import { baseURL } from '@/utils'

const filesService = new FilesService()

export type ImageUploadProps = {
  /**
   * Unique ID for component
   */
  id?: string

  /**
   * Square image
   */
  square?: boolean

  /**
   * Component value
   */
  value?: string

  /**
   * onChange component handler
   */
  onChange?: (value: string) => void
}

/**
 * Image upload component
 */
const ImageUpload: FC<ImageUploadProps> = ({
  id = 'image-upload',
  square,
  value = '',
  onChange = () => null,
}) => {
  const [image, setImage] = useState<string>('')
  const buttonRef = useRef<any>()

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

  const menu = [
    {
      label: 'Изменить',
      onClick: () => {
        buttonRef.current.click()
      },
    },
    {
      label: 'Удалить',
      onClick: () => {
        setImage('')
        onChange('')
      },
      danger: true,
    },
  ]

  useEffect(() => {
    if (value) {
      setImage(`${baseURL}/${value}`)
    } else {
      setImage('')
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
        <div className="w-80 h-80 relative max-w-full">
          <Image
            fill
            unoptimized
            alt="Изображение не загрузилось"
            src={image}
            style={{ objectFit: square ? 'contain' : 'cover' }}
          />
          <Popover menu={menu} />
        </div>
      )}

      <div className={classNames('w-full', image && 'hidden')}>
        <label htmlFor={id}>
          <span
            ref={buttonRef}
            className="inline-block w-80 max-w-full border-lime-400 bg-lime-400 hover:bg-white hover:text-black py-3 px-4 transition-all border-2 text-center"
          >{`${image ? 'Изменить' : 'Добавить'} изображение`}</span>
        </label>
      </div>
    </div>
  )
}

export default ImageUpload
