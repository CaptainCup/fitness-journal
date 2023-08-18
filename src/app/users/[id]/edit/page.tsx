import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { UserForm } from '@/views'
import { getCurrentUser, getUserById } from '@/services-server'
import { AdminPermissions } from '@/types'
import { baseURL } from '@/utils'

type PageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const id = params.id

  const serverData = await getUserById(id)

  const { firstName, lastName, avatar, _id } = serverData || {}

  return {
    title: `Редактировать: ${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
    description: `Клуб X-Fit: ${
      firstName ? `${firstName[0]}. ` : ''
    }${lastName}`,
    keywords: `фитнес тренировка упражнения`,
    openGraph: {
      url: `${baseURL}/exercises/${_id}/edit`,
      title: `Редактировать: ${
        firstName ? `${firstName[0]}. ` : ''
      }${lastName}`,
      description: `Клуб X-Fit: ${
        firstName ? `${firstName[0]}. ` : ''
      }${lastName}`,
      images: [
        {
          width: 600,
          height: 600,
          alt: `${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
          url: `${baseURL}/${avatar}`,
        },
      ],
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
