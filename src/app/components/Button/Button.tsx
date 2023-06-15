import React, { FC, ReactNode, memo } from 'react';

type ButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="p-3 pl-4 pr-4 bg-lime-400 hover:bg-white hover:text-black transition-all border-2 border-lime-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
