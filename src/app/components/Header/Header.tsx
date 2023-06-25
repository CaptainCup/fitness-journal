'use client';

import React, { FC, memo, useCallback, useState, Fragment } from 'react';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { Container } from '@/app/components';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

const menuItems = [
  {
    label: 'Оборудование',
    href: '/equipment',
  },
  {
    label: 'Упражнения',
    href: '/exercises',
  },
  {
    label: 'Тренировки',
    href: '/trainings',
  },
  {
    label: 'Клиенты',
    href: '/clients',
  },
];

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen((draft) => !draft), []);

  return (
    <>
      <header
        className={classNames(
          'z-10 fixed  bg-black top-0 w-full transition-all',
          !isOpen && 'bg-opacity-50'
        )}
      >
        <Container>
          <div className=" flex items-center justify-start md:justify-between h-14 md:h-28">
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
                  'w-full border-b-2 border-white transition-all',
                  isOpen && 'translate-x-2'
                )}
              />
            </div>

            <div className="relative h-10 w-24 lg:h-12 lg:w-32">
              <Link href="/">
                <Image src="/logo-white.png" alt="X-fit" fill />
              </Link>
            </div>

            <nav className="hidden md:block">
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
        </Container>
      </header>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleOpen}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full justify-center pt-14">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="w-full h-fit bg-black border-b-4 border-lime-400 px-5 py-5">
                  <nav>
                    <ul>
                      {menuItems.map(({ label, href }) => (
                        <li
                          className="text-white relative text-3xl mb-5"
                          onClick={handleOpen}
                          key={label}
                        >
                          <Link className="outline-none" href={href}>
                            {label}
                          </Link>
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
