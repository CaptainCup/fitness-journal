import BaseHttpService from './BaseHttpService'
import { ExerciseItem } from '@/types/Exercise'

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
