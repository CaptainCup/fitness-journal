'use client'

import { memo, FC, useCallback, useState, Fragment, useEffect } from 'react'
import classNames from 'classnames'
import useSWR from 'swr'
import { Button } from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { Measurement, MeasurementLabel } from '@/app/types'

import styles from './LastExercises.module.css'

const trainingsApi = new TrainingService()

type Result = {
  approaches: string[][]
  date: Date
}

const getLastExerciseResults = async (
  user: string,
  exercise: string,
): Promise<Result | null> => {
  try {
    const lastResults = await trainingsApi.lastExerciseResults(user, exercise)
    return lastResults
  } catch {
    return null
  }
}

export type LastExercisesProps = {
  user: string
  exercise: string
  measurements: Measurement[]
}

const LastExercises: FC<LastExercisesProps> = ({
  user,
  exercise,
  measurements,
}) => {
  const { data } = useSWR(
    `last-exercise-results/${user}/${exercise}`,
    () => getLastExerciseResults(user, exercise),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(draft => !draft)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [exercise])

  return (
    <>
      {data ? (
        <div>
          <Button
            onClick={handleOpen}
            className="w-full flex justify-center mb-5"
          >
            <p className={classNames(styles.arrow, isOpen && styles.open)}>
              {new Date(data.date).toLocaleDateString('ru-RU')}
            </p>
          </Button>

          {isOpen && (
            <div
              className={classNames(
                'col-span-2 sm:col-span-4 lg:col-span-6 grid my-5 w-fit mx-auto gap-2',
                `grid-cols-${measurements.length}`,
              )}
            >
              {data?.approaches.map((approache, approacheIndex: number) => (
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
                          measurementIndex % 2 === 1
                            ? 'text-lime-400'
                            : 'text-black',
                        )}
                      >
                        {MeasurementLabel[measurements[measurementIndex]]}
                      </p>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default memo(LastExercises)
