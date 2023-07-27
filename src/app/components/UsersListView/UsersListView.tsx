'use client'

import { memo, FC, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteList, Card, TextInput, Button, Image } from '@/app/components'

export type UsersListViewProps = {
  isTrainer?: boolean
}

const UsersListView: FC<UsersListViewProps> = ({ isTrainer }) => {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  return (
    <div>
      <div className="mb-5 sm:mb-10">
        <div className="flex">
          <TextInput
            placeholder="Поиск"
            className="w-full flex"
            delay={1500}
            onChange={handleSearch}
            clear
          />
        </div>
      </div>

      {isTrainer && (
        <div className="mb-5 sm:mb-10 flex">
          <Button
            onClick={() => router.push('users/create')}
            className="w-full flex justify-center items-center"
          >
            <Image
              src="/icons/plus.svg"
              width={24}
              height={24}
              alt="Добавить"
            />
            <p className="hidden lg:inline ml-2">Добавить</p>
          </Button>
        </div>
      )}

      {search && (
        <div className="mb-5 sm:mb-10">
          <p>
            <span className="text-lime-400">Поиск:</span> {search}
          </p>
        </div>
      )}

      <div className="mb-5 sm:mb-10">
        <InfiniteList
          pageLimit={24}
          params={{
            search,
          }}
          endpoint="users"
          renderItem={item => (
            <Card
              key={item?._id}
              title={`${item?.firstName ? `${item?.firstName[0]}. ` : ''}${
                item?.lastName
              }`}
              image={item?.avatar}
              link={`/trainings/${item?._id}`}
              {...(isTrainer
                ? {
                    menu: [
                      {
                        label: 'Редактировать',
                        onClick: () => {
                          router.push(`users/${item?._id}/edit`)
                        },
                      },
                    ],
                  }
                : {})}
              {...item}
            />
          )}
        />
      </div>
    </div>
  )
}

export default memo(UsersListView)
