import { createAxiosInstance } from '@/app/utils'
import { AxiosInstance } from 'axios'

export default class BaseHttpService {
  private http: AxiosInstance

  constructor() {
    this.http = createAxiosInstance()
  }

  get = async (endpoint: string, options = {}): Promise<any> => {
    return this.http.get(endpoint, options).then(result => result.data)
  }

  post = async (endpoint: string, data = {}, options = {}): Promise<any> => {
    return this.http.post(endpoint, data, options).then(result => result.data)
  }

  patch = async (endpoint: string, data = {}, options = {}): Promise<any> => {
    return this.http.patch(endpoint, data, options).then(result => result.data)
  }

  delete = async (endpoint: string, options = {}): Promise<any> => {
    return this.http.delete(endpoint, options).then(result => result.data)
  }
}
