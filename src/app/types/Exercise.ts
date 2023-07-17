import { EquipmentItem } from './Equipment'

export type ExerciseItem = {
  _id: string
  name: string
  image?: string
  description?: string
  measurements: Measurement[]
  execution?: { image: string; text: string }[]
  equipment?: EquipmentItem[]
  similar?: ExerciseItem[]
  muscules?: Muscule[]
}

export type ExerciseItemCreate = {
  name: string
  image?: string
  description?: string
  measurements: Measurement[]
  execution?: { image: string; text: string }[]
  equipment?: string[]
  similar?: string[]
  muscules?: Muscule[]
}

export enum Muscule {
  shoulders = 'MUSCULE_SHOULDERS',
  biceps = 'MUSCULE_BICEPS',
  triceps = 'MUSCULE_TRICEPS',
  forearm = 'MUSCULE_FOREARM',
  back = 'MUSCULE_BACK',
  chest = 'MUSCULE_CHEST',
  abs = 'MUSCULE_ABS',
  legs = 'MUSCULE_LEGS',
}

const musculeImageSrc = '/images/muscules'

export const MusculeObject = {
  [Muscule.shoulders]: {
    name: 'Плечи',
    image: `${musculeImageSrc}/shoulders.jpg`,
  },
  [Muscule.biceps]: {
    name: 'Бицепс',
    image: `${musculeImageSrc}/biceps.jpg`,
  },
  [Muscule.triceps]: {
    name: `Трицепс`,
    image: `${musculeImageSrc}/triceps.jpg`,
  },
  [Muscule.forearm]: {
    name: `Предплечье`,
    image: `${musculeImageSrc}/forearms.jpg`,
  },
  [Muscule.back]: {
    name: 'Спина',
    image: `${musculeImageSrc}/back.jpg`,
  },
  [Muscule.chest]: {
    name: 'Грудь',
    image: `${musculeImageSrc}/chest.jpg`,
  },
  [Muscule.abs]: {
    name: 'Пресс',
    image: `${musculeImageSrc}/abs.jpg`,
  },
  [Muscule.legs]: {
    name: `Ноги`,
    image: `${musculeImageSrc}/legs.jpg`,
  },
}

export const MusculeArray = Object.entries(MusculeObject).map(
  ([muscule, data]) => ({ ...data, value: muscule }),
)

export enum Measurement {
  weight = 'MEASUREMENT_WEIGHT',
  time = 'MEASUREMENT_TIME',
  repeats = 'MEASUREMENT_REPEATS',
  distance = 'MEASUREMENT_DISTANCE',
}

export const MeasurementLabel = {
  [Measurement.weight]: 'кг.',
  [Measurement.time]: 'сек.',
  [Measurement.repeats]: 'раз.',
  [Measurement.distance]: 'м.',
}
