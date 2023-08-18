import React, { FC, memo } from 'react'
import Link from 'next/link'

import styles from './Breadcrumbs.module.css'

export type BreadcrumbsItemType = {
  label: string
  href: string
}

export type BreadcrumbsProps = {
  path: BreadcrumbsItemType[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ path }) => {
  return (
    <ul className="flex flex-wrap">
      {path.map(({ label, href }, index) => {
        const isLast = index >= path.length - 1
        return (
          <li
            key={label}
            className={`${isLast && 'text-gray-500'} ${
              !isLast && styles.item
            }  relative mr-8`}
          >
            {isLast ? label : <Link href={href}>{label}</Link>}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Breadcrumbs)
