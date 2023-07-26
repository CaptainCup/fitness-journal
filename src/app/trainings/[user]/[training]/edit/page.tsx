import { Metadata } from 'next'
import {
  PageTitle,
  Container,
  TrainingForm,
  Breadcrumbs,
} from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { getUserById, getCurrentUser } from '@/app/services-server'
import { baseURL } from '@/app/utils'

const trainingsApi = new TrainingService()

const getTrainingData = async (id: string) => {
  const serverData = await trainingsApi.getById(id).then(res => res)
  return serverData
}

type PageProps = {
  params: { training: string; user: string }
}

export const generateMetadata = async ({
  params: { training, user },
}: PageProps): Promise<Metadata> => {
  const trainingData = await getTrainingData(training)
  const userData = await getUserById(user)

  const { date } = trainingData
  const { firstName, lastName, avatar } = userData || {}

  const trainingDate = new Date(date).toLocaleDateString('ru-RU')
  const userName = `${firstName ? `${firstName[0]}. ` : ''}${lastName}`

  return {
    title: `Тренировка от ${trainingDate}`,
    description: `Тренировка ${userName} от ${trainingDate}`,
    keywords: 'фитнес тренировка упражнения',
    openGraph: {
      url: `${baseURL}/trainings/${user}`,
      title: `Тренировка от ${trainingDate}`,
      description: `Тренировка ${userName} от ${trainingDate}`,
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

const Trainings = async ({ params: { training, user } }: PageProps) => {
  const trainingData = await getTrainingData(training)
  const userData = await getUserById(user)
  const currentUserData = await getCurrentUser()

  const sameUser = userData?._id === currentUserData?._id

  const { avatar, firstName, lastName } = userData || {}
  const { date } = trainingData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Тренировки', href: '/trainings' },
    {
      label: `Тренировка от ${new Date(date).toLocaleDateString('ru-RU')}`,
      href: `/trainings/${user}/${training}/edit`,
    },
  ]

  return (
    <main>
      <PageTitle
        title="Тренировка"
        subtitle={
          sameUser
            ? `${new Date(date).toLocaleDateString('ru-RU')}`
            : `${firstName ? `${firstName[0]}. ` : ''}${lastName}`
        }
        image={sameUser ? '' : avatar}
        withBack
      />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <TrainingForm initialData={trainingData} user={user} autosave />
        </div>
      </Container>
    </main>
  )
}

export default Trainings
