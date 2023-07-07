import BaseHttpService from './BaseHttpService'

export type AuthToken = {
  accessToken: string
  refreshToken: string
}

export type User = {
  _id?: string
  firstName?: string
  lastName?: string
  middleName?: string
  avatar?: string
  phone: string
  tokens?: AuthToken
}

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
