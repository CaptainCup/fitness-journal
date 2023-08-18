'use client'

import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Container, Image } from '@/components'

import styles from './PageTitle.module.css'

export type PageTitleProps = {
  title: string
  subtitle?: string
  image?: string
  withBack?: boolean
}

const PageTitle: FC<PageTitleProps> = ({
  title,
  subtitle,
  image,
  withBack,
}) => {
  const router = useRouter()

  return (
    <section className="bg-black w-full pt-28 sm:h-80 lg:h-96 mb-5 sm:mb-10 sm:pt-0 overflow-hidden">
      <Container className="h-full">
        <div className="flex h-full justify-between flex-col sm:flex-row">
          <div className="pb-5 sm:pb-10 flex flex-col justify-end">
            {withBack && (
              <button
                onClick={router.back}
                className={classNames(
                  'text-lime-400 w-fit mb-5 pl-16 hover:pl-20 transition-all relative',
                  styles.back,
                )}
              >
                Назад
              </button>
            )}

            <h1 className="text-3xl md:text-5xl text-white">{title}</h1>

            {subtitle && (
              <h2 className="text-xl md:text-2xl text-white mt-5">
                {subtitle}
              </h2>
            )}
          </div>

          {image && (
            <div className="relative h-full aspect-square -mx-5 sm:mx-0 sm:ml-10">
              <Image src={image} alt={title} fill />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default memo(PageTitle)
