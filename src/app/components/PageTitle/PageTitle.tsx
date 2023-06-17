'use client';

import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import styles from './PageTitle.module.css';

type PageTitleProps = {
  title: string;
  image?: string;
  withBack?: boolean;
};

const PageTitle: FC<PageTitleProps> = ({ title, image, withBack }) => {
  const router = useRouter();

  return (
    <section className="bg-black w-full h-60 sm:h-96 mb-5 sm:mb-10">
      <div className="container mx-auto flex h-full ">
        <div className="pb-5 sm:pb-10 px-5 sm:px-0 flex flex-col justify-end">
          {withBack && (
            <button
              onClick={router.back}
              className={classNames(
                'text-lime-400 w-fit mb-5 pl-16 hover:pl-20 transition-all relative',
                styles.back
              )}
            >
              Назад
            </button>
          )}
          <h1 className="text-3xl sm:text-5xl text-white">{title}</h1>
        </div>

        {image && (
          <div className="relative w-1/2 h-full">
            <Image src={image} alt={title} fill />
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(PageTitle);
