import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  Container,
  ExerciseForm,
} from '@/app/components'
import { ExerciseService } from '@/app/services'

const exerciseApi = new ExerciseService()

const getData = async (id: string) => {
  const serverData = await exerciseApi.getById(id).then(res => res)

  return serverData
}

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id

  const serverData = await getData(id)

  const { name, image } = serverData

  return {
    title: name,
    openGraph: {
      images: image,
    },
  }
}

const ExerciseEdit = async ({ params: { id } }: Props) => {
  const serverData = await getData(id)

  const { name } = serverData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Оборудование', href: '/exercises' },
    { label: name, href: `/exercises/${id}` },
  ]

  return (
    <main>
      <PageTitle title={name} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <ExerciseForm initialData={serverData} />
      </Container>
    </main>
  )
}

export default ExerciseEdit
