import { Metadata } from 'next'
import Link from 'next/link'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
  Button,
  QRcode,
} from '@/app/components'
import { ExerciseService } from '@/app/services-client'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'
import { MusculeObject } from '@/app/types/Exercise'
import { baseURL } from '@/app/utils'

const exerciseApi = new ExerciseService()

const getExerciseData = async (id: string) => {
  const serverData = await exerciseApi.getById(id).then(res => res)

  return serverData
}

type PageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params: { id },
}: PageProps): Promise<Metadata> => {
  const serverData = await getExerciseData(id)

  const { name, description, image } = serverData

  return {
    title: name,
    openGraph: {
      title: name,
      description: description,
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

const Exercise = async ({ params: { id } }: PageProps) => {
  const serverData = await getExerciseData(id)
  const userData = await getCurrentUser()

  const { name, image, description, execution, equipment, similar, muscules } =
    serverData
  const { admin } = userData || {}

  const canEditExercise = admin?.includes(AdminPermissions.trainer)

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
          {canEditExercise && (
            <Link href={`/exercises/${id}/edit`}>
              <Button className="w-full sm:w-auto mr-0 sm:mr-5 mb-5 sm:mb-0">
                Редактировать
              </Button>
            </Link>
          )}
          <QRcode buttonClassName="w-full sm:w-auto" title={name} />
        </div>

        <p className="whitespace-pre-wrap font-serif mb-5 sm:mb-10 ">
          {description}
        </p>

        {!!execution?.length && (
          <div className="mb-5 sm:mb-10">
            <ExerciseSteps title="Порядок выполнения" steps={execution} />
          </div>
        )}

        {!!muscules?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Задействованные мышцы"
              cards={muscules
                ?.map(muscule => MusculeObject[muscule])
                .map(({ name, image }) => ({ title: name, img: image }))}
            />
          </div>
        )}

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
