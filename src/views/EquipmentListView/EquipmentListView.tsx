'use client'

import { memo, FC, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteList, Card, TextInput, Button, Image } from '@/components'

export type EquipmentListViewProps = {
  isTrainer?: boolean
}

const EquipmentListView: FC<EquipmentListViewProps> = ({ isTrainer }) => {
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
            onClick={() => router.push('equipment/create')}
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
          endpoint="equipment"
          renderItem={item => (
            <Card
              key={item?._id}
              title={item?.name}
              image={item?.image}
              link={`equipment/${item?._id}`}
              {...(isTrainer
                ? {
                    menu: [
                      {
                        label: 'Редактировать',
                        onClick: () => {
                          router.push(`equipment/${item?._id}/edit`)
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

export default memo(EquipmentListView)
