import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
  Button,
  QRcode,
} from '@/app/components'
import { EquipmentService } from '@/app/services-client'
import { getCurrentUser } from '@/app/services-server'
import { AdminPermissions } from '@/app/types'
import Link from 'next/link'

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

  const { name, image } = serverData

  return {
    title: name,
    openGraph: {
      images: image,
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

        <div className="mb-5 sm:mb-10">
          {canEditEquipment && (
            <Link href={`/equipment/${id}/edit`}>
              <Button className="w-full sm:w-auto mr-0 sm:mr-5 mb-5 sm:mb-0">
                Редактировать
              </Button>
            </Link>
          )}
          <QRcode buttonClassName="w-full sm:w-auto" title={name} />
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

export default Equipment
