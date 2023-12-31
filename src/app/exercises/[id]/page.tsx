import { Metadata } from 'next'
import Link from 'next/link'
import {
  PageTitle,
  Breadcrumbs,
  Steps,
  CardsGrid,
  Container,
  Button,
  ShareButton,
  Image,
} from '@/components'
import { ExerciseService } from '@/services-client'
import { getCurrentUser } from '@/services-server'
import { AdminPermissions } from '@/types'
import { MusculeObject } from '@/types/Exercise'
import { baseURL } from '@/utils'

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

  const { name, description, image, _id } = serverData

  return {
    title: name,
    description,
    keywords: `${name} фитнес тренировка упражнения`,
    openGraph: {
      url: `${baseURL}/exercises/${_id}`,
      title: name,
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

        <div className="mb-5 sm:mb-10 flex">
          {canEditExercise && (
            <Link
              className="w-full mr-2 lg:mr-5"
              href={`/exercises/${id}/edit`}
            >
              <Button className="w-full flex justify-center items-center">
                <Image
                  src="/icons/edit.svg"
                  width={24}
                  height={24}
                  alt="Редактировать"
                />
                <p className="hidden lg:inline ml-2">Редактировать</p>
              </Button>
            </Link>
          )}
          <ShareButton buttonClassName="w-full" title={name} />
        </div>

        <p className="whitespace-pre-wrap font-serif mb-5 sm:mb-10 ">
          {description}
        </p>

        {!!execution?.length && (
          <div className="mb-5 sm:mb-10">
            <Steps title="Порядок выполнения" steps={execution} />
          </div>
        )}

        {!!muscules?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Задействованные мышцы"
              cards={muscules
                ?.map(muscule => MusculeObject[muscule])
                .map(({ name, image }) => ({ title: name, image }))}
            />
          </div>
        )}

        {!!equipment?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Используемое оборудование"
              cards={equipment.map(({ _id, name, image }) => ({
                title: name,
                image,
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
                image,
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
