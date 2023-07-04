'use client'

import { useState, useCallback, FC, memo, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { InfiniteList, Title, Card } from '@/app/components'
import { Button, TextInput } from '@/app/components'

export type CardsGridProps = {
  title?: string
  addLink?: string
  addCaption?: string
  withSearch?: boolean
  endpoint: string
  renderItem: (data: any, index: number) => ReactNode
}

const InfiniteListView: FC<CardsGridProps> = ({
  title,
  addLink,
  addCaption = 'Добавить',
  withSearch,
  endpoint,
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
              className="w-full flex mr-2 lg:mr-5"
              delay={1500}
              onChange={handleSearch}
              clear
            />
          )}

          {addLink && (
            <Button onClick={() => router.push(addLink)}>
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
          params={{ search }}
          endpoint={endpoint}
          renderItem={renderItem}
        />
      </div>
    </div>
  )
}

export default memo(InfiniteListView)
