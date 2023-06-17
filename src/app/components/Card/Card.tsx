import React, { FC, memo } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.css';

type CardProps = {
  title: string;
  img?: string;
  link?: string;
};

const Card: FC<CardProps> = ({ title, img, link }) => {
  const component = (
    <div
      className={classNames(
        link && styles.card,
        'relative aspect-square border-b-4 border-lime-400'
      )}
    >
      <Image
        src={img || '/logo-in-black.png'}
        alt={title}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute bottom-4 left-4 z-10">
        <h3 className={classNames(link && styles.title, 'text-white')}>
          {title}
        </h3>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black z-0 opacity-40" />
    </div>
  );

  return link ? <Link href={link}>{component}</Link> : component;
};

export default memo(Card);
