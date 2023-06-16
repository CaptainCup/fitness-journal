'use client';

import React, { FC, memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

const menuItems = [
  {
    label: 'Упражнения',
    href: '/exercises',
  },
  {
    label: 'Тренажеры',
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
    <header
      className={classNames(
        'z-10 fixed pt-9 pb-9 bg-black top-0 w-full transition-all',
        !isOpen && 'bg-opacity-50'
      )}
    >
      <div className="container mx-auto flex items-center  px-5 sm:px-0">
        <div className="w-5 mr-5 sm: hidden" onClick={handleOpen}>
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
        <nav className="hidden sm:block ml-10">
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
  );
};

export default memo(Header);
