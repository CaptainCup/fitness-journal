import BaseHttpService from './BaseHttpService'

export type EquipmentItem = {
  _id: string
  name: string
  image?: string
  description?: string
  configuration?: { image: string; text: string }[]
}

export default class EquipmentService extends BaseHttpService {
  async getList(params = {}): Promise<EquipmentItem[]> {
    return this.get('/equipment', { params })
  }

  async getById(id: string): Promise<EquipmentItem> {
    return this.get(`/equipment/${id}`)
  }

  async create(data = {}, options = {}): Promise<EquipmentItem> {
    const equipment = await this.post('/equipment', data, options)

    return equipment
  }
}
