import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExercisesListView,
  Container,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
]

export const metadata = {
  title: 'Упражнения',
}

const Exercises: NextPage = () => {
  return (
    <main>
      <PageTitle title="Упражнения" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExercisesListView />
        </div>
      </Container>
    </main>
  )
}

export default Exercises
