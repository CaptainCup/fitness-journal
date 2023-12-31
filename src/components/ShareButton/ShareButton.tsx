'use client'

import { FC, useCallback, useState } from 'react'
import classNames from 'classnames'
import { Button, Image } from '@/components'
import { ModalShare } from '@/modals'

export type ShareButtonProps = {
  /**
   * Modal title
   */
  title: string

  /**
   * Custom classname for button
   */
  buttonClassName?: string
}

/**
 * Component to share page address
 */
const ShareButton: FC<ShareButtonProps> = ({ title, buttonClassName }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = useCallback(() => {
    setIsOpen(draft => !draft)
  }, [])

  return (
    <>
      <Button
        className={classNames(
          'flex justify-center items-center',
          buttonClassName,
        )}
        onClick={toggleModal}
      >
        <Image src="/icons/share.svg" width={24} height={24} alt="QR Code" />
        <p className="hidden lg:inline ml-2">Поделиться</p>
      </Button>

      <ModalShare title={title} open={isOpen} onClose={toggleModal} />
    </>
  )
}

export default ShareButton
