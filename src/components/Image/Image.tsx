import { FC, useMemo } from 'react'
import { default as NextImage, ImageProps as NextImageProps } from 'next/image'
import { baseURL } from '@/utils'

export type ImageProps = { src?: string } & Omit<NextImageProps, 'src'>

/**
 * Next Image component with some source handlers
 */
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

export default Image
