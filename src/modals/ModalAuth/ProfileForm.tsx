'use client'

import { FC, memo, useCallback } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, ImageUpload, TextInput, ErrorList } from '@/components'
import { AuthService } from '@/services-client'

const authApi = new AuthService()

export type ProfileFormProps = {
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
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      avatar: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
    onSubmit: async values => {
      let hasErrors = false

      if (!values.firstName) {
        formik.setFieldError('firstName', 'Введите имя')
        hasErrors = true
      }

      if (!values.lastName) {
        formik.setFieldError('lastName', 'Введите фамилию')
        hasErrors = true
      }

      if (hasErrors) {
        return
      }

      try {
        await authApi.signUp({ phone, code, ...values })
        onSuccess()
        router.refresh()
      } catch (e: any) {
        console.log(e)
      }
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
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="mb-5 sm:mb-10">
          <ImageUpload
            square
            id="user-avatar"
            value={formik.values.avatar}
            onChange={value => handleChange('avatar', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Имя*"
            error={!!formik.errors.firstName}
            value={formik.values.firstName}
            onChange={value => handleChange('firstName', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Фамилия*"
            error={!!formik.errors.lastName}
            value={formik.values.lastName}
            onChange={value => handleChange('lastName', value)}
          />
        </div>

        <div className="mb-5 sm:mb-10">
          <TextInput
            placeholder="Отчество"
            value={formik.values.middleName}
            onChange={value => handleChange('middleName', value)}
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

        {!!Object.values(formik.errors).length && (
          <div className="mb-5 sm:mb-10 flex justify-center">
            <ErrorList errors={Object.values(formik.errors)} />
          </div>
        )}
      </div>
    </form>
  )
}

export default memo(ProfileForm)
