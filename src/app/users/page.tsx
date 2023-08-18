import { NextPage } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { UsersListView } from '@/views'
import { getCurrentUser } from '@/services-server'
import { AdminPermissions } from '@/types'
import { baseURL } from '@/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клуб X-Fit', href: '/users' },
]

export const metadata = {
  title: 'Клуб X-Fit',
  description:
    'В клубе X-Fit вы найдете единомышленников, которые поддержат вас в стремлении к здоровому образу жизни и спортивным достижениям. Отслеживайте успехи других участников, вдохновляйтесь их результатами и находите новые идеи для своих тренировок. Будьте на шаг впереди и достигайте большего вместе с нами!',
  keywords: 'фитнес тренировка упражнения клуб',
  openGraph: {
    url: `${baseURL}/users`,
    title: 'Клуб X-Fit',
    description:
      'В клубе X-Fit вы найдете единомышленников, которые поддержат вас в стремлении к здоровому образу жизни и спортивным достижениям. Отслеживайте успехи других участников, вдохновляйтесь их результатами и находите новые идеи для своих тренировок. Будьте на шаг впереди и достигайте большего вместе с нами!',
    images: [
      {
        width: 600,
        height: 600,
        alt: 'Клуб X-Fit',
        url: `/images/logo-in-black.png`,
      },
    ],
  },
}

const UsersPage: NextPage = async () => {
  const currentUser = await getCurrentUser()

  const isTrainer = currentUser?.admin?.includes(AdminPermissions.trainer)

  return (
    <main>
      <PageTitle title="Клуб X-Fit" />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <UsersListView isTrainer={isTrainer} />
        </div>
      </Container>
    </main>
  )
}

export default UsersPage
