import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseForm,
  Container,
} from '@/app/components'
import { baseURL } from '@/app/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: 'Новое упражнение', href: '/exercises/create' },
]

export const metadata = {
  title: 'Добавить упражнение',
  description: 'Добавление упражнения на сайт.',
  keywords: 'фитнес тренировка упражнения',
  openGraph: {
    url: `${baseURL}/exercises/create`,
    title: 'Добавить упражнение',
    description: 'Добавление упражнения на сайт.',
    images: [
      {
        width: 600,
        height: 600,
        alt: 'Упражнения',
        url: `/images/logo-in-black.png`,
      },
    ],
  },
}

const ExerciseCreate: NextPage = () => {
  return (
    <main>
      <PageTitle title="Новое упражнение" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <ExerciseForm />
      </Container>
    </main>
  )
}

export default ExerciseCreate
