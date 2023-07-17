//@ts-nocheck

'use client'

import { FC, memo, useMemo } from 'react'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/navigation'
import { ImageUpload, TextInput, Button, Select } from '@/app/components'
import { UserService } from '@/app/services-client'
import { AdminPermissions, User } from '@/app/types'

const usersApi = new UserService()

const userPermissions = [
  {
    label: 'Пользователь',
    value: 'user',
  },
  {
    label: 'Тренер',
    value: AdminPermissions.trainer,
  },
  {
    label: 'Администратор',
    value: AdminPermissions.admin,
  },
]

const valuePermissions = {
  user: [],
  [AdminPermissions.trainer]: [AdminPermissions.trainer],
  [AdminPermissions.admin]: [AdminPermissions.trainer, AdminPermissions.admin],
}

export type UserFormProps = {
  initialData?: User
  isAdmin?: boolean
}

const UserForm: FC<UserFormProps> = ({
  initialData = {
    _id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    avatar: '',
    admin: [],
  },
  isAdmin,
}) => {
  const router = useRouter()

  const { _id, firstName, lastName, middleName, avatar, phone, admin } =
    initialData

  const initialPermissions = useMemo(() => {
    switch (true) {
      case admin?.includes(AdminPermissions.admin): {
        return AdminPermissions.admin
      }
      case admin?.includes(AdminPermissions.trainer): {
        return AdminPermissions.trainer
      }
      default: {
        return 'user'
      }
    }
  }, [admin])

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      middleName,
      avatar,
      phone,
      admin: initialPermissions,
    },
    onSubmit: async values => {
      const { phone, admin } = values

      const transformedPhone = phone?.replace(/[^0-9]/g, '')

      const transformedPermissions = valuePermissions[admin]

      const res = {
        ...values,
        phone: transformedPhone,
        admin: transformedPermissions,
      }

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

      {isAdmin && (
        <div className="mb-5 sm:mb-10">
          <Select
            options={userPermissions}
            value={formik.values.admin}
            onChange={value => formik.setFieldValue('admin', value)}
          />
        </div>
      )}

      <div className="mb-5 sm:mb-10 flex justify-center">
        <Button type="submit">Изменить пользователя</Button>
      </div>
    </form>
  )
}

export default memo(UserForm)
