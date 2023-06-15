import React, { FC, memo } from 'react';
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
  return (
    <div className="z-10 fixed pt-9 pb-9 bg-opacity-50 bg-black top-0 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <Image src="/logo-white.png" alt="X-fit" width={115} height={65} />
        <nav>
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
    </div>
  );
};

export default memo(Header);
