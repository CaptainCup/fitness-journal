import { FC, ReactNode, memo } from 'react'
import classNames from 'classnames'

export type ContainerProps = {
  className?: string
  children?: ReactNode
}

const Container: FC<ContainerProps> = ({ className, children }) => {
  return (
    <section
      className={classNames(className, 'container mx-auto px-5 sm:px-0')}
    >
      {children}
    </section>
  )
}

export default memo(Container)
