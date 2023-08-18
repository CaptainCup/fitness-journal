import { FC, memo } from 'react'
import Link from 'next/link'
import { Image } from '@/components'
import classNames from 'classnames'

const imgPath = {
  vk: '/icons/vk.svg',
  telegram: '/icons/telegram.svg',
}

export type SocialLinkProps = {
  social: 'vk' | 'telegram'
  href: string
  className?: string
}

const SocialLink: FC<SocialLinkProps> = ({ social, href, className }) => {
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-center rounded-full bg-lime-400 relative w-10 h-10',
      )}
    >
      <Link href={href}>
        <Image alt="link" src={imgPath[social]} width={32} height={32} />
      </Link>
    </div>
  )
}

export default memo(SocialLink)
