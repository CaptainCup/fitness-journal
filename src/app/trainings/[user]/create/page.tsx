import {
  PageTitle,
  Container,
  TrainingForm,
  Breadcrumbs,
} from '@/app/components'

const breadcrumbsPath = [
  { label: 'Главная', href: '/' },
  { label: 'Тренировки', href: '/trainings' },
  { label: 'Новая тренировка', href: '/trainings/create' },
]

export const metadata = {
  title: 'Новая тренировка',
}

const Trainings = ({ params: { user } }: { params: { user: string } }) => {
  const today = new Date().toLocaleDateString()

  return (
    <main>
      <PageTitle title={`Тренировка ${today}`} withBack />
      <Container>
        <div className="mb-5 sm:mb-10">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        <div className="mb-5 sm:mb-10">
          <TrainingForm user={user} />
        </div>
      </Container>
    </main>
  )
}

export default Trainings
