import Link from 'next/link';
import React, { FC, memo } from 'react';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsItemType = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  path: BreadcrumbsItemType[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ path }) => {
  return (
    <ul className="flex">
      {path.map(({ label, href }, index) => {
        const isLast = index >= path.length - 1;
        return (
          <li
            key={label}
            className={`${isLast && 'text-gray-500'} ${
              !isLast && styles.item
            }  relative mr-8`}
          >
            {isLast ? label : <Link href={href}>{label}</Link>}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Breadcrumbs);
