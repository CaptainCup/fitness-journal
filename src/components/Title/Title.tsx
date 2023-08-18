import { FC, ReactNode, memo } from 'react'
import classNames from 'classnames'

export type TitleProps = {
  children: ReactNode
  className?: string
  extra?: ReactNode
  error?: boolean
}

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

export default memo(Title)
