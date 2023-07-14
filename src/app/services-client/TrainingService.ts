import BaseHttpService from './BaseHttpService'
import { TrainingItem } from '@/app/types/Training'

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
