import React, { FC, ReactNode, memo } from 'react';

type PageTitleProps = {
  children?: ReactNode;
};

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <section className="bg-black w-full pb-5 sm:pb-10 pt-40 sm:pt-60 mb-5 sm:mb-10 px-5 sm:px-0">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-5xl text-white">{children}</h1>
      </div>
    </section>
  );
};

export default memo(PageTitle);
