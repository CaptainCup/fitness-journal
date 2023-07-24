import { FC, memo } from 'react'
import Link from 'next/link'
import { Button, Image } from '@/app/components'

export type MainPageCardProps = {
  title: string
  description: string
  attentionText?: string
  href?: string
  image: string
}

const MainPageCard: FC<MainPageCardProps> = ({
  title,
  description,
  attentionText,
  href,
  image,
}) => {
  return (
    <div className="w-full relative h-96 min-h-max p-5 flex flex-col justify-end">
      <Image
        src={image}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
        className="-z-10"
      />

      <h3 className="text-white text-xl sm:text-3xl mb-5">{title}</h3>
      <p className="text-white text-sm sm:text-base mb-5">{description}</p>

      {attentionText && (
        <p className="text-lime-400 text-sm sm:text-base mb-5">
          {attentionText}
        </p>
      )}

      {href && (
        <Link href={href}>
          <Button>Перейти</Button>
        </Link>
      )}

      <div className="absolute bottom-0 left-0 right-0 opacity-40 h-48 bg-gradient-to-b from-transparent to-black -z-10" />
    </div>
  )
}

export default memo(MainPageCard)
