import {
  PageTitle,
  Breadcrumbs,
  ExerciseSteps,
  CardsGrid,
  Container,
} from '@/app/components'
import { EquipmentService } from '@/app/services'

const equipment = {
  id: '1',
  name: 'Leg Curl Techogym',
  image: '/images/leg-curl-equipment.jpg',
  description: `Прорабатывайте с оптимальной эффективностью мышцы задней и передней поверхности бедра на одном тренажере. Расширяет комплекс упражнений при использовании меньшего количества оборудования.`,

  steps: [
    {
      img: '/images/leg-curl-equipment-step-1.jpg',
      description:
        'Благодаря тому, что регулирующие устройства окрашены в ярко-желтый цвет, даже неопытные пользователи легко найдут их и смогут самостоятельно настроить тренажер.',
    },
    {
      img: '/images/leg-curl-equipment-step-2.jpg',
      description:
        'Эта функция позволяет пользователю установить сверху стека дополнительную пластину массой в половину обычной. В результате появляется возможность постепенного увеличения нагрузки.',
    },
  ],

  exercises: [
    {
      title: 'Сгибание ног сидя',
      img: '/images/leg-curl-exercise.jpg',
      link: '/exercises/2',
    },
  ],
}

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Упражнения', href: '/exercises' },
  { label: equipment.name, href: '/exercises/1' },
]

export const metadata = {
  title: equipment.name,
}

const Exercise = async ({ params: { id } }: { params: { id: string } }) => {
  const equipmentApi = new EquipmentService()

  const serverData = await equipmentApi.getById(id).then(res => res)

  const { name, image, description, configuration } = serverData

  return (
    <main>
      <PageTitle title={name} image={image} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <p className="whitespace-pre-wrap mb-10 font-serif">{description}</p>

        {!!configuration?.length && (
          <div className="mb-10">
            <ExerciseSteps
              title="Настройка оборудования"
              steps={configuration}
            />
          </div>
        )}

        <div className="mb-10">
          <CardsGrid
            title="Используется в упражнениях"
            cards={equipment.exercises}
          />
        </div>
      </Container>
    </main>
  )
}

export default Exercise
