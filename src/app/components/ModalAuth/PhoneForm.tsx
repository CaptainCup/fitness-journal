// @ts-nocheck

'use client'

import { FC, memo } from 'react'
import { useFormik } from 'formik'
import InputMask from 'react-input-mask'
import { Button } from '@/app/components'
import { SmsTokenService } from '@/app/services'

const smsTokenApi = new SmsTokenService()

type PhoneFormProps = {
  onSuccess: (phone: string) => void
}

const PhoneForm: FC<PhoneFormProps> = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    onSubmit: async values => {
      const { phone } = values
      const transformedPhone = phone?.replace(/[^0-9]/g, '')

      if (transformedPhone.length === 11) {
        await smsTokenApi.sendCode({ phone: transformedPhone })
        onSuccess(transformedPhone)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
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
        <Button type="submit">Получить код</Button>
      </div>
    </form>
  )
}

export default memo(PhoneForm)
