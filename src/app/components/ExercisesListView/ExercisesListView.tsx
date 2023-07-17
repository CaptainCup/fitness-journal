'use client'

import { memo, FC, useState, useCallback } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import {
  InfiniteList,
  Card,
  TextInput,
  Button,
  Image,
  ModalMuscules,
} from '@/app/components'
import { Muscule } from '@/app/types'

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

  const handleModalSuccess = useCallback(
    (searchMuscules: any[]) => {
      const updatedMuscules = [...muscules, ...searchMuscules]
      setMuscules(updatedMuscules)
    },
    [muscules],
  )

  const handleDeleteExercise = useCallback(
    (id: string) => {
      const updatedMuscules = muscules.filter(({ value }) => value !== id)
      setMuscules(updatedMuscules)
    },
    [muscules],
  )

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

            {isTrainer && (
              <Button
                className={classNames(isTrainer && 'ml-2 md:ml-5')}
                onClick={() => router.push('exercises/create')}
              >
                <Image
                  src="/icons/plus.svg"
                  width={40}
                  height={40}
                  alt="Добавить"
                  className="block md:hidden"
                />
                <p className="hidden md:inline whitespace-nowrap">
                  Добавить упражнение
                </p>
              </Button>
            )}
          </div>
        </div>

        <div className="mb-5 sm:mb-10">
          <div
            className={classNames(
              'flex flex-wrap items-center w-full sm:w-auto',
              muscules?.length
                ? 'justify-start'
                : ' justify-between sm:justify-start',
            )}
          >
            <p className="mr-5 mb-2">Поиск по группе мышц: </p>
            {muscules.map(({ value, name }) => (
              <Button
                className="mr-2 mb-2 flex items-center"
                key={value}
                onClick={() => handleDeleteExercise(value)}
              >
                <p className="mr-2">{name}</p>
                <Image
                  className="rotate-45 translate-y-0.5"
                  src="/icons/plus.svg"
                  width={20}
                  height={20}
                  alt="Удалить"
                />
              </Button>
            ))}
            <Button className="mb-2" onClick={handleModalToggle}>
              <Image
                src="/icons/plus.svg"
                width={24}
                height={24}
                alt="Добавить"
              />
            </Button>
          </div>
        </div>

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
                img={item?.image}
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
        exclude={muscules.map(({ value }) => value)}
        onCancel={handleModalToggle}
        onSuccess={handleModalSuccess}
      />
    </>
  )
}

export default memo(ExercisesListView)
