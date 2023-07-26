'use client'

import { FC, Fragment, memo, useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Card, Popover, Title } from '@/app/components'
import { MeasurementLabel, ExercisesRecord } from '@/app/types'

export type TrainingCardProps = {
  _id: string
  date: string
  exercises: ExercisesRecord[]
  user: string
  canStartTraining?: boolean
  onDelete: () => void
}

const TrainingCard: FC<TrainingCardProps> = ({
  _id,
  date,
  exercises = [],
  user,
  canStartTraining,
  onDelete,
}) => {
  const [allExercises, setAllExercises] = useState(false)
  const [selectedCard, setSelectedCard] = useState<any>()

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  const router = useRouter()

  const maxExercises = useMemo(() => (isDesktop ? 5 : 3), [isDesktop])

  const exercisesPerRow = useMemo(() => {
    switch (true) {
      case isDesktop: {
        return 6
      }
      case isMobile: {
        return 2
      }
      default: {
        return 4
      }
    }
  }, [isDesktop, isMobile])

  const restExercises = useMemo(() => {
    return maxExercises > exercises.length ? 0 : exercises.length - maxExercises
  }, [maxExercises, exercises.length])

  const exercisesArray = allExercises
    ? exercises.map(({ exercise, approaches }) => ({
        ...exercise,
        disabled: approaches.length === 0,
      }))
    : exercises
        .map(({ exercise, approaches }) => ({
          ...exercise,
          disabled: approaches.length === 0,
        }))
        .slice(0, maxExercises)

  const showStatsAfterCardIndex = useMemo(() => {
    const selectedCardIndex = exercisesArray.findIndex(
      ({ _id }) => _id === selectedCard,
    )
    const res =
      Math.ceil((selectedCardIndex + 1) / exercisesPerRow) * exercisesPerRow - 1
    return res
  }, [selectedCard, exercisesArray, exercisesPerRow])

  const showStatsAfterButton = useMemo(
    () => showStatsAfterCardIndex > exercisesArray.length - 1,
    [showStatsAfterCardIndex, exercisesArray],
  )

  const showAllExercises = () => setAllExercises(true)

  const selectCard = (id: string) =>
    setSelectedCard((draft: any) => (id === draft ? null : id))

  const currentStats = exercises.find(
    ({ exercise }) => selectedCard === exercise._id,
  )

  const stats = (
    <div
      className={classNames(
        'col-span-2 sm:col-span-4 lg:col-span-6 grid my-5 w-fit mx-auto gap-2',
        `grid-cols-${currentStats?.exercise.measurements.length}`,
      )}
    >
      {currentStats?.approaches.map((approache, approacheIndex: number) => (
        <Fragment key={approacheIndex}>
          {approache.map((measurement, measurementIndex) => (
            <div key={measurementIndex} className="flex">
              <p
                className={classNames(
                  'mr-2',
                  measurementIndex % 2 === 1
                    ? 'text-lime-400 border-lime-400'
                    : 'text-black border-black',
                )}
              >
                {measurement}
              </p>
              <p
                className={classNames(
                  measurementIndex % 2 === 1 ? 'text-lime-400' : 'text-black',
                )}
              >
                {
                  MeasurementLabel[
                    currentStats.exercise.measurements[measurementIndex]
                  ]
                }
              </p>
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )

  const menu = [
    {
      label: 'Продолжить',
      onClick: () => {
        router.push(`/trainings/${user}/${_id}/edit`)
      },
    },
    {
      label: 'Удалить',
      danger: true,
      onClick: onDelete,
    },
  ]

  return (
    <div>
      <Title
        extra={
          canStartTraining ? (
            <Popover
              menu={menu}
              buttonClassName="-top-3 -right-3 flex py-2 outline-none"
              customButton={
                <>
                  <div className="w-1 h-1 bg-black mr-1" />
                  <div className="w-1 h-1 bg-black mr-1" />
                  <div className="w-1 h-1 bg-black" />
                </>
              }
            />
          ) : null
        }
      >
        {new Date(date).toLocaleDateString('ru-RU')}
      </Title>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
        {exercisesArray.map((exercise, index) => (
          <Fragment key={exercise._id}>
            <Card
              title={exercise.name}
              img={exercise.image}
              onClick={() => selectCard(exercise._id)}
              checked={selectedCard === exercise._id}
              {...exercise}
            />
            {index === showStatsAfterCardIndex && stats}
          </Fragment>
        ))}

        {!!restExercises && !allExercises && (
          <button
            onClick={showAllExercises}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +{restExercises}
          </button>
        )}

        {showStatsAfterButton && stats}
      </div>
    </div>
  )
}

export default memo(TrainingCard)
