import BaseHttpService from './BaseHttpService'
import { EquipmentItem } from './EquipmentService'

export type ExerciseItem = {
  _id: string
  name: string
  image?: string
  description?: string
  measurements: Measurement[]
  execution?: { image: string; text: string }[]
  equipment?: EquipmentItem[]
  similar?: ExerciseItem[]
}

export type ExerciseItemCreate = {
  name: string
  image?: string
  description?: string
  measurements: Measurement[]
  execution?: { image: string; text: string }[]
  equipment?: string[]
  similar?: string[]
}

export enum Muscule {
  neck = 'MUSCULE_NECK',
  shoulders = 'MUSCULE_SHOULDERS',
  trapezius = 'MUSCULE_TRAPEZIUS',
  biceps = 'MUSCULE_BICEPS',
  forearm = 'MUSCULE_FOREARM',
  chest = 'MUSCULE_CHEST',
  abs = 'MUSCULE_ABS',
  quadriceps = 'MUSCULE_QUADRICEPS',
  triceps = 'MUSCULE_TRICEPS',
  latissimus = 'MUSCULE_LATISSIMUS',
  rhomboid = 'MUSCULE_RHOMBOID',
  lumbar = 'MUSCULE_LUMBAR',
  gluteal = 'MUSCULE_GLUTERAL',
  femoris = 'MUSCULE_FEMORIS',
  soleus = 'MUSCULE_SOLEUS',
}

const musculeImageSrc = '/images/muscules'

export const MusculeImage = {
  [Muscule.neck]: `${musculeImageSrc}/neck.jpg`,
  [Muscule.shoulders]: `${musculeImageSrc}/shoulders.jpg`,
  [Muscule.trapezius]: `${musculeImageSrc}/trapezius.jpg`,
  [Muscule.biceps]: `${musculeImageSrc}/biceps.jpg`,
  [Muscule.forearm]: `${musculeImageSrc}/forearm.jpg`,
  [Muscule.chest]: `${musculeImageSrc}/chest.jpg`,
  [Muscule.abs]: `${musculeImageSrc}/abs.jpg`,
  [Muscule.quadriceps]: `${musculeImageSrc}/quadriceps.jpg`,
  [Muscule.triceps]: `${musculeImageSrc}/triceps.jpg`,
  [Muscule.latissimus]: `${musculeImageSrc}/latissimus.jpg`,
  [Muscule.rhomboid]: `${musculeImageSrc}/rhomboid.jpg`,
  [Muscule.lumbar]: `${musculeImageSrc}/lumbar.jpg`,
  [Muscule.gluteal]: `${musculeImageSrc}/gluteal.jpg`,
  [Muscule.femoris]: `${musculeImageSrc}/femoris.jpg`,
  [Muscule.soleus]: `${musculeImageSrc}/soleus.jpg`,
}

export enum Measurement {
  weight = 'MEASUREMENT_WEIGHT',
  time = 'MEASUREMENT_TIME',
  repeats = 'MEASUREMENT_REPEATS',
}

export const MeasurementLabel = {
  [Measurement.weight]: 'кг.',
  [Measurement.time]: 'сек.',
  [Measurement.repeats]: 'раз.',
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
