'use client'

import { FC, useCallback } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { Image, Popover } from '@/components'

import styles from './Card.module.css'

export type MenuItem = {
  label: string
  danger?: boolean
  onClick: () => void
}

export type CardProps = {
  /**
   * Card title
   */
  title: string

  /**
   * Card background image path
   */
  image?: string

  /**
   * Card link
   */
  link?: string

  /**
   * Checked card state
   */
  checked?: boolean

  /**
   * Card popup menu
   */
  menu?: MenuItem[]

  /**
   * Disabled content
   */
  disabled?: boolean

  /**
   * Custom classname for component
   */
  className?: string

  /**
   * onClick event handler
   */
  onClick?: () => void
}

/**
 * Card to show data
 */
const Card: FC<CardProps> = ({
  title,
  image,
  link,
  checked,
  menu,
  disabled,
  className,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick()
    }
  }, [disabled, onClick])

  const component = (
    <div
      className={classNames(
        className,
        link && styles.card,
        checked && styles.checked,
        onClick && !disabled && 'cursor-pointer',
        'relative aspect-square border-b-4 border-lime-400 transition-all',
      )}
      onClick={handleClick}
    >
      <Image
        className={classNames(disabled && 'grayscale')}
        src={image}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
      />

      {menu && <Popover menu={menu} />}

      <div className="absolute bottom-2 left-2 right-2 md:left-4 md:bottom-4 md:right-4 z-10">
        <h3
          className={classNames(
            link && 'mb-3',
            'text-white text-sm sm:text-base select-none overflow-hidden',
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

export default Card
