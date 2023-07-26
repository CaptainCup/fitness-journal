'use client'

import { FC, memo } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { usePathname } from 'next/navigation'
import { Modal } from '@/app/components'
import { baseURL } from '@/app/utils'

export type ModalQRProps = {
  title: string
  open: boolean
  onClose: () => void
}

const ModalQR: FC<ModalQRProps> = ({ title, open, onClose }) => {
  const pathname = usePathname()

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="w-full flex justify-center">
        <QRCodeCanvas
          value={`${baseURL}${pathname}`}
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
  )
}

export default memo(ModalQR)
