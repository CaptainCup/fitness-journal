'use client'

import { FC, memo, useCallback, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button, Modal } from '@/app/components'

export type QRcodeProps = {
  title: string
  buttonClassName?: string
}

const QRcode: FC<QRcodeProps> = ({ title, buttonClassName }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpen(draft => !draft)
  }, [])

  return (
    <>
      <Button className={buttonClassName} onClick={handleOpen}>
        QR-код
      </Button>
      <Modal open={isOpen} onCancel={handleOpen} title={title}>
        <div className="w-full flex justify-center">
          <QRCodeCanvas
            value={window.location.href}
            size={256}
            imageSettings={{
              src: '/images/logo-x.svg',
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default memo(QRcode)
