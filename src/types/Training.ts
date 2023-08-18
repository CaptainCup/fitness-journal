import { ExerciseItem } from './Exercise'
import { User } from './User'

export type ExercisesRecord = {
  exercise: ExerciseItem
  approaches: string[][]
}

export type TrainingItem = {
  _id: string
  date: Date
  user: User
  exercises: ExercisesRecord[]
}

export type TrainingItemCreate = {
  date: Date
  user: string
  exercises: {
    exercise: string
    approaches: string[][]
  }[]
}
