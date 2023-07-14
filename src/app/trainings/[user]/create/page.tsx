import {
  PageTitle,
  Container,
  TrainingForm,
  Breadcrumbs,
} from '@/app/components'
import { getUserById, getCurrentUser } from '@/app/services-server'

export const metadata = {
  title: 'Новая тренировка',
}

const Trainings = async ({
  params: { user },
}: {
  params: { user: string }
}) => {
  const userData = await getUserById(user)
  const currentUserData = await getCurrentUser()

  const sameUser = userData?._id === currentUserData?._id

  const { firstName, lastName, avatar } = userData || {}

  const title = sameUser
    ? `Тренировки`
    : `Тренировки ${firstName ? `${firstName[0]}. ` : ''}${lastName}`

  const breadcrumbsPath = [
    { label: 'Главная', href: '/' },
    { label: title, href: `/trainings/${user}` },
    {
      label: 'Новая тренировка',
      href: `/trainings/${user}/create`,
    },
  ]

  return (
    <main>
      <PageTitle
        title="Тренировка"
        subtitle={`${firstName ? `${firstName[0]}. ` : ''}${lastName}`}
        image={sameUser ? '' : avatar}
        withBack
      />
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
