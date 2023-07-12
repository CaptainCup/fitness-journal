import { Metadata } from 'next'
import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
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

const Equipment = async ({ params: { id } }: { params: { id: string } }) => {
  const serverData = await getData(id)

  const { name, image, description, configuration, exercises } = serverData

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
