import { FC, ReactNode, memo } from 'react'
import classNames from 'classnames'

type TitleProps = {
  children: ReactNode
  className?: string
  extra?: ReactNode
}

const Title: FC<TitleProps> = ({ className, children, extra }) => {
  return (
    <div
      className={classNames(
        'flex justify-between items-center w-full border-b-4 border-black mb-5 py-2',
        className,
      )}
    >
      <h2 className="text-xl">{children}</h2>
      {extra}
    </div>
  )
}

export default memo(Title)
