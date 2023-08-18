'use client'

import { memo, FC, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { InfiniteList, Card, TextInput, Button, Image } from '@/components'
import { ModalMuscules } from '@/modals'
import { Muscule } from '@/types'

export type ExercisesListViewProps = {
  isTrainer?: boolean
}

const ExercisesListView: FC<ExercisesListViewProps> = ({ isTrainer }) => {
  const [search, setSearch] = useState<string>('')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [muscules, setMuscules] = useState<any[]>([])
  const router = useRouter()

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleModalToggle = useCallback(() => setModalOpen(draft => !draft), [])

  return (
    <>
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

        <div className="mb-5 sm:mb-10 flex">
          {isTrainer && (
            <Button
              onClick={() => router.push('exercises/create')}
              className="mr-2 lg:mr-5 w-full flex justify-center items-center"
            >
              <Image
                src="/icons/plus.svg"
                width={24}
                height={24}
                alt="Добавить"
              />
              <p className="hidden lg:inline ml-2">Добавить</p>
            </Button>
          )}

          <Button
            onClick={handleModalToggle}
            className="w-full flex justify-center items-center"
          >
            <Image src="/icons/filter.svg" width={24} height={24} alt="Поиск" />
            <p className="hidden lg:inline ml-2">Фильтр</p>
          </Button>
        </div>

        {(!!muscules.length || search) && (
          <div className="mb-5 sm:mb-10">
            {!!muscules.length && (
              <p className="mb-2">
                <span className="text-lime-400">Мышцы:</span>{' '}
                {muscules.map(({ name }) => name).join(', ')}
              </p>
            )}
            {search && (
              <p>
                <span className="text-lime-400">Поиск:</span> {search}
              </p>
            )}
          </div>
        )}

        <div className="mb-5 sm:mb-10">
          <InfiniteList
            pageLimit={24}
            params={{
              search,
              muscules: muscules?.map(({ value }: { value: Muscule }) => value),
            }}
            endpoint="exercises"
            renderItem={item => (
              <Card
                key={item?._id}
                title={item?.name}
                image={item?.image}
                link={`exercises/${item?._id}`}
                {...(isTrainer
                  ? {
                      menu: [
                        {
                          label: 'Редактировать',
                          onClick: () => {
                            router.push(`exercises/${item?._id}/edit`)
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

      <ModalMuscules
        title="Выберите группу мышц"
        open={modalOpen}
        initialChecked={muscules}
        onClose={handleModalToggle}
        onApply={value => setMuscules(value)}
        onCancel={() => setMuscules([])}
      />
    </>
  )
}

export default memo(ExercisesListView)
