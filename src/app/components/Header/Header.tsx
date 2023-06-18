'use client';

import React, { FC, memo, useCallback, useState, Fragment } from 'react';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

const menuItems = [
  {
    label: 'Упражнения',
    href: '/exercises',
  },
  {
    label: 'Оборудование',
    href: '/equipments',
  },
  {
    label: 'Тренировки',
    href: '/trainings',
  },
];

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen((draft) => !draft), []);

  return (
    <>
      <header
        className={classNames(
          'z-10 fixed pt-9 h-28 pb-9 bg-black top-0 w-full transition-all',
          !isOpen && 'bg-opacity-50'
        )}
      >
        <div className="container mx-auto flex items-center  px-5 sm:px-0">
          <div className="w-5 mr-5 md:hidden" onClick={handleOpen}>
            <div className="w-full border-b-2 border-white mb-1" />
            <div
              className={classNames(
                'w-full border-b-2 border-white mb-1 transition-all',
                isOpen && 'translate-x-1'
              )}
            />
            <div
              className={classNames(
                'w-full border-b-2 border-white mb-1 transition-all',
                isOpen && 'translate-x-2'
              )}
            />
          </div>

          <Image src="/logo-white.png" alt="X-fit" width={115} height={65} />
          <nav className="hidden md:block ml-10">
            <ul className="flex">
              {menuItems.map(({ label, href }) => (
                <li
                  className={`${styles.item} text-white px-4 relative`}
                  key={label}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleOpen}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full justify-center pt-28">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full h-fit bg-black border-b-4 border-lime-400 px-5 pb-14">
                  <nav>
                    <ul>
                      {menuItems.map(({ label, href }) => (
                        <li
                          className="text-white relative text-3xl mb-5 outline-none"
                          key={label}
                        >
                          <Link href={href}>{label}</Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(Header);
