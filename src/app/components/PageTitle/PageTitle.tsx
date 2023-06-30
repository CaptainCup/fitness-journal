'use client'

import React, { FC, memo } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Container, Image } from '@/app/components'

import styles from './PageTitle.module.css'

type PageTitleProps = {
  title: string
  image?: string
  withBack?: boolean
}

const PageTitle: FC<PageTitleProps> = ({ title, image, withBack }) => {
  const router = useRouter()

  return (
    <section className="bg-black w-full pt-28 sm:h-64 lg:h-96 mb-5 sm:mb-10 sm:pt-0 overflow-hidden">
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
            <h1 className="text-3xl sm:text-5xl text-white">{title}</h1>
          </div>

          {image && (
            <div className="relative h-full aspect-square -mx-5 sm:ml-10">
              <Image unoptimized src={image} alt={title} fill />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

export default memo(PageTitle)
