import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseForm,
  Container,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: 'Новое упражнение', href: '/exercises/create' },
]

export const metadata = {
  title: 'Добавить новое упражнение',
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
