import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, UserForm, Container } from '@/app/components'
import { UserService } from '@/app/services'

const userApi = new UserService()

const getData = async (id: string) => {
  const serverData = await userApi.getById(id).then(res => res)

  return serverData
}

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  const serverData = await getData(id)

  const { firstName, lastName, avatar } = serverData

  return {
    title: `${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
    openGraph: {
      images: avatar,
    },
  }
}

const UserEdit = async ({ params: { id } }: Props) => {
  const serverData = await getData(id)

  const { firstName, lastName } = serverData

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
      <PageTitle title="Редактировать пользователя" withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <UserForm initialData={serverData} />
      </Container>
    </main>
  )
}

export default UserEdit
