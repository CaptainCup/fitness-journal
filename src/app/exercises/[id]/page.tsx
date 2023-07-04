import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
  Button,
} from '@/app/components'
import Link from 'next/link'
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

const Exercise = async ({ params: { id } }: { params: { id: string } }) => {
  const serverData = await getData(id)

  const { name, image, description, execution, equipment, similar } = serverData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Упражнения', href: '/exercises' },
    { label: name, href: `/exercises/${id}` },
  ]

  return (
    <main>
      <PageTitle title={name} image={image} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <Link href="/trainings/create">
            <Button>Начать тренировку с этого упражнения</Button>
          </Link>
        </div>

        <p className="whitespace-pre-wrap font-serif mb-5 sm:mb-10 ">
          {description}
        </p>

        {!!execution?.length && (
          <div className="mb-5 sm:mb-10">
            <ExerciseSteps title="Порядок выполнения" steps={execution} />
          </div>
        )}

        {/* <div className="mb-5 sm:mb-10">
          <CardsGrid title="Задействованные мышцы" cards={exercise.muscules} />
        </div> */}

        {!!equipment?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Используемое оборудование"
              cards={equipment.map(({ _id, name, image }) => ({
                title: name,
                img: image,
                link: `/equipment/${_id}`,
              }))}
            />
          </div>
        )}

        {!!similar?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Похожие упражнения"
              cards={similar.map(({ _id, name, image }) => ({
                title: name,
                img: image,
                link: `/exercises/${_id}`,
              }))}
            />
          </div>
        )}
      </Container>
    </main>
  )
}

export default Exercise
