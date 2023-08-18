import { Metadata } from 'next'
import { PageTitle, Breadcrumbs, Container } from '@/components'
import { EquipmentForm } from '@/views'
import { EquipmentService } from '@/services-client'
import { baseURL } from '@/utils'

const equipmentApi = new EquipmentService()

const getData = async (id: string) => {
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

  const serverData = await getData(id)

  const { name, image, description, _id } = serverData

  return {
    title: `Редактировать: ${name}`,
    description,
    keywords: `${name} фитнес тренировка упражнения оборудование`,
    openGraph: {
      url: `${baseURL}/equipment/${_id}/edit`,
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

const EquipmentEdit = async ({ params: { id } }: PageProps) => {
  const serverData = await getData(id)

  const { name } = serverData

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: 'Оборудование', href: '/equipment' },
    { label: name, href: `/equipment/${id}` },
    { label: 'Редактировать', href: `/equipment/${id}/edit` },
  ]

  return (
    <main>
      <PageTitle title="Редактировать" subtitle={name} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <EquipmentForm initialData={serverData} />
      </Container>
    </main>
  )
}

export default EquipmentEdit
