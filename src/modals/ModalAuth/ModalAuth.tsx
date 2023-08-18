'use client'

import { FC, memo, useEffect, useState } from 'react'
import { Modal } from '@/components'
import PhoneForm from './PhoneForm'
import CodeForm from './CodeForm'
import ProfileForm from './ProfileForm'

export type ModalAuthProps = {
  open: boolean
  onClose: () => void
}

const ModalAuth: FC<ModalAuthProps> = ({ open, onClose }) => {
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
            onClose()
          }
        }}
      />
    ),
    profile: (
      <ProfileForm
        phone={phone}
        code={code}
        onBack={() => setStep('code')}
        onSuccess={onClose}
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
      onClose={onClose}
      title={titles[step]}
      className="w-full max-w-md"
    >
      {steps[step]}
    </Modal>
  )
}

export default memo(ModalAuth)
