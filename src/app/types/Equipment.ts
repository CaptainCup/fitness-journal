import { ExerciseItem } from './Exercise'

export type EquipmentItem = {
  _id: string
  name: string
  image?: string
  description?: string
  configuration?: { image: string; text: string }[]
  exercises?: ExerciseItem[]
}

export type EquipmentItemCreate = {
  name: string
  image?: string
  description?: string
  configuration?: { image: string; text: string }[]
}
