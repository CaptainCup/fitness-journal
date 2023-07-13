import BaseHttpService from './BaseHttpService'
import { ExerciseItem } from './ExerciseService'
import { User } from './UserService'

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

export default class TrainingService extends BaseHttpService {
  async getList(params = {}): Promise<TrainingItem[]> {
    return this.get('/trainings', { params })
  }

  async getById(id: string): Promise<TrainingItem> {
    return this.get(`/trainings/${id}`)
  }

  async create(data = {}, options = {}): Promise<TrainingItem> {
    return this.post('/trainings', data, options)
  }

  async update(id: string, data = {}): Promise<TrainingItem> {
    return this.patch(`/trainings/${id}`, data)
  }

  async deleteTraining(id: string): Promise<void> {
    return this.delete(`/trainings/${id}`)
  }
}
