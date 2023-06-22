import React, { FC, memo } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.css';

export type CardProps = {
  title: string;
  img?: string;
  link?: string;
  checked?: boolean;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({ title, img, link, checked, onClick }) => {
  const component = (
    <div
      className={classNames(
        link && styles.card,
        checked && styles.checked,
        'relative aspect-square border-b-4 border-lime-400 transition-all'
      )}
      onClick={onClick}
    >
      <Image
        src={img || '/logo-in-black.png'}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute bottom-2 left-2 right-2 md:left-4 md:bottom-4 md:right-4 z-10">
        <h3
          className={classNames(
            link && 'mb-3',
            'text-white text-sm sm:text-base select-none'
          )}
        >
          {title}
        </h3>
        {link && <div className={styles.arrow} />}
      </div>

      <div
        className={classNames(
          'absolute bottom-0 left-0 right-0 opacity-40 transition-all',
          checked
            ? 'h-full bg-black'
            : 'h-20 bg-gradient-to-b from-transparent to-black'
        )}
      />
    </div>
  );

  return link ? <Link href={link}>{component}</Link> : component;
};

export default memo(Card);
