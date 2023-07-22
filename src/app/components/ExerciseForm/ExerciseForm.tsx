'use client'

import { FC, memo, useCallback } from 'react'
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
  CardsGridEditorMuscules,
  ErrorList,
} from '@/app/components'
import { ExerciseService } from '@/app/services-client'
import { ExerciseItem, ExerciseItemCreate, Measurement } from '@/app/types'

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
    muscules: [],
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
    muscules,
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
      muscules,
    },
    onSubmit: values => {
      const res = { ...values } as ExerciseItemCreate
      let hasErrors = false

      if (!values.name) {
        formik.setFieldError('name', 'Введите название упражнения')
        hasErrors = true
      }

      if (!values.measurements.length) {
        formik.setFieldError('measurements', 'Введите измерения')
        hasErrors = true
      }

      if (hasErrors) {
        return
      }

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

  const handleChange = useCallback(
    (field: string, value: any) => {
      formik.setFieldValue(field, value)
      formik.setFieldError(field, '')
    },
    [formik],
  )

  return (
    <div>
      <Title>Описание упражнения</Title>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            id="exercise-image"
            value={formik.values.image}
            onChange={value => handleChange('image', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Название упражнения*"
            error={!!formik.errors.name}
            value={formik.values.name}
            onChange={value => handleChange('name', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <Textarea
            placeholder="Описание упражнения"
            value={formik.values.description}
            onChange={value => handleChange('description', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <MeasurementEditor
            title="Измерения*"
            error={!!formik.errors.measurements}
            value={formik.values.measurements}
            onChange={value => handleChange('measurements', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor
            title="Порядок выполнения"
            value={formik.values.execution}
            onChange={value => handleChange('execution', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditorMuscules
            title="Задействованные мышцы"
            value={formik.values.muscules}
            onChange={value => handleChange('muscules', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor
            type="equipment"
            title="Используемое оборудование"
            value={formik.values.equipment}
            onChange={value => handleChange('equipment', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <CardsGridEditor
            type="exercises"
            title="Похожие упражнения"
            value={formik.values.similar}
            onChange={value => handleChange('similar', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button className="w-full sm:w-auto" type="submit">{`${
            _id ? 'Обновить' : 'Добавить'
          } упражнение`}</Button>
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <ErrorList errors={Object.values(formik.errors).flat()} />
        </div>
      </form>
    </div>
  )
}

export default memo(ExerciseForm)
