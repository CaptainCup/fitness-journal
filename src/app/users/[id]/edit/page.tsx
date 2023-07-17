import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, UserForm, Container } from '@/app/components'
import { getCurrentUser, getUserById } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'

type PageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const id = params.id

  const serverData = await getUserById(id)

  const { firstName, lastName, avatar } = serverData || {}

  return {
    title: `${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
    openGraph: {
      images: avatar,
    },
  }
}

const UserEdit = async ({ params: { id } }: PageProps) => {
  const userData = await getUserById(id)
  const currentUser = await getCurrentUser()

  const { firstName, lastName } = userData || {}

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Клуб', href: '/users' },
    {
      label: `${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
      href: `/users/${id}`,
    },
    { label: 'Редактировать', href: `/users/${id}/edit` },
  ]

  return (
    <main>
      <PageTitle title="Редактировать профиль" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <UserForm
          {...(userData ? { initialData: userData } : {})}
          isAdmin={currentUser?.admin?.includes(AdminPermissions.admin)}
        />
      </Container>
    </main>
  )
}

export default UserEdit
