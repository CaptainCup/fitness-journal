'use client'

import { FC, ReactNode, ButtonHTMLAttributes, HTMLProps } from 'react'
import classNames from 'classnames'

const componentTypes = {
  button: (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type="button" {...props} />
  ),
  span: (props: HTMLProps<HTMLDivElement>) => <span {...props} />,
}

const buttonTypes = {
  primary: 'border-lime-400 bg-lime-400 hover:bg-white hover:text-black',
  danger:
    'border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500',
}

export type ButtonProps = {
  /**
   * Button content
   */
  children?: ReactNode

  /**
   * HTML component type
   */
  component?: 'button' | 'span'

  /**
   * Danger state
   */
  danger?: boolean

  /**
   * Custom classname for component
   */
  className?: string

  /**
   * onClick event handler
   */
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement> &
  HTMLProps<HTMLDivElement>

/**
 * Primary UI component for user interaction
 */
const Button: FC<ButtonProps> = ({
  children,
  className,
  danger,
  component = 'button',
  onClick,
  ...props
}) => {
  const ButtonComponent = componentTypes[component]

  return (
    <ButtonComponent
      className={classNames(
        'py-3 px-4 transition-all border-2 text-center',
        danger ? buttonTypes.danger : buttonTypes.primary,
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonComponent>
  )
}

export default Button
