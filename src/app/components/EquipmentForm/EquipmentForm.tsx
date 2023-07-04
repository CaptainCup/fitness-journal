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
} from '@/app/components'
import { EquipmentService } from '@/app/services'
import {
  EquipmentItem,
  EquipmentItemCreate,
} from '@/app/services/EquipmentService'

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

  return (
    <div>
      <Title>Описание оборудования</Title>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            id="equipment-image"
            value={formik.values.image}
            onChange={value => formik.setFieldValue('image', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Название оборудования"
            value={formik.values.name}
            onChange={value => formik.setFieldValue('name', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <Textarea
            placeholder="Описание оборудования"
            value={formik.values.description}
            onChange={value => formik.setFieldValue('description', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor
            title="Порядок настройки"
            value={formik.values.configuration}
            onChange={value => formik.setFieldValue('configuration', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button type="submit">{`${
            _id ? 'Обновить' : 'Добавить'
          } оборудование`}</Button>
        </div>
      </form>
    </div>
  )
}

export default memo(EquipmentForm)
