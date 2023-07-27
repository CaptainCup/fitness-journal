import { Metadata } from 'next'
import Link from 'next/link'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
  Button,
  ShareButton,
  Image,
} from '@/app/components'
import { EquipmentService } from '@/app/services-client'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'
import { baseURL } from '@/app/utils'

const equipmentApi = new EquipmentService()

const getEquipmentData = async (id: string) => {
  const serverData = await equipmentApi.getById(id).then(res => res)

  return serverData
}

type PageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const id = params.id

  const serverData = await getEquipmentData(id)

  const { name, image, description, _id } = serverData

  return {
    title: name,
    description,
    keywords: `${name} фитнес тренировка упражнения оборудование`,
    openGraph: {
      url: `${baseURL}/equipment/${_id}`,
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

const Equipment = async ({ params: { id } }: PageProps) => {
  const serverData = await getEquipmentData(id)
  const userData = await getCurrentUser()

  const { name, image, description, configuration, exercises } = serverData
  const { admin } = userData || {}

  const canEditEquipment = admin?.includes(AdminPermissions.trainer)

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Оборудование', href: '/equipment' },
    { label: name, href: `/equipment/${id}` },
  ]

  return (
    <main>
      <PageTitle title={name} image={image} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10 flex">
          {canEditEquipment && (
            <Link
              className="w-full mr-2 lg:mr-5"
              href={`/equipment/${id}/edit`}
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

        {description && (
          <p className="whitespace-pre-wrap mb-10 font-serif">{description}</p>
        )}

        {!!configuration?.length && (
          <div className="mb-5 sm:mb-10">
            <ExerciseSteps
              title="Настройка оборудования"
              steps={configuration}
            />
          </div>
        )}

        {!!exercises?.length && (
          <div className="mb-5 sm:mb-10">
            <CardsGrid
              title="Используется в упражнениях"
              cards={exercises.map(({ _id, name, image }) => ({
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

export default Equipment
