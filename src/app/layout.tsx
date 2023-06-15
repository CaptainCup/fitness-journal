import { ReactNode } from 'react';
import { NextPage } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/app/views';

import './globals.css';

const font = localFont({ src: './DrukTextWide-Medium.woff' });

export const metadata = {
  title: 'Fitness Journal',
  description: 'An application for tracking the results of your workouts',
};

type RootLayout = {
  children: ReactNode;
};

const RootLayout: NextPage<RootLayout> = ({ children }) => {
  return (
    <html lang="ru" className={font.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
