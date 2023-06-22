import { FC, ReactNode, memo } from 'react';
import classNames from 'classnames';

type TitleProps = {
  children: ReactNode;
  className?: string;
};

const Title: FC<TitleProps> = ({ className, children }) => {
  return (
    <h2
      className={classNames(
        'text-xl w-full border-b-4 border-black mb-5',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default memo(Title);
