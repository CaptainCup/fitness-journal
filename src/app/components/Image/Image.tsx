import { FC, memo, useMemo } from 'react'
import { default as NextImage, ImageProps as NextImageProps } from 'next/image'
import { baseURL } from '@/app/utils'

export type ImageProps = { src?: string } & Omit<NextImageProps, 'src'>

const Image: FC<ImageProps> = ({ src, ...props }) => {
  const imageSrc = useMemo(() => {
    if (!src) {
      return '/images/logo-in-black.png'
    }
    if (src.startsWith('api')) {
      return `${baseURL}/${src}`
    }
    return src
  }, [src])

  return (
    <NextImage
      {...props}
      unoptimized
      src={imageSrc}
      style={{ objectFit: 'cover' }}
    />
  )
}

export default memo(Image)
