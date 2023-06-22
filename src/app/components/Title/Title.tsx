import { FC, ReactNode, memo } from 'react';
import classNames from 'classnames';

type TitleProps = {
  children: ReactNode;
  className?: string;
};

const Title: FC<TitleProps> = ({ className, children }) => {
  return (
    <h3
      className={classNames(
        'text-xl w-full border-b-4 border-black mb-5',
        className
      )}
    >
      {children}
    </h3>
  );
};

export default memo(Title);
