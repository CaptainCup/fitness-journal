'use client'

import { FC, memo, Fragment } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { Image } from '@/app/components'

import styles from './Card.module.css'

type MenuItem = {
  label: string
  danger?: boolean
  onClick: () => void
}

export type CardProps = {
  _id: string
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
    >
      <Image
        onClick={onClick}
        src={img}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
      />

      {menu && (
        <Popover className="relative">
          {() => (
            <>
              <Popover.Button className="absolute p-4 top-0 right-0">
                <div className="w-1 h-1 bg-lime-400 mb-1" />
                <div className="w-1 h-1 bg-lime-400 mb-1" />
                <div className="w-1 h-1 bg-lime-400 " />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 top-0 z-10">
                  <div className="relative bg-black border-b-4 border-lime-400 p-5 pb-0">
                    {menu.map(({ label, danger, onClick }) => (
                      <div
                        key={label}
                        className="mb-5"
                        onClick={e => {
                          e.preventDefault()
                          onClick()
                        }}
                      >
                        <p
                          className={classNames(
                            danger ? 'text-red-600' : 'text-white',
                            ' hover:text-lime-400 transition-all',
                          )}
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      )}

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
