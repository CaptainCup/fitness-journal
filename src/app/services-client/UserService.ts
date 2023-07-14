import BaseHttpService from './BaseHttpService'
import { User } from '@/app/types'

export default class UserService extends BaseHttpService {
  async create(data = {}, options = {}): Promise<User> {
    return this.post('/users', data, options)
  }

  async update(id: string, data = {}): Promise<void> {
    return this.patch(`/users/${id}`, data)
  }

  async getList(params = {}): Promise<{ items: User[]; count: number }> {
    return this.get('/users', { params })
  }

  async getById(id: string): Promise<User> {
    return this.get(`/users/${id}`)
  }

  async getCurrent(): Promise<User> {
    return this.get(`/users/current`)
  }
}
