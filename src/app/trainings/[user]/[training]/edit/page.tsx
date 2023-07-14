import { Metadata } from 'next'
import {
  PageTitle,
  Container,
  TrainingForm,
  Breadcrumbs,
} from '@/app/components'
import { TrainingService } from '@/app/services-client'
import { UserService } from '@/app/services-client'

const usersApi = new UserService()
const trainingsApi = new TrainingService()

const getData = async (id: string) => {
  const serverData = await trainingsApi.getById(id).then(res => res)
  return serverData
}

const getUser = async (id: string) => {
  const serverData = await usersApi.getById(id).then(res => res)
  return serverData
}

type PageProps = {
  params: { training: string; user: string }
}

export async function generateMetadata({
  params: { training, user },
}: PageProps): Promise<Metadata> {
  const trainingData = await getData(training)
  const userData = await getUser(user)

  const { date } = trainingData
  const { avatar } = userData

  return {
    title: `Тренировка от ${new Date(date).toLocaleDateString()}`,
    openGraph: {
      images: avatar,
    },
  }
}

const Trainings = async ({ params: { training, user } }: PageProps) => {
  const trainingData = await getData(training)
  const userData = await getUser(user)

  const { avatar } = userData
  const { date } = trainingData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Тренировки', href: '/trainings' },
    {
      label: `Тренировка от ${new Date(date).toLocaleDateString()}`,
      href: `/trainings/${user}/${training}/edit`,
    },
  ]

  return (
    <main>
      <PageTitle
        title="Тренировка"
        subtitle={`${new Date(date).toLocaleDateString()}`}
        image={avatar}
        withBack
      />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <TrainingForm initialData={trainingData} user={user} />
        </div>
      </Container>
    </main>
  )
}

export default Trainings
