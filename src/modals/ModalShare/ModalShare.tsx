'use client'

import { FC, memo, useCallback, useMemo } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { usePathname } from 'next/navigation'
import { Button, Modal, Image } from '@/components'
import { baseURL } from '@/utils'

export type ModalQRProps = {
  title: string
  open: boolean
  onClose: () => void
}

const ModalShare: FC<ModalQRProps> = ({ title, open, onClose }) => {
  const pathname = usePathname()

  const link = useMemo(() => `${baseURL}${pathname}`, [pathname])

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(link)
  }, [link])

  const share = useCallback(() => {
    navigator.share({ url: link })
  }, [link])

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="w-full">
        <div className="mb-5 flex justify-center">
          <QRCodeCanvas
            value={link}
            size={256}
            imageSettings={{
              src: '/images/logo-x.svg',
              height: 48,
              width: 48,
              excavate: true,
            }}
          />
        </div>

        <div className="flex">
          <Button
            onClick={copyLink}
            className="w-full flex justify-center mr-5"
          >
            <Image src="/icons/link.svg" width={24} height={24} alt="Ссылка" />
            <p className="hidden lg:inline ml-2">Ссылка</p>
          </Button>

          <Button onClick={share} className="w-full flex justify-center">
            <Image src="/icons/share.svg" width={24} height={24} alt="Ссылка" />
            <p className="hidden lg:inline ml-2">Поделиться</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default memo(ModalShare)
