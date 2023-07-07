import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  EquipmentForm,
  Container,
} from '@/app/components'
import { EquipmentService } from '@/app/services'

const equipmentApi = new EquipmentService()

const getData = async (id: string) => {
  const serverData = await equipmentApi.getById(id).then(res => res)

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

const EquipmentEdit = async ({ params: { id } }: Props) => {
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
      <PageTitle title={name} withBack />
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
