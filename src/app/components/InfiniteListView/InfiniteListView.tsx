'use client'

import { useState, useCallback, FC, memo, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { InfiniteList, Title } from '@/app/components'
import { Button, TextInput } from '@/app/components'
import classNames from 'classnames'

export type InfiniteListViewProps = {
  title?: string
  addLink?: string
  addCaption?: string
  withSearch?: boolean
  endpoint: string
  listClassName?: string
  params?: any
  renderItem: (data: any, index: number) => ReactNode
}

const InfiniteListView: FC<InfiniteListViewProps> = ({
  title,
  addLink,
  addCaption = 'Добавить',
  withSearch,
  endpoint,
  listClassName,
  params,
  renderItem,
}) => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  return (
    <div>
      <div className="mb-5 sm:mb-10">
        <div className="flex">
          {withSearch && (
            <TextInput
              placeholder="Поиск"
              className="w-full flex"
              delay={1500}
              onChange={handleSearch}
              clear
            />
          )}

          {addLink && (
            <Button
              className={classNames(withSearch && addLink && 'ml-2 md:ml-5')}
              onClick={() => router.push(addLink)}
            >
              <Image
                src="/icons/plus.svg"
                width={40}
                height={40}
                alt="Добавить"
                className="block md:hidden"
              />
              <p className="hidden md:inline whitespace-nowrap">{addCaption}</p>
            </Button>
          )}
        </div>
      </div>

      {title && <Title>{title}</Title>}

      <div className="mb-5 sm:mb-10">
        <InfiniteList
          pageLimit={8}
          params={{ search, ...params }}
          endpoint={endpoint}
          listClassName={listClassName}
          renderItem={renderItem}
        />
      </div>
    </div>
  )
}

export default memo(InfiniteListView)
