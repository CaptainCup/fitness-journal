import { Metadata } from 'next'
import {
  PageTitle,
  Container,
  TrainingForm,
  Breadcrumbs,
} from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { getUserById, getCurrentUser } from '@/app/services-server'

const trainingsApi = new TrainingService()

const getData = async (id: string) => {
  const serverData = await trainingsApi.getById(id).then(res => res)
  return serverData
}

type PageProps = {
  params: { training: string; user: string }
}

export const generateMetadata = async ({
  params: { training, user },
}: PageProps): Promise<Metadata> => {
  const trainingData = await getData(training)
  const userData = await getUserById(user)

  const { date } = trainingData
  const { avatar } = userData || {}

  return {
    title: `Тренировка от ${new Date(date).toLocaleDateString('ru-RU')}`,
    openGraph: {
      images: avatar,
    },
  }
}

const Trainings = async ({ params: { training, user } }: PageProps) => {
  const trainingData = await getData(training)
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
