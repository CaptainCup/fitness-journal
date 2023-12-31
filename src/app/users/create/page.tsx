import { NextPage } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { UserForm } from '@/views'
import { getCurrentUser } from '@/services-server'
import { AdminPermissions } from '@/types'
import { baseURL } from '@/utils'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клуб', href: '/users' },
  { label: 'Новый пользователь', href: '/users/create' },
]

export const metadata = {
  title: 'Добавление клиента',
  description: 'Добавление клиента на сайт.',
  keywords: 'фитнес тренировка упражнения',
  openGraph: {
    url: `${baseURL}/users/create`,
    title: 'Добавить клиента',
    description: 'Добавление клиента на сайт.',
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
const UserCreate: NextPage = async () => {
  const currentUser = await getCurrentUser()

  return (
    <main>
      <PageTitle title="Новый пользователь" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <UserForm
          isAdmin={currentUser?.admin?.includes(AdminPermissions.admin)}
        />
      </Container>
    </main>
  )
}

export default UserCreate
