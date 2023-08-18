import { Fragment, FC, memo, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export type HeaderMenuProps = {
  open: boolean
  children: ReactNode
  onClose: () => void
}

const HeaderMenu: FC<HeaderMenuProps> = ({ open, children, onClose }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full justify-center pt-14 lg:pt-28">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full h-fit bg-black border-b-4 border-lime-400 py-5">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default memo(HeaderMenu)
