'use client'

import { FC, memo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { Image, Popover } from '@/app/components'

import styles from './Card.module.css'

type MenuItem = {
  label: string
  danger?: boolean
  onClick: () => void
}

export type CardProps = {
  title: string
  img?: string
  link?: string
  checked?: boolean
  menu?: MenuItem[]
  onClick?: () => void
}

const Card: FC<CardProps> = ({ title, img, link, checked, menu, onClick }) => {
  const component = (
    <div
      className={classNames(
        link && styles.card,
        checked && styles.checked,
        'relative aspect-square border-b-4 border-lime-400 transition-all',
      )}
      onClick={onClick}
    >
      <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />

      {menu && <Popover menu={menu} />}

      <div className="absolute bottom-2 left-2 right-2 md:left-4 md:bottom-4 md:right-4 z-10">
        <h3
          className={classNames(
            link && 'mb-3',
            'text-white text-sm sm:text-base select-none',
          )}
        >
          {title}
        </h3>
        {link && <div className={styles.arrow} />}
      </div>

      <div
        className={classNames(
          'absolute bottom-0 left-0 right-0 opacity-40 transition-all',
          checked
            ? 'h-full bg-black'
            : 'h-20 bg-gradient-to-b from-transparent to-black',
        )}
      />
    </div>
  )

  return link ? <Link href={link}>{component}</Link> : component
}

export default memo(Card)
