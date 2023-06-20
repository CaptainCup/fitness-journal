'use client';

import { FC, ReactNode, memo, ButtonHTMLAttributes, HTMLProps } from 'react';
import classNames from 'classnames';

const componentTypes = {
  button: (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} />
  ),
  span: (props: HTMLProps<HTMLDivElement>) => <span {...props} />,
};

const buttonTypes = {
  primary: 'border-lime-400 bg-lime-400 hover:bg-white hover:text-black',
  danger:
    'border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500',
};

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  component?: 'button' | 'span';
  type?: 'primary' | 'danger';
  className?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  className,
  type = 'primary',
  component = 'button',
  onClick,
}) => {
  const ButtonComponent = componentTypes[component];

  return (
    <ButtonComponent
      className={classNames(
        'py-3 px-4 transition-all border-2 text-center',
        buttonTypes[type],
        className
      )}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
};

export default memo(Button);
