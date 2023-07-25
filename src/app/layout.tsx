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
  manifest: '/manifest.json',
  themeColor: '#A3E635',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      {
        url: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        url: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
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
