'use client'

import React, { FC, memo } from 'react'
import { useFormik } from 'formik'
import { Button, TextInput } from '@/app/components'
import { AuthService, UserService } from '@/app/services'

const authApi = new AuthService()
const userApi = new UserService()

type CodeFormProps = {
  phone: string
  onBack: () => void
  onSuccess: (code?: string) => void
}

const CodeForm: FC<CodeFormProps> = ({ phone, onBack, onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: async values => {
      const { code } = values

      if (code.length === 4) {
        try {
          await authApi.signIn({ phone, code })
          const user = await userApi.getCurrent()
          console.log('user: ', user)
          onSuccess()
        } catch (e: any) {
          console.log(e)
          if (e.response.data.message === 'Пользователь не найден') {
            onSuccess(code)
          }
        }
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <TextInput
          placeholder="Введите код"
          className="mb-5 sm:mb-10"
          value={formik.values.code}
          onChange={value => formik.setFieldValue('code', value)}
        />
        <div className="flex">
          <Button className="mr-5 w-full" onClick={onBack}>
            Назад
          </Button>
          <Button className="w-full" type="submit">
            Далее
          </Button>
        </div>
      </div>
    </form>
  )
}

export default memo(CodeForm)
