//@ts-nocheck

'use client'

import { FC, memo, useMemo, useCallback } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/navigation'
import { ImageUpload, TextInput, Button, Select, ErrorList } from '@/components'
import { UserService } from '@/services-client'
import { AdminPermissions, User } from '@/types'

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

      let hasErrors = false

      if (!values.firstName) {
        formik.setFieldError('firstName', 'Введите имя')
        hasErrors = true
      }

      if (!values.lastName) {
        formik.setFieldError('lastName', 'Введите фамилию')
        hasErrors = true
      }

      if (transformedPhone.length !== 11) {
        formik.setFieldError('phone', 'Введите телефон')
        hasErrors = true
      }

      if (hasErrors) {
        return
      }

      if (_id) {
        usersApi.update(_id, res)
      } else {
        usersApi.create(res)
      }

      router.push('/users')
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

      <div className="mb-5 sm:mb-10">
        <InputMask
          mask="+7 (999) 999-99-99"
          value={formik.values.phone}
          onChange={e => handleChange('phone', e.target.value)}
        >
          {(inputProps: any) => (
            <input
              placeholder="Введите номер телефона"
              className={classNames(
                'w-full border-b-2 border-black pb-2 outline-none pr-6',
                formik.errors.phone &&
                  'border-red-500 text-red-500 placeholder:text-red-500',
              )}
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
        <Button type="submit">{`${
          _id ? 'Изменить' : 'Добавить'
        } пользователя`}</Button>
      </div>

      {!!Object.values(formik.errors).length && (
        <div className="mb-5 sm:mb-10 flex justify-center">
          <ErrorList errors={Object.values(formik.errors)} />
        </div>
      )}
    </form>
  )
}

export default memo(UserForm)
