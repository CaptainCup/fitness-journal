import React, { FC, ReactNode, memo } from 'react';
import classNames from 'classnames';

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
};

const Button: FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={classNames(
        'p-3 pl-4 pr-4 bg-lime-400 hover:bg-white hover:text-black transition-all border-2 border-lime-400',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
