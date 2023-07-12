'use client'

import { FC, memo, Fragment, ReactNode } from 'react'
import classNames from 'classnames'
import { Popover as HeadlessuiPopover, Transition } from '@headlessui/react'

export type MenuItem = {
  label: string
  onClick: () => void
  danger?: boolean
}

export type PopoverProps = {
  menu: MenuItem[]
  buttonClassName?: string
  customButton?: ReactNode
}

const Popover: FC<PopoverProps> = ({ menu, buttonClassName, customButton }) => {
  return (
    <HeadlessuiPopover className="relative">
      {() => (
        <>
          <HeadlessuiPopover.Button
            className={classNames(
              'absolute p-4 top-0 right-0',
              buttonClassName,
            )}
          >
            {customButton || (
              <>
                <div className="w-1 h-1 bg-lime-400 mb-1" />
                <div className="w-1 h-1 bg-lime-400 mb-1" />
                <div className="w-1 h-1 bg-lime-400 " />
              </>
            )}
          </HeadlessuiPopover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <HeadlessuiPopover.Panel className="absolute right-0 top-0 z-10">
              <div className="relative bg-black border-b-4 border-lime-400 p-5 pb-0">
                {menu.map(({ label, danger, onClick }) => (
                  <div
                    key={label}
                    className="mb-5"
                    onClick={e => {
                      e.preventDefault()
                      onClick()
                    }}
                  >
                    <p
                      className={classNames(
                        danger ? 'text-red-600' : 'text-white',
                        ' hover:text-lime-400 transition-all',
                      )}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </HeadlessuiPopover.Panel>
          </Transition>
        </>
      )}
    </HeadlessuiPopover>
  )
}

export default memo(Popover)
