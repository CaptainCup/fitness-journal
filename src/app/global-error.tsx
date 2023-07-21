'use client'

import { NextPage } from 'next'
import localFont from 'next/font/local'
import {
  PageTitle,
  Container,
  Title,
  Button,
  Footer,
  Header,
} from '@/app/components'

import './globals.css'

const font = localFont({ src: './DrukTextWide-Medium.woff' })

export const metadata = {
  title: 'Ошибка',
}

export type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage: NextPage<ErrorPageProps> = ({ reset }) => {
  return (
    <html lang="ru" className={font.className}>
      <body className="min-h-screen flex flex-col justify-between">
        <Header />
        <main>
          <PageTitle title="Что-то пошло не так" withBack />
          <Container>
            <div className="mb-5 sm:mb-10">
              <Title>Произошла ошибка при загрузке страницы</Title>
              <p className="mb-5">
                Вы можете попробовать перезагрузить страницу.
              </p>
              <Button onClick={() => reset()}>Обновить страницу</Button>
            </div>
          </Container>
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default ErrorPage
