import BaseHttpService from './BaseHttpService'
import { TrainingItem } from '@/app/types/Training'

export default class TrainingService extends BaseHttpService {
  async getList(params = {}): Promise<TrainingItem[]> {
    return this.get('/trainings', { params })
  }

  async getDates(params = {}): Promise<Date[]> {
    const res = await this.get('/trainings/dates', { params })

    if (res.length) {
      return res.map((date: string) => new Date(date))
    } else {
      return []
    }
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

  async lastExerciseResults(
    user: string,
    exercise: string,
  ): Promise<{ approaches: string[][]; date: Date } | null> {
    return this.get('/trainings/last-exercise-results', {
      params: { user, exercise },
    })
  }
}
