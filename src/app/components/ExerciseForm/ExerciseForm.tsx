'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import {
  ExersiseStepsEditor,
  ImageUpload,
  Textarea,
  Button,
  Title,
  TextInput,
  CardsGridEditor,
  MeasurementEditor,
} from '@/app/components'
import { ExerciseService } from '@/app/services'
import {
  ExerciseItem,
  ExerciseItemCreate,
  Measurement,
} from '@/app/services/ExerciseService'

const exerciseApi = new ExerciseService()

export type ExerciseFormProps = {
  initialData?: ExerciseItem
}

const ExerciseForm: FC<ExerciseFormProps> = ({
  initialData = {
    _id: '',
    image: '',
    name: '',
    description: '',
    measurements: [],
    execution: [],
    equipment: [],
    similar: [],
  },
}) => {
  const router = useRouter()

  const {
    _id,
    image,
    name,
    description,
    measurements,
    execution,
    equipment,
    similar,
  } = initialData

  const formik = useFormik({
    initialValues: {
      image,
      name,
      description,
      measurements,
      execution,
      equipment,
      similar,
    },
    onSubmit: values => {
      const res = { ...values } as ExerciseItemCreate

      if (
        values.measurements.some((measurement: Measurement) => !measurement)
      ) {
        res.measurements = values.measurements.filter(
          (measurement: Measurement) => measurement,
        )
      }

      if (values.equipment?.length) {
        res.equipment = values.equipment.map(({ _id }: { _id: string }) => _id)
      } else {
        delete res.equipment
      }

      if (values.similar?.length) {
        res.similar = values.similar.map(({ _id }: { _id: string }) => _id)
      } else {
        delete res.similar
      }

      if (!values.description) {
        delete res.description
      }

      if (!values.image) {
        delete res.image
      }

      if (!values.execution?.length) {
        delete res.execution
      }

      if (_id) {
        exerciseApi.update(_id, res)
      } else {
        exerciseApi.create(res)
      }

      router.push('/exercises')
    },
  })

  return (
    <div>
      <Title>Описание упражнения</Title>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            id="exercise-image"
            value={formik.values.image}
            onChange={value => formik.setFieldValue('image', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Название упражнения"
            value={formik.values.name}
            onChange={value => formik.setFieldValue('name', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <Textarea
            placeholder="Описание упражнения"
            value={formik.values.description}
            onChange={value => formik.setFieldValue('description', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <MeasurementEditor
            title="Измерения"
            value={formik.values.measurements}
            onChange={value => formik.setFieldValue('measurements', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor
            title="Порядок выполнения"
            value={formik.values.execution}
            onChange={value => formik.setFieldValue('execution', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor
            type="equipment"
            title="Используемое оборудование"
            value={formik.values.equipment}
            onChange={value => formik.setFieldValue('equipment', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor
            type="exercises"
            title="Похожие упражнения"
            value={formik.values.similar}
            onChange={value => formik.setFieldValue('similar', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button type="submit">{`${
            _id ? 'Обновить' : 'Добавить'
          } упражнение`}</Button>
        </div>
      </form>
    </div>
  )
}

export default memo(ExerciseForm)
