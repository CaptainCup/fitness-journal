import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { TrainingListView } from '@/views'
import { TrainingService } from '@/services-client'
import { getUserById, getCurrentUser } from '@/services-server'
import { AdminPermissions } from '@/types'
import { baseURL } from '@/utils'

const trainingsApi = new TrainingService()

const getTrainingDates = async (user: string) => {
  const serverData = await trainingsApi.getDates({ user }).then(res => res)
  return serverData
}

type PageProps = {
  params: { user: string }
}

export const generateMetadata = async ({
  params: { user },
}: PageProps): Promise<Metadata> => {
  const serverData = await getUserById(user)

  const { firstName, lastName, avatar } = serverData || {}

  const userName = `${firstName ? `${firstName[0]}. ` : ''}${lastName}`

  return {
    title: `Тренировки ${userName}`,
    description: `Список тренировок ${userName}`,
    keywords: 'фитнес тренировка упражнения',
    openGraph: {
      url: `${baseURL}/trainings/${user}`,
      title: `Тренировки ${userName}`,
      description: `Список тренировок ${userName}`,
      images: [
        {
          width: 600,
          height: 600,
          alt: 'Тренировки',
          url: `${baseURL}/${avatar}`,
        },
      ],
    },
  }
}

const Trainings = async ({ params: { user } }: PageProps) => {
  const trainingDates = await getTrainingDates(user)
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
          userName={`${firstName ? `${firstName[0]}. ` : ''}${lastName}`}
          trainingDates={trainingDates}
          canStartTraining={isTrainer || sameUser}
        />
      </Container>
    </main>
  )
}

export default Trainings
