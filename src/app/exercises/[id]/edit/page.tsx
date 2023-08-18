import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { ExerciseForm } from '@/views'
import { ExerciseService } from '@/services-client'
import { baseURL } from '@/utils'

const exerciseApi = new ExerciseService()

const getExercise = async (id: string) => {
  const serverData = await exerciseApi.getById(id).then(res => res)

  return serverData
}

type PageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const id = params.id

  const serverData = await getExercise(id)

  const { name, image, description, _id } = serverData

  return {
    title: `Редактировать: ${name}`,
    description,
    keywords: `${name} фитнес тренировка упражнения`,
    openGraph: {
      url: `${baseURL}/exercises/${_id}/edit`,
      title: `Редактировать: ${name}`,
      description,
      images: [
        {
          width: 600,
          height: 600,
          alt: name,
          url: `${baseURL}/${image}`,
        },
      ],
    },
  }
}

const ExerciseEdit = async ({ params: { id } }: PageProps) => {
  const exerciseData = await getExercise(id)

  const { name } = exerciseData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Оборудование', href: '/exercises' },
    { label: name, href: `/exercises/${id}` },
  ]

  return (
    <main>
      <PageTitle title="Редактировать" subtitle={name} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <ExerciseForm initialData={exerciseData} />
      </Container>
    </main>
  )
}

export default ExerciseEdit
