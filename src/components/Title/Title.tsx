import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type TitleProps = {
  /**
   * Component content
   */
  children: ReactNode

  /**
   * Custom component classname
   */
  className?: string

  /**
   * Extra component content
   */
  extra?: ReactNode

  /**
   * Component error state
   */
  error?: boolean
}

/**
 * Title component
 */
const Title: FC<TitleProps> = ({ className, children, extra, error }) => {
  return (
    <div
      className={classNames(
        'flex justify-between items-center w-full border-b-4 border-black mb-5 py-2',
        error && 'border-red-500',
        className,
      )}
    >
      <h2 className={classNames('text-xl', error && 'text-red-500')}>
        {children}
      </h2>
      {extra}
    </div>
  )
}

export default Title
