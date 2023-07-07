//@ts-nocheck

'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/navigation'
import { ImageUpload, TextInput, Button } from '@/app/components'
import { UserService } from '@/app/services'
import { User } from '@/app/services/UserService'

const usersApi = new UserService()

export type UserFormProps = {
  initialData?: User
}

const UserForm: FC<UserFormProps> = ({
  initialData = {
    _id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    avatar: '',
  },
}) => {
  const router = useRouter()

  const { _id, firstName, lastName, middleName, avatar, phone } = initialData

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      middleName,
      avatar,
      phone,
    },
    onSubmit: async values => {
      const { phone } = values
      const transformedPhone = phone?.replace(/[^0-9]/g, '')
      const res = { ...values, phone: transformedPhone }

      if (_id) {
        usersApi.update(_id, res)
      } else {
        usersApi.create(res)
      }

      router.push('/users')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <div className="mb-5 sm:mb-10">
        <InputMask
          mask="+7 (999) 999-99-99"
          value={formik.values.phone}
          onChange={e => formik.setFieldValue('phone', e.target.value)}
        >
          {(inputProps: any) => (
            <input
              placeholder="Введите номер телефона"
              className="w-full border-b-2 border-black pb-2 outline-none pr-6"
              {...inputProps}
            />
          )}
        </InputMask>
      </div>

      <div className="mb-5 sm:mb-10 flex justify-center">
        <Button type="submit">Добавить пользователя</Button>
      </div>
    </form>
  )
}

export default memo(UserForm)
