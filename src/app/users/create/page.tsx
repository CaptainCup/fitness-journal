import { NextPage } from 'next'
import { PageTitle, Breadcrumbs, UserForm, Container } from '@/app/components'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Клуб', href: '/users' },
  { label: 'Новый пользователь', href: '/users/create' },
]

export const metadata = {
  title: 'Добавить нового пользователя',
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
