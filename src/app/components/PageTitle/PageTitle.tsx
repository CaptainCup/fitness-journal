import React, { FC, ReactNode, memo } from 'react';

type PageTitleProps = {
  children?: ReactNode;
};

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return (
    <section className="bg-black w-full pb-10 pt-52 mb-10">
      <div className="container mx-auto">
        <h1 className="text-5xl text-white mb-4">{children}</h1>
      </div>
    </section>
  );
};

export default memo(PageTitle);
