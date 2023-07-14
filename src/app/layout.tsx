import { ReactNode } from 'react'
import { NextPage } from 'next'
import localFont from 'next/font/local'
import { Footer, Header } from '@/app/components'
import { getCurrentUser } from './services-server'

import './globals.css'

const font = localFont({ src: './DrukTextWide-Medium.woff' })

export const metadata = {
  title: 'Fitness Journal',
  description: 'An application for tracking the results of your workouts',
}

type RootLayout = {
  children: ReactNode
}

const RootLayout: NextPage<RootLayout> = async ({ children }) => {
  const currentUserData = await getCurrentUser()

  return (
    <html lang="ru" className={font.className}>
      <body className="min-h-screen flex flex-col justify-between">
        <Header {...(currentUserData ? { user: currentUserData } : {})} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
