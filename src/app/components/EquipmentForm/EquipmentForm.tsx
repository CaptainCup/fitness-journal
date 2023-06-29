'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import {
  ExersiseStepsEditor,
  ImageUpload,
  Textarea,
  Button,
  Title,
  TextInput,
} from '@/app/components'
import { EquipmentService } from '@/app/services'

const equipmentApi = new EquipmentService()

const EquipmentForm: FC = ({}) => {
  const formik = useFormik({
    initialValues: {
      image: 'api/files/hello-1688076402515.png',
      name: 'initial name',
      description: 'initial description',
      configuration: [
        {
          image: 'api/files/hello-1688076402515.png',
          text: 'initial name step 1',
        },
        {
          image: 'api/files/this.png',
          text: 'initial name step 2',
        },
      ],
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
      equipmentApi.create(values)
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
          <Button type="submit">Добавить оборудование</Button>
        </div>
      </form>
    </div>
  )
}

export default memo(EquipmentForm)
