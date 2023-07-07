'use client'

import { Fragment, memo, FC, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'

import styles from './Modal.module.css'

type ModalProps = {
  open: boolean
  title?: string
  children: ReactNode
  className?: string
  onCancel: () => void
}

const Modal: FC<ModalProps> = ({
  open,
  title,
  children,
  className,
  onCancel,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-5 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'relative overflow-hidden bg-white p-5 align-middle',
                  className,
                )}
              >
                <button
                  className={classNames(
                    styles.close,
                    'absolute top-2 right-2 w-8 h-8  bg-lime-400',
                  )}
                  onClick={onCancel}
                />

                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center mb-5 px-5"
                  >
                    {title}
                  </Dialog.Title>
                )}

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(Modal)
