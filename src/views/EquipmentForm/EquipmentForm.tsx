'use client'

import { FC, memo, useCallback } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import {
  StepsEditor,
  ImageUpload,
  Textarea,
  Button,
  Title,
  TextInput,
  ErrorList,
} from '@/components'
import { EquipmentService } from '@/services-client'
import { EquipmentItem, EquipmentItemCreate } from '@/types'

const equipmentApi = new EquipmentService()

export type EquipmentFormProps = {
  initialData?: EquipmentItem
}

const EquipmentForm: FC<EquipmentFormProps> = ({
  initialData = {
    _id: '',
    image: '',
    name: '',
    description: '',
    configuration: [],
  },
}) => {
  const router = useRouter()

  const { _id, image, name, description, configuration } = initialData

  const formik = useFormik({
    initialValues: {
      image,
      name,
      description,
      configuration,
    },
    onSubmit: values => {
      if (!values.name) {
        formik.setFieldError('name', 'Введите название оборудования')
        return
      }

      const res = { ...values } as EquipmentItemCreate

      if (!values.description) {
        delete res.description
      }

      if (!values.image) {
        delete res.image
      }

      if (!values.configuration?.length) {
        delete res.configuration
      }

      if (_id) {
        equipmentApi.update(_id, res)
      } else {
        equipmentApi.create(res)
      }

      router.push('/equipment')
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
      <Title>Описание оборудования</Title>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            id="equipment-image"
            value={formik.values.image}
            onChange={value => handleChange('image', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Название оборудования*"
            error={!!formik.errors.name}
            value={formik.values.name}
            onChange={value => handleChange('name', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <Textarea
            placeholder="Описание оборудования"
            value={formik.values.description}
            onChange={value => handleChange('description', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <StepsEditor
            title="Порядок настройки"
            value={formik.values.configuration}
            onChange={value => handleChange('configuration', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button type="submit">{`${
            _id ? 'Обновить' : 'Добавить'
          } оборудование`}</Button>
        </div>

        {!!Object.values(formik.errors).length && (
          <div className="mb-5 sm:mb-10 flex justify-center">
            <ErrorList errors={Object.values(formik.errors)} />
          </div>
        )}
      </form>
    </div>
  )
}

export default memo(EquipmentForm)
