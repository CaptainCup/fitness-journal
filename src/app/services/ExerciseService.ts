import BaseHttpService from './BaseHttpService'
import { EquipmentItem } from './EquipmentService'

export type ExerciseItem = {
  _id: string
  name: string
  image?: string
  description?: string
  measurements: string[]
  execution?: { image: string; text: string }[]
  equipment?: EquipmentItem[]
  similar?: ExerciseItem[]
}

export type ExerciseItemCreate = {
  _id: string
  name: string
  image?: string
  description?: string
  measurements: string[]
  execution?: { image: string; text: string }[]
  equipment?: string[]
  similar?: string[]
}

export default class ExerciseService extends BaseHttpService {
  async getList(params = {}): Promise<ExerciseItem[]> {
    return this.get('/exercises', { params })
  }

  async getById(id: string): Promise<ExerciseItem> {
    return this.get(`/exercises/${id}`)
  }

  async create(data = {}, options = {}): Promise<ExerciseItem> {
    return this.post('/exercises', data, options)
  }

  async update(id: string, data = {}): Promise<ExerciseItem> {
    return this.patch(`/exercises/${id}`, data)
  }

  async deleteExercise(id: string): Promise<void> {
    return this.delete(`/exercises/${id}`)
  }
}
