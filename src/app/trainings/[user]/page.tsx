import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  TrainingListView,
  Container,
} from '@/app/components'
import { UserService } from '@/app/services'

const usersApi = new UserService()

const getUser = async (id: string) => {
  try {
    const serverData = await usersApi.getById(id).then(res => res)
    return serverData
  } catch {
    return { firstName: '', lastName: '', avatar: '' }
  }
}

type Props = {
  params: { user: string }
}

export async function generateMetadata({
  params: { user },
}: Props): Promise<Metadata> {
  const serverData = await getUser(user)

  const { firstName, lastName, avatar } = serverData

  return {
    title: `Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
    openGraph: {
      images: avatar,
    },
  }
}

const Trainings = async ({
  params: { user },
}: {
  params: { user: string }
}) => {
  const serverData = await getUser(user)

  const { firstName, lastName, avatar } = serverData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Тренировки', href: '/trainings' },
    {
      label: `Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
      href: `/trainings/${user}`,
    },
  ]

  return (
    <main>
      <PageTitle
        title={`Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`}
        image={avatar}
        withBack
      />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <TrainingListView user={user} />
      </Container>
    </main>
  )
}

export default Trainings
