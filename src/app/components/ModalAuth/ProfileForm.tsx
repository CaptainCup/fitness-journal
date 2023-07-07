'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import { Button, ImageUpload, TextInput } from '@/app/components'
import { AuthService } from '@/app/services'

const authApi = new AuthService()

type ProfileFormProps = {
  phone: string
  code: string
  onBack: () => void
  onSuccess: () => void
}

const ProfileForm: FC<ProfileFormProps> = ({
  phone,
  code,
  onBack,
  onSuccess,
}) => {
  const formik = useFormik({
    initialValues: {
      avatar: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
    onSubmit: async values => {
      try {
        await authApi.signUp({ phone, code, ...values })
        onSuccess()
      } catch (e: any) {
        console.log(e)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            square
            id="user-avatar"
            value={formik.values.avatar}
            onChange={value => formik.setFieldValue('avatar', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Имя"
            value={formik.values.firstName}
            onChange={value => formik.setFieldValue('firstName', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Фамилия"
            value={formik.values.lastName}
            onChange={value => formik.setFieldValue('lastName', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Отчество"
            value={formik.values.middleName}
            onChange={value => formik.setFieldValue('middleName', value)}
          />
        </div>

        <div className="flex">
          <Button className="mr-5 w-full" onClick={onBack}>
            Назад
          </Button>
          <Button className="w-full" type="submit">
            Готово
          </Button>
        </div>
      </div>
    </form>
  )
}

export default memo(ProfileForm)
