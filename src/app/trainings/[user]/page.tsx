import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  TrainingListView,
  Container,
} from '@/app/components'
import { getUserById, getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'

type PageProps = {
  params: { user: string }
}

export const generateMetadata = async ({
  params: { user },
}: PageProps): Promise<Metadata> => {
  const serverData = await getUserById(user)

  const { firstName, lastName, avatar } = serverData || {}

  return {
    title: `Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`,
    openGraph: {
      images: avatar,
    },
  }
}

const Trainings = async ({ params: { user } }: PageProps) => {
  const userData = await getUserById(user)
  const currentUserData = await getCurrentUser()

  const isTrainer = currentUserData?.admin?.includes(AdminPermissions.trainer)

  const sameUser = userData?._id === currentUserData?._id

  const { firstName, lastName, avatar } = userData || {}

  const title = sameUser
    ? `Тренировки`
    : `Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: title, href: `/trainings/${user}` },
  ]

  return (
    <main>
      <PageTitle
        title="Тренировки"
        subtitle={
          sameUser ? '' : `${firstName ? `${firstName[0]}. ` : ''}${lastName}`
        }
        image={sameUser ? '' : avatar}
        withBack={!sameUser}
      />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <TrainingListView
          user={user}
          canStartTraining={isTrainer || sameUser}
        />
      </Container>
    </main>
  )
}

export default Trainings
