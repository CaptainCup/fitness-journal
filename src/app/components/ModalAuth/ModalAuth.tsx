'use client'

import { FC, memo, useEffect, useState } from 'react'
import { Modal } from '@/app/components'
import PhoneForm from './PhoneForm'
import CodeForm from './CodeForm'
import ProfileForm from './ProfileForm'

export type ModalAuthProps = {
  open: boolean
  onCancel: () => void
}

const ModalAuth: FC<ModalAuthProps> = ({ open, onCancel }) => {
  const [step, setStep] = useState<'phone' | 'code' | 'profile'>('phone')
  const [phone, setPhone] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const titles = {
    phone: 'Вход в систему',
    code: 'Введите код',
    profile: 'Введите данные',
  }

  const steps = {
    phone: (
      <PhoneForm
        phone={phone}
        onSuccess={phone => {
          setPhone(phone)
          setStep('code')
        }}
      />
    ),
    code: (
      <CodeForm
        code={code}
        phone={phone}
        onBack={() => setStep('phone')}
        onSuccess={code => {
          if (code) {
            setCode(code)
            setStep('profile')
          } else {
            onCancel()
          }
        }}
      />
    ),
    profile: (
      <ProfileForm
        phone={phone}
        code={code}
        onBack={() => setStep('code')}
        onSuccess={onCancel}
      />
    ),
  }

  useEffect(() => {
    if (open) {
      setStep('phone')
      setPhone('')
      setCode('')
    }
  }, [open])

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={titles[step]}
      className="w-full max-w-md"
    >
      {steps[step]}
    </Modal>
  )
}

export default memo(ModalAuth)
