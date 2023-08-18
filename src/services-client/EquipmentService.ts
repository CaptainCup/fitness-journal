import BaseHttpService from './BaseHttpService'
import { EquipmentItem } from '@/types/Equipment'

export default class EquipmentService extends BaseHttpService {
  async getList(params = {}): Promise<EquipmentItem[]> {
    return this.get('/equipment', { params })
  }

  async getById(id: string): Promise<EquipmentItem> {
    return this.get(`/equipment/${id}`)
  }

  async create(data = {}, options = {}): Promise<EquipmentItem> {
    return this.post('/equipment', data, options)
  }

  async update(id: string, data = {}): Promise<EquipmentItem> {
    return this.patch(`/equipment/${id}`, data)
  }

  async deleteEquipment(id: string): Promise<void> {
    return this.delete(`/equipment/${id}`)
  }
}
