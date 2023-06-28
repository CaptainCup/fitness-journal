'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import {
  ExersiseStepsEditor,
  ImageUpload,
  Textarea,
  Button,
  Title,
} from '@/app/components'
import { EquipmentService } from '@/app/services'

const equipmentApi = new EquipmentService()

const EquipmentForm: FC = ({}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
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
          <ImageUpload id="equipment-image" />
        </div>

        <div className="mb-5 sm:mb-10">
          <input
            type="text"
            name="name"
            placeholder="Название оборудования"
            onChange={formik.handleChange}
            className="w-full border-b-2 border-black pb-2 outline-none pr-6"
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <Textarea
            name="description"
            onChange={formik.handleChange}
            placeholder="Описание оборудования"
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExersiseStepsEditor title="Порядок настройки" />
        </div>

        <div className="mb-5 sm:mb-10 flex justify-center">
          <Button type="submit">Добавить оборудование</Button>
        </div>
      </form>
    </div>
  )
}

export default memo(EquipmentForm)
