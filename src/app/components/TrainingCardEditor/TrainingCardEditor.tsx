'use client'

import {
  FC,
  Fragment,
  memo,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'
import { Card, ModalGrid } from '@/app/components'
import { ExerciseItem, MeasurementLabel } from '@/app/services/ExerciseService'
import { ExercisesRecord } from '@/app/services/TrainingService'

export type TrainingCardEditorProps = {
  value?: ExercisesRecord[]
  onChange?: (value: ExercisesRecord[]) => void
}

const TrainingCardEditor: FC<TrainingCardEditorProps> = ({
  value,
  onChange = () => null,
}) => {
  const [selectedCard, setSelectedCard] = useState<string>()
  const [modalOpen, setModalOpen] = useState(false)
  const [exercises, setExercises] = useState<ExercisesRecord[]>([])

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

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

  const selectCard = (card: string) =>
    setSelectedCard(draft => (card === draft ? '' : card))

  const toggleModal = useCallback(() => setModalOpen(draft => !draft), [])

  const handleCardClick = useCallback(
    (value: ExerciseItem) => {
      const exerciseIndex = exercises.findIndex(
        ({ exercise }) => exercise._id === value._id,
      )

      const updatedExercises =
        exerciseIndex === -1
          ? [
              ...exercises,
              {
                exercise: value,
                approaches: [value.measurements.map(() => '')],
              },
            ]
          : [
              ...exercises.slice(0, exerciseIndex),
              ...exercises.slice(exerciseIndex + 1),
            ]

      setExercises(updatedExercises)
      onChange(updatedExercises)
      setSelectedCard(value._id)
    },
    [exercises, onChange],
  )

  const handleApproachesChange = (
    index: number,
    place: number,
    value: string,
  ) => {
    const currentExerciseIndex = exercises.findIndex(
      ({ exercise }) => selectedCard === exercise._id,
    )

    const updatedValue = [
      ...exercises[currentExerciseIndex].approaches[index].slice(0, place),
      value,
      ...exercises[currentExerciseIndex].approaches[index].slice(place + 1),
    ]

    const updatedApproaches = [
      ...exercises[currentExerciseIndex].approaches.slice(0, index),
      updatedValue,
      ...exercises[currentExerciseIndex].approaches.slice(index + 1),
    ]

    if (
      updatedApproaches[updatedApproaches.length - 1].every(
        (value: string) => value,
      )
    ) {
      updatedApproaches.push(
        exercises[currentExerciseIndex].exercise.measurements.map(() => ''),
      )
    }

    const updatedExercises = [
      ...exercises.slice(0, currentExerciseIndex),
      { ...exercises[currentExerciseIndex], approaches: updatedApproaches },
      ...exercises.slice(currentExerciseIndex + 1),
    ]

    setExercises(updatedExercises)
    onChange(updatedExercises)
  }

  const showStatsAfterCardIndex = useMemo(() => {
    const selectedCardIndex = exercises.findIndex(
      ({ exercise }) => exercise._id === selectedCard,
    )
    const res =
      Math.ceil((selectedCardIndex + 1) / exercisesPerRow) * exercisesPerRow - 1
    return res
  }, [selectedCard, exercises, exercisesPerRow])

  const showStatsAfterButton = useMemo(
    () => showStatsAfterCardIndex > exercises.length - 1,
    [showStatsAfterCardIndex, exercises],
  )

  const currentStats = exercises.find(
    ({ exercise }) => selectedCard === exercise._id,
  )

  const stats = (
    <div className="col-span-2 sm:col-span-4 lg:col-span-6 flex flex-col my-5">
      {currentStats?.approaches.map((approache, approacheIndex: number) => (
        <div className="flex" key={approacheIndex}>
          {approache.map((measurement, measurementIndex) => (
            <div key={measurementIndex} className="flex w-full">
              <input
                type="number"
                className={classNames(
                  'w-full border-b-2 pb-2 outline-none text-center',
                  measurementIndex % 2 === 1
                    ? 'text-lime-400 border-lime-400'
                    : 'text-black border-black',
                )}
                onChange={e =>
                  handleApproachesChange(
                    approacheIndex,
                    measurementIndex,
                    e.target.value,
                  )
                }
                value={measurement}
              />
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
        </div>
      ))}
    </div>
  )

  useEffect(() => {
    if (value) {
      const transfomedValue = value.map(({ exercise, approaches }) => ({
        exercise,
        approaches: [
          ...approaches,
          ...(approaches[approaches.length - 1].every(value => value)
            ? [exercise.measurements.map(() => '')]
            : []),
        ],
      }))

      setExercises(transfomedValue)
    }
  }, [value])

  return (
    <>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-5">
          {exercises?.map(({ exercise }, index) => (
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

          <button
            type="button"
            onClick={toggleModal}
            className="w-full aspect-square relative border-4 border-lime-400 text-lime-400 text-4xl flex items-center justify-center"
          >
            +
          </button>

          {showStatsAfterButton && stats}
        </div>
      </div>

      <ModalGrid
        title="Выберите упражнение"
        endpoint="exercises"
        open={modalOpen}
        checked={exercises.map(({ exercise }) => exercise)}
        onCancel={toggleModal}
        handleCardClick={handleCardClick}
      />
    </>
  )
}

export default memo(TrainingCardEditor)
