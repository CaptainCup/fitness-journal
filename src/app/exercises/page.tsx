import { NextPage } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExercisesListView,
  Container,
} from '@/app/components'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
]

export const metadata = {
  title: 'Упражнения',
}

const Exercises: NextPage = async () => {
  const currentUser = await getCurrentUser()

  const isTrainer = currentUser?.admin?.includes(AdminPermissions.trainer)

  return (
    <main>
      <PageTitle title="Упражнения" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <ExercisesListView isTrainer={isTrainer} />
        </div>
      </Container>
    </main>
  )
}

export default Exercises
